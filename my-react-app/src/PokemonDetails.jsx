import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./PokemonDetails.css";
import Nav from "./Nav";

const baseURL = "https://pokeapi.co/api/v2/pokemon/";

export default function PokemonDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const pokeid = Number(id);
  const [pokemonDetails, setPokemonDetails] = useState(null);

  const handlePreviousPage = () => {
    navigate(`/home/pokemondetails/${pokeid - 1}`); 
  };

  const handleNextPage = () => {
    navigate(`/home/pokemondetails/${pokeid + 1}`);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${baseURL}${id}`);
        const data = await res.json();
        setPokemonDetails(data);
      } catch (error) {
        console.error("Error fetching Pokémon data:", error);
      }
    };
    fetchData();
  }, [id]);

  if (!pokemonDetails) {
    return <div>Loading...</div>; 
  }

  return (
    <>
        <Nav/>
        <div className="page-navigation">
            {pokeid > 1 && (
            <button onClick={handlePreviousPage}>Previous</button>
            )}
            {pokeid < 1025 && (  // Fix: Show Next button if pokeid < 1025
            <button onClick={handleNextPage} id="next">Next</button>
            )}
        </div>
        <div className="pokeDetailsCard">
            <h2 className="pokeName">
            #{pokemonDetails.id} {pokemonDetails.name?.toUpperCase()}
            </h2>
            <img
            className="pokeImage"
            src={pokemonDetails.sprites?.front_default}
            alt={pokemonDetails.name}
            />
            <div className="typesContainer">
            {pokemonDetails.types?.map((type) => (
                <span
                key={type.slot}
                className={`typeBadge type-${type.type.name.toLowerCase()}`}
                >
                {type.type.name.toUpperCase()}
                </span>
            ))}
            </div>
            <div className="statsSection">
            <h3>Stats</h3>
            {pokemonDetails.stats?.map((stat, index) => (
                <div key={index} className="statContainer">
                <div className="statLabel">
                    <strong>{stat.stat.name}</strong>
                    <span>{stat.base_stat}/255</span>
                </div>
                <div className="statBarBackground">
                    <div
                    className="statBarFill"
                    style={{ width: `${(stat.base_stat / 255) * 100}%` }}
                    ></div>
                </div>
                </div>
            ))}
            </div>
        </div>
    </>
  );
}
