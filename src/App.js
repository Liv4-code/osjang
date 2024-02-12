import AddItem from "./components/AddItem";

const App = () => {
    return (
        <div className="App m-14">
            <header className="app-header">
                <h1 className="text-6xl text-center font-bold">My Osjang</h1>
            </header>
            <main>
                <AddItem />
            </main>
        </div>
    );
};

export default App;
