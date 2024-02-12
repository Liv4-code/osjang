import { useState, useEffect, useRef } from "react";
import Item from "./Item";
import { ref, uploadBytes, getDownloadURL, listAll } from "firebase/storage";
import { storage } from "../firebase";
import { v4 } from "uuid";

const AddItem = () => {
    const inputRef = useRef();
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

    const handleInputChange = (event) => {
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
        <div>
            <input
                className="hidden"
                ref={inputRef}
                type="file"
                onChange={handleInputChange}
            />
            <button
                className="bg-orange-300 text-lg font-semibold text-white rounded-2xl p-4"
                onClick={() => {
                    inputRef.current.click();
                }}
            >
                Add To Wardrobe
            </button>

            <div className="my-6">{imageUpload ? imageUpload.name : null}</div>
            <button
                className="bg-rose-600 text-lg font-semibold text-white rounded-2xl p-4"
                onClick={uploadFile}
            >
                Save
            </button>

            {/* List of displayed wardrobe items */}
            <div className="flex flex-col items-center justify-center">
                {imageUrls.map((url) => {
                    return <Item itemImg={url} key={v4()} />;
                })}
            </div>
        </div>
    );
};

export default AddItem;
