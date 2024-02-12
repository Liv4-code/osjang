const Item = ({ itemImg }) => {
    return (
        <div className="bg-orange-50 rounded-lg p-10 m-3">
            <img src={itemImg} alt="item" className="w-[10vw] " />
        </div>
    );
};

export default Item;
