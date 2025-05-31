import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {createBrowserRouter, RouterProvider} from 'react-router-dom';

//here is where I import the pages for the routes
import App from './App.jsx'
import Home from './Home.jsx';
import PokemonDetails from './PokemonDetails.jsx';
 const router = createBrowserRouter([
    {path: "/", element: <App/>},
    {path: "/home", element: <Home/>},
    {path:"home/pokemondetails/:id", element: <PokemonDetails/>}
  ]);
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router = {router}/>
  </StrictMode>,
)
