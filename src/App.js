import { useEffect, useState } from "react";
import { storage, firestore } from "./firebase";
import { ref, getDownloadURL, listAll } from "firebase/storage";
import { collection, getDocs } from "firebase/firestore";
import AddItem from "./components/AddItem";
import Item from "./components/Item";
import Grid from "./layout/Grid";
import { v4 } from "uuid";

const App = () => {
    const [itemImageUrls, setItemImageUrls] = useState([]);

    const listWardrobeItems = () => {
        console.log("run func");
        const imagesListRef = ref(storage, "images/");

        listAll(imagesListRef).then((response) => {
            response.items.forEach((item) => {
                getDownloadURL(item).then((url) => {
                    setItemImageUrls((data) => [...data, url]);
                    console.log("state set");
                });
            });
        });
    };

    const getWardrobe = () => {
        const colRef = collection(firestore, "wardrobe");

        getDocs(colRef)
            .then((snapshot) => {
                let items = [];
                snapshot.docs.forEach((doc) => {
                    items.push({ ...doc.data(), id: doc.id });
                });
                console.log(items);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    useEffect(() => {
        console.log("run useffect");
        listWardrobeItems();
        // getWardrobe();
    }, []);

    return (
        <div className="App m-6">
            <header className="app-header">
                <h1 className="text-6xl text-center font-bold my-20">
                    My Osjang
                </h1>
            </header>
            <main>
                <AddItem setItemImageUrls={setItemImageUrls} />

                {/* List of displayed wardrobe items */}
                <Grid>
                    {itemImageUrls.map((url) => {
                        return <Item itemImg={url} key={v4()} />;
                    })}
                </Grid>
            </main>
        </div>
    );
};

export default App;
