// hooks/usePokemonDetail.js
import { useSelector } from "react-redux";

export const usePokemonDetail = () => {
    const selectedPokemon = useSelector(state => state.pokemonDetail.selectedPokemon);
    const status = useSelector(state => state.pokemonDetail.status);


    return { selectedPokemon, status  };
};
