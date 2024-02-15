import { useRef } from "react";

const AddItem = (imageUpload, handleInputChange, uploadFile) => {
    const inputRef = useRef();

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
        </div>
    );
};

export default AddItem;
