// import { useState, useEffect } from "react";
// import Item from "./Item";
// import { storage } from "../firebase";
// import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";
// import { v4 } from "uuid";

// const AddItem = () => {
//     const [itemImageToUpload, setItemImageToUpload] = useState(null);
//     const [itemImageUrls, setItemImageUrls] = useState([]);
//     // const itemMetaData = {
//     //     contentType: "image",
//     // };

//     // ref to dir in firebase storage & giving randomized name to uploaded image
//     const itemImageRef = ref(storage, `images/${itemImageToUpload + v4()}`);

//     // called when user clicks upload button
//     const uploadImage = async (e) => {
//         e.preventDefault();

//         if (itemImageToUpload === null) return;

//         try {
//             // after image file has been selected
//             const snapshot = await uploadBytes(
//                 itemImageRef,
//                 itemImageToUpload
//                 // itemMetaData
//             );
//             // display image that's just been uploaded
//             const url = await getDownloadURL(snapshot.ref);
//             setItemImageUrls([...itemImageUrls, url]);
//         } catch (err) {
//             console.log(err);
//         }
//     };

//     // ref to dir in firebase that images were uploaded to
//     const itemImagesRef = ref(storage, "images/");

//     useEffect(() => {
//         const getImages = async () => {
//             try {
//                 const response = await listAll(itemImagesRef);

//                 const downloadedItemImages = response.items.map(
//                     async (item) => {
//                         return await getDownloadURL(item);
//                     }
//                 );
//                 const urls = await Promise.all(downloadedItemImages);

//                 setItemImageUrls([...urls]);
//             } catch (err) {
//                 console.log(err);
//             }
//         };

//         getImages();
//     }, []);

//     return (
//         <div>
//             <input
//                 type="file"
//                 onChange={(e) => setItemImageToUpload(e.target.files[0].name)}
//             />
//             <button onClick={uploadImage}>Upload Image</button>
//             <div className="flex items-center justify-center">
//                 {/* render item component for each item image url */}
//                 {itemImageUrls.map((url) => {
//                     return <Item itemImg={url} key={v4()} />;
//                 })}
//             </div>
//         </div>
//     );
// };

// export default AddItem;

import { useState, useEffect } from "react";
import Item from "./Item";
import { ref, uploadBytes, getDownloadURL, listAll } from "firebase/storage";
import { storage } from "../firebase";
import { v4 } from "uuid";

const AddItem = () => {
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
                type="file"
                onChange={(event) => {
                    setImageUpload(event.target.files[0]);
                }}
            />
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
