import './App.css';
// import Accordion from './components/accordion';
// import ImageCarousel from './components/imageCarousel';
import LoadMore from './components/loadMore';
// import RandomColor from './components/randomColor';
// import StarRating from './components/starRating';

function App() {
  return (
    <div className="App">

      { /* DON'T COMMENT OUT THIS HEADER it's used in the App.test.js */}
      <h1>I learn react</h1>
      { /* DON'T COMMENT OUT THIS HEADER - it's used in the App.test.js */}


      <LoadMore url="https://dummyjson.com/products?limit=LIMIT&skip=SKIP" limit={30}/>
      {/* <ImageCarousel url='https://picsum.photos/v2/list?page=12&limit=10'></ImageCarousel> */}
      {/* <StarRating starCount={10}></StarRating> */}
      {/* <RandomColor></RandomColor> */}
      {/* <Accordion></Accordion> */}
    </div>
  );
}

export default App;
