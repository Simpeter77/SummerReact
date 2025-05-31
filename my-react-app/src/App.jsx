import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import {Link} from 'react-router-dom';
import "./App.css";
export default function App(){
  return(
    <>
      <div id = "appBody">
        <div className="appHeader">
          <h1>This is The Landing Page</h1>
        </div>
        <div className="appButton">
          <button><Link to="/home">Learn More</Link></button>
        </div>
      </div>
    </>
  );
}
