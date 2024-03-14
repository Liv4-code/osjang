import { useRef, useState } from "react";
import Storage from "../utilities/Storage";

const AddItem = ({ setItemImageUrls }) => {
    const inputRef = useRef();
    const [imageToUpload, setImageToUpload] = useState(null);

    const handleInputChange = (e) => {
        setImageToUpload(e.target.files[0]);
    };

    const handleSelectImage = (e) => {
        e.preventDefault();
        inputRef.current.click();
    };

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                Storage.uploadFile(imageToUpload, setItemImageUrls);
            }}
            className="lg:w-1/3 md:w-1/2 flex flex-col rounded-lg bg-slate-50 shadow-lg p-12 m-auto"
        >
            <h3 className="my-6 text-xl font-bold">Add A Wardrobe Item</h3>
            <input
                className="rounded-lg mb-6 p-3"
                type="text"
                id="item-name"
                placeholder="Item Name"
            />
            <select className="rounded-lg mb-6 p-3">
                <option value="tops">Select A Category</option>
                <option value="tops">Tops</option>
                <option value="bottoms">Bottoms</option>
                <option value="dresses">Dresses</option>
                <option value="shoes">Shoes</option>
                <option value="accessories">Accessories</option>
            </select>
            <input
                className="hidden"
                ref={inputRef}
                type="file"
                onChange={handleInputChange}
            />
            <button
                className="bg-orange-300 text-base font-semibold text-white rounded-lg p-3"
                onClick={handleSelectImage}
            >
                Select Item Image
            </button>

            <div className="my-6">
                {imageToUpload ? imageToUpload.name : null}
            </div>
            <button
                className="bg-rose-600 text-lg font-semibold text-white rounded-lg p-4"
                type="submit"
            >
                Save
            </button>
        </form>
    );
};

export default AddItem;
