import Header from "./components/Header";
import Home from "./components/Home";

const App = () => {
  return (
    <div>
      <Header hasToken={false}/>
      <Home/>
    </div>
  );
}

export default App;
