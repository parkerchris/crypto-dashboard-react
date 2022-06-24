
import NewsFeed from "./components/NewsFeed";
import CurrencyConverter from "./components/CurrencyConverter";

function App() {
  return (
    <div className="app">
      <h1 className="main-title">crypto dashboard</h1>
      <div className="main-container">
        <CurrencyConverter />
        <NewsFeed />
      </div>
      
    </div>
  );
}

export default App;
