import PropTypes from "prop-types";
import PokemonCard from "./PokemonCard";
import { useDispatch } from "react-redux";
import { fetchSelectedPokemon } from "../../store/pokemonDetailSlice";
import { soundManager } from "../../utils/soundManager";

const PokemonList = ({ filteredPokemon = [] }) => {
    const dispatch = useDispatch();

    const handlePokemonClick = (id) => {
        dispatch(fetchSelectedPokemon(id));
        soundManager.playSound("selectPokemon");
    };

    return (
        <div className="pokedex-screen bg-gray-100 w-full h-full p-4 overflow-hidden rounded-l-[40px] border-r-4 border-black">
            {filteredPokemon.length === 0 ? (
                <p className="text-center text-gray-600">No se encontraron Pokémon...</p>
            ) : (
                <div className="grid grid-cols-2 gap-6 overflow-y-auto h-[490px]">
                    {filteredPokemon.map((pokemon) => (
                        <PokemonCard 
                            key={pokemon.id} 
                            pokemon={pokemon} 
                            onClick={() => handlePokemonClick(pokemon.id)}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

PokemonList.propTypes = {
    filteredPokemon: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            name: PropTypes.string.isRequired,
            image: PropTypes.string.isRequired,
            types: PropTypes.arrayOf(PropTypes.string),
        })
    )
};

PokemonList.defaultProps = {
    filteredPokemon: []
};

export default PokemonList;
