import './App.css';
// import Accordion from './components/accordion';
// import ImageCarousel from './components/imageCarousel';
import LoadMore from './components/loadMore';
// import RandomColor from './components/randomColor';
// import StarRating from './components/starRating';

function App() {
  return (
    <div className="App">
      <LoadMore url="https://dummyjson.com/products?limit=LIMIT&skip=SKIP" limit={30}/>
      {/* <ImageCarousel url='https://picsum.photos/v2/list?page=12&limit=10'></ImageCarousel> */}
      {/* <StarRating starCount={10}></StarRating> */}
      {/* <RandomColor></RandomColor> */}
      {/* <Accordion></Accordion> */}
    </div>
  );
}

export default App;
