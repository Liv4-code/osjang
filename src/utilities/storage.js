import { Component } from "react";
import { storage, firestore } from "../firebase";
import { ref, uploadBytes, getDownloadURL, listAll } from "firebase/storage";
import { v4 } from "uuid";

class Storage extends Component {
    // constructor({setItemImageUrls}){
    //     super()
    // }

    // setItemImageUrls = this.props.setImageUrls

    static uploadFile = (imageToUpload, setItemImageUrls) => {
        if (imageToUpload == null) return;

        const imageRef = ref(storage, `images/${imageToUpload.name + v4()}`);
        console.log(imageToUpload);

        uploadBytes(imageRef, imageToUpload).then((snapshot) => {
            getDownloadURL(snapshot.ref).then((url) => {
                setItemImageUrls((prev) => [...prev, url]);
            });
        });
    };
}

export default Storage;
