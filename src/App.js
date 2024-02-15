import { useEffect, useState } from "react";
import AddItem from "./components/AddItem";
import Item from "./components/Item";
import { ref, uploadBytes, getDownloadURL, listAll } from "firebase/storage";
import { storage } from "./firebase";
import { v4 } from "uuid";

const App = () => {
    const [imageUpload, setImageUpload] = useState(null);
    const [imageUrls, setImageUrls] = useState([]);

    const uploadFile = () => {
        if (imageUpload == null) return;
        const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);
        uploadBytes(imageRef, imageUpload).then((snapshot) => {
            getDownloadURL(snapshot.ref).then((url) => {
                setImageUrls((prev) => [...prev, url]);
            });
        });
    };

    const onInputChange = (event) => {
        setImageUpload(event.target.files[0]);
    };

    useEffect(() => {
        const imagesListRef = ref(storage, "images/");
        listAll(imagesListRef).then((response) => {
            response.items.forEach((item) => {
                getDownloadURL(item).then((url) => {
                    setImageUrls((prev) => [...prev, url]);
                });
            });
        });
    }, []);

    return (
        <div className="App m-14">
            <header className="app-header">
                <h1 className="text-6xl text-center font-bold">My Osjang</h1>
            </header>
            <main>
                <AddItem
                    imageUpload={imageUpload}
                    handleInputChange={onInputChange}
                    uploadFile={uploadFile}
                />

                {/* List of displayed wardrobe items */}
                <div className="flex flex-col items-center justify-center">
                    {imageUrls.map((url) => {
                        return <Item itemImg={url} key={v4()} />;
                    })}
                </div>
            </main>
        </div>
    );
};

export default App;
