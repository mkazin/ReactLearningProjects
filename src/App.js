import './App.css';
import Accordion from './components/accordion';
import RandomColor from './components/randomColor';
import StarRating from './components/starRating';

function App() {
  return (
    <div className="App">
          <StarRating starCount={10}></StarRating>
          <RandomColor></RandomColor>
          <Accordion></Accordion>
    </div>
  );
}

export default App;
