import './App.css';
// import Accordion from './components/accordion';
import ImageCarousel from './components/imageCarousel';
// import LoadMore from './components/loadMore';
// import RandomColor from './components/randomColor';
import StarRating from './components/starRating';

// import TreeView from './components/treeView';
// import menus from './components/treeView/data.js';


import LogRocket from 'logrocket';
// React-specific libraries for LogRocket allowing filtering on component rather than page
// see https://docs.logrocket.com/reference/react-plugin-1
// Requires pacakages:
// * logrocket-react
// * @babel/plugin-transform-react-display-name
import setupLogRocketReact from 'logrocket-react';

// after calling LogRocket.init()
function App() {
  // console.log(menus)

  const enableLogRocket =
    process.env.NODE_ENV === 'production' && process.env.REACT_APP_LOG_ROCKET_APP_ID;
  const logRocketAppId = process.env.REACT_APP_LOGROCKET_ID
  if (enableLogRocket && logRocketAppId) {
    LogRocket.init(logRocketAppId);
    setupLogRocketReact(LogRocket);
  }

  return (
    <div className="App">
      { /* DON'T COMMENT OUT THIS HEADER - it's used in the App.test.js */}
      <h1>I learn react</h1>
      { /* DON'T COMMENT OUT THIS HEADER - it's used in the App.test.js */}
      <table>
        <th><td>Variable</td><td>Value</td></th>
        <tr><td>NODE_ENV:</td><td>{process.env.NODE_ENV}</td></tr>
        <tr><td>REACT_APP_LOGROCKET_ID</td><td>{process.env.REACT_APP_LOGROCKET_ID}</td></tr>
      </table>


      {/* <TreeView menus={menus} /> */}
      {/* <LoadMore url="https://dummyjson.com/products?limit=LIMIT&skip=SKIP" limit={30}/> */}
      <ImageCarousel url='https://picsum.photos/v2/list?page=12&limit=10'></ImageCarousel>
      <StarRating starCount={10}></StarRating>
      {/* <RandomColor></RandomColor> */}
      {/* <Accordion></Accordion> */}
    </div>
  );
}

export default App;
