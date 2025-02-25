import PropTypes from "prop-types";
import { soundManager } from "../../utils/soundManager";
import { useState, useEffect } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";

// 🎨 Mapeo de colores por tipo de Pokémon
const typeColors = {
    fire: "bg-red-500",
    water: "bg-blue-500",
    grass: "bg-green-500",
    electric: "bg-yellow-500",
    ice: "bg-cyan-300",
    fighting: "bg-orange-700",
    poison: "bg-purple-600",
    ground: "bg-yellow-700",
    flying: "bg-indigo-400",
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
    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
        const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
        setIsFavorite(favorites.some((fav) => fav.id === pokemon.id));
    }, [pokemon.id]);

    if (!pokemon || !pokemon.id || !pokemon.name || !pokemon.image) return null; // 🛑 Validación antes de renderizar

    // 🔄 Función para alternar favoritos
    const toggleFavorite = (e) => {
        e.stopPropagation(); // ⛔ Evita que el click afecte el evento de `onClick`
        let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
        if (isFavorite) {
            favorites = favorites.filter((fav) => fav.id !== pokemon.id);
        } else {
            favorites.push(pokemon);
        }
        localStorage.setItem("favorites", JSON.stringify(favorites));
        setIsFavorite(!isFavorite);
    };

    return (
        <div
            className="bg-white p-3 rounded-lg shadow-md hover:shadow-xl flex flex-col items-center transition-all duration-700 transform hover:scale-105 hover:-translate-y-1 border border-gray-200 cursor-pointer relative w-45 h-56"
            onClick={() => {
                onClick(pokemon.id);
                soundManager.playSound("selectPokemon");
            }}
        >
            {/* 📌 Número de Pokédex (ID) */}
            <p className="text-gray-500 text-xs absolute top-2 left-2 font-semibold">#{pokemon.id}</p>
            
            {/* 📌 Imagen del Pokémon */}
            <img
                src={pokemon.image}
                alt={pokemon.name}
                className="w-16 h-16 transition-all duration-300 object-contain"
                loading="lazy"
            />

            {/* 📌 Nombre del Pokémon */}
            <p className="text-center capitalize font-semibold text-gray-800 mt-2">{pokemon.name}</p>

            {/* 📌 Tipos con colores */}
            <div className="flex gap-1 mt-1">
                {pokemon.types?.map((type, index) => (
                    <span
                        key={`${pokemon.id}-${type}-${index}`}
                        className={`text-white px-1.5 py-0.5 rounded text-[10px] uppercase ${typeColors[type] || "bg-gray-500"}`}
                    >
                        {type}
                    </span>
                ))}
            </div>

            {/* ❤️ Botón de Favorito */}
            <button
                onClick={toggleFavorite}
                className="absolute top-2 right-2"
            >
                {isFavorite ? <FaHeart className="text-red-500" /> : <FaRegHeart className="text-gray-400" />}
            </button>
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
