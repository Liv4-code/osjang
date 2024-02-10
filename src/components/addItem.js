import { useState, useEffect } from "react";
import Item from "./Item";
import { storage } from "../firebase";
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";

const AddItem = () => {
    const [itemImageToUpload, setItemImageToUpload] = useState(null);
    const [itemImageUrls, setItemImageUrls] = useState([]);

    // ref to dir in firebase storage & giving randomized name to uploaded image
    const itemImageRef = ref(storage, `images/${itemImageToUpload + v4()}`);

    // called when user clicks upload button
    const uploadImage = async (e) => {
        e.preventDefault();

        if (itemImageToUpload === null) return;

        try {
            // after image file has been selected
            const snapshot = await uploadBytes(itemImageRef, itemImageToUpload);
            // display image that's just been uploaded
            const url = getDownloadURL(snapshot.ref);
            setItemImageUrls([...itemImageUrls, url]);
        } catch (err) {
            console.log(err);
        }
    };

    // ref to dir in firebase that images were uploaded to
    const itemImagesRef = ref(storage, "images/");

    useEffect(() => {
        const getImages = async () => {
            try {
                const response = await listAll(itemImagesRef);
                const downloadedItemImages = response.items.map(
                    async (item) => {
                        return await getDownloadURL(item);
                    }
                );
                setItemImageUrls([...itemImageUrls, ...downloadedItemImages]);
                console.log(itemImageUrls);
            } catch (err) {
                console.log(err);
            }
        };

        console.log("1", itemImageUrls);
        getImages();
        console.log("2", itemImageUrls);

        // })
        //     .then((res) => {
        //         res.items.forEach((item) => {
        //             getDownloadURL(item).then((url) => {
        //                 setItemImageUrls([...itemImageUrls, url]);
        //             });
        //         });
        //     })
        //     .catch((err) => {
        //         alert(err);
        //     });
    }, []);

    return (
        <div>
            <input
                type="file"
                onChange={(e) => setItemImageToUpload(e.target.files[0].name)}
            />
            <button onClick={uploadImage}>Upload Image</button>

            {/* render item component for each item image url */}
            {itemImageUrls.map((url) => {
                return <Item itemImg={url} key={v4()} />;
            })}
        </div>
    );
};

export default AddItem;
