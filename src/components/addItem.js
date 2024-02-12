import { useState, useEffect, useRef } from "react";
import Item from "./Item";
import { ref, uploadBytes, getDownloadURL, listAll } from "firebase/storage";
import { storage } from "../firebase";
import { v4 } from "uuid";

const AddItem = () => {
    const inputRef = useRef();
    const [imageUpload, setImageUpload] = useState(null);
    const [imageUrls, setImageUrls] = useState([]);
    const [selectedImgName, setSelectedImgName] = useState("");

    const uploadFile = () => {
        if (imageUpload == null) return;
        const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);
        uploadBytes(imageRef, imageUpload).then((snapshot) => {
            getDownloadURL(snapshot.ref).then((url) => {
                setImageUrls((prev) => [...prev, url]);
            });
        });
    };

    const handleInputChange = (event) => {
        setImageUpload(event.target.files[0]);
        // console.log(typeof imageUpload);
        // console.log(imageUpload);
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
        <div>
            <input
                className="hidden"
                ref={inputRef}
                type="file"
                onChange={handleInputChange}
            />
            <button
                onClick={() => {
                    inputRef.current.click();
                }}
            >
                Add Item
            </button>
            <div>{imageUpload ? imageUpload.name : null}</div>
            <button onClick={uploadFile}> Upload Image</button>
            <div className="flex flex-col items-center justify-center">
                {imageUrls.map((url) => {
                    return <Item itemImg={url} key={v4()} />;
                })}
            </div>
        </div>
    );
};

export default AddItem;
