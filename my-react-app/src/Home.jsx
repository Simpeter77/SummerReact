import { useEffect, useState } from "react";
import './Home.css';
import { Link } from "react-router-dom";
let URL = "https://pokeapi.co/api/v2/pokemon/";
import Nav from "./Nav";

export default function Home() {
  const [pokemonList, setPokemonList] = useState([]);
  const [pokemonData, setPokemonData] = useState([]);
  const [currentPage, setCurrentPage] = useState(URL);
  const [nextPage, setNextPage] = useState('');
  const [pageHistory, setPageHistory] = useState([currentPage]);
  const [isLoading, setIsLoading] = useState(false);
  const [showContent, setShowContent] = useState(true); // NEW: controls content fade in/out

  // Fetch list when currentPage changes
  useEffect(() => {
    const fetchPokemonList = async () => {
      setIsLoading(true);
      const res = await fetch(currentPage);
      const data = await res.json();
      setNextPage(data.next);
      setPokemonList(data.results);
    };
    fetchPokemonList();
  }, [currentPage]);

  // Fetch details when pokemonList changes
  useEffect(() => {
    if (pokemonList.length === 0) return;

    const fetchDetails = async () => {
      setIsLoading(true);

      const details = await Promise.all(
        pokemonList.map(async (poke) => {
          const res = await fetch(poke.url);
          return await res.json();
        })
      );
      setPokemonData(details);
      setIsLoading(false);
      setShowContent(true); // fade content back in when data ready
    };
    fetchDetails();
  }, [pokemonList]);

  // Handler for next page: fade out content, then load next page
  const handleNextPage = () => {
    setShowContent(false); // fade out content
    setTimeout(() => {
      setPageHistory(p => [...p, currentPage]);
      setCurrentPage(nextPage);
    }, 500); // match your CSS transition duration
  };

  // Handler for previous page: fade out content, then load previous page
  const handlePreviousPage = () => {
    setShowContent(false);
    setTimeout(() => {
      setPageHistory(p => {
        let history = [...p];
        const lastpage = history.pop();
        if (lastpage) {
          setCurrentPage(lastpage);
        }
        return history;
      });
    }, 500);
  };

  return (
    <>
      <Nav/>
      <div className={`loader-container ${isLoading ? '' : 'hide'}`}>
        <div className="pokeball"></div>
        <div className="loading-text">Loading...</div>
      </div>

      <div className={`content-container ${showContent ? 'show' : ''}`}>
        <div className="page-navigation">
          {pageHistory.length > 1 && (
            <button onClick={handlePreviousPage}>Previous</button>
          )}
          {nextPage !== '' && (
            <button onClick={handleNextPage} id="next">Next</button>
          )}
        </div>
        <div className="pokeDexContainer">
          {pokemonData.map((poke) => (
            <Link to={`pokemondetails/${poke.id}`} key={poke.id}>
              <div className="pokeCard">
                <h3>#{poke.id}</h3>
                <img src={poke.sprites.front_default} alt={poke.name} />
                <h3>{poke.name}</h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
