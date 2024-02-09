import { useState, useEffect } from "react";
import Item from "./Item";
import { storage } from "../firebase";
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";

const AddItem = () => {
    const [itemImageToUpload, setItemImageToUpload] = useState(null);
    const [itemImageUrls, setItemImageUrls] = useState([]);

    // called when user clicks upload button
    const uploadImage = (e) => {
        e.preventDefault();

        if (itemImageToUpload === null) return;
        // ref to dir in firebase storage & giving randomized name to uploaded image
        const itemImageRef = ref(
            storage,
            `images/${itemImageToUpload.name + v4()}`
        );
        // after image file has been selected
        uploadBytes(itemImageRef, itemImageToUpload)
            .then((snapshot) => {
                getDownloadURL(snapshot.ref).then((url) => {
                    setItemImageUrls([...itemImageUrls, { url, key: url }]);
                });
            })
            .catch((err) => {
                alert(err);
            });
    };

    // ref to dir in firebase that images were uploaded to
    const itemImagesRef = ref(storage, "images/");

    useEffect(() => {
        // firebase method to get all results of dir of given ref
        listAll(itemImagesRef)
            .then((res) => {
                res.items.forEach((item) => {
                    getDownloadURL(item).then((url) => {
                        setItemImageUrls([...itemImageUrls, { url, key: url }]);
                    });
                });
                console.log("items already in storage", res);
            })
            .catch((err) => {
                alert(err);
            });
    }, []);

    return (
        <div>
            <input
                type="file"
                onChange={(e) => setItemImageToUpload(e.target.files[0])}
            />
            <button onClick={uploadImage}>Upload Image</button>

            {/* render item component for each item image url */}
            {itemImageUrls.map((url) => {
                return <Item itemImg={itemImg} />;
            })}
        </div>
    );
};

export default AddItem;
