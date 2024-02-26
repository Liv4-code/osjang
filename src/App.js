import { useEffect, useState } from "react";
import AddItem from "./components/AddItem";
import Item from "./components/Item";
import Grid from "./layout/Grid";
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

    const onInputChange = (e) => {
        setImageUpload(e.target.files[0]);
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
        <div className="App m-6">
            <header className="app-header">
                <h1 className="text-6xl text-center font-bold my-20">
                    My Osjang
                </h1>
            </header>
            <main>
                <AddItem
                    imageUpload={imageUpload}
                    handleInputChange={onInputChange}
                    uploadFile={uploadFile}
                />

                {/* List of displayed wardrobe items */}
                <Grid>
                    {imageUrls.map((url) => {
                        return <Item itemImg={url} key={v4()} />;
                    })}
                </Grid>
            </main>
        </div>
    );
};

export default App;
