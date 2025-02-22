import PropTypes from "prop-types";
import { soundManager } from "../../utils/soundManager";

// 🎨 Mapeo de colores por tipo de Pokémon
const typeColors = {
    fire: "bg-red-500",
    water: "bg-blue-500",
    grass: "bg-green-500",
    electric: "bg-yellow-500",
    ice: "bg-cyan-300",
    fighting: "bg-red-800",
    poison: "bg-purple-600",
    ground: "bg-yellow-700",
    flying: "bg-red-400",
    psychic: "bg-pink-500",
    bug: "bg-green-700",
    rock: "bg-gray-600",
    ghost: "bg-purple-800",
    dragon: "bg-indigo-700",
    dark: "bg-gray-800",
    steel: "bg-gray-500",
    fairy: "bg-pink-400",
    normal: "bg-gray-400"
};

const PokemonCard = ({ pokemon, onClick }) => {
    return (
        <div
            className="bg-white p-2 rounded-lg shadow-md hover:shadow-xl flex flex-col items-center transition duration-500 transform hover:scale-105 hover:-translate-y-1 border border-gray-300 cursor-pointer"
            onClick={() => {
                onClick(pokemon.id);
                soundManager.playSound("selectPokemon");
            }}
        >   
            <p className="text-gray-500 text-xs">#{pokemon.id}</p>
            <img
                src={pokemon.image}
                alt={pokemon.name}
                className="w-12 h-12 transition duration-300"
                loading="lazy"
            />
            <p className="text-center capitalize font-semibold text-gray-800">{pokemon.name}</p>

            {/* 📌 Tipos con colores */}
            <div className="flex gap-1 mt-1">
                {pokemon.types?.map((type) => (
                    <span
                        key={type}
                        className={`text-white px-2 py-0.5 rounded text-xs uppercase ${typeColors[type] || "bg-gray-500"}`}
                    >
                        {type}
                    </span>
                ))}
            </div>
        </div>
    );
};


PokemonCard.propTypes = {
    pokemon: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
        types: PropTypes.arrayOf(PropTypes.string)
    }).isRequired,
    onClick: PropTypes.func.isRequired
};

export default PokemonCard;
