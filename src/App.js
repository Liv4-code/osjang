import AddItem from "./components/addItem";

const App = () => {
    return (
        <div className="App">
            <header className="app-header">
                <h1>My Osjang</h1>
            </header>
            <main className="app-main">
                <AddItem />
            </main>
        </div>
    );
};

export default App;
