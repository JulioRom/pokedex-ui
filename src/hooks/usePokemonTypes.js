// hooks/usePokemonTypes.js
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPokemonTypes } from "../store/typeSlice";

export const usePokemonTypes = () => {
    const dispatch = useDispatch();
    const types = useSelector(state => state.types.types || []);

    useEffect(() => {
        if (types.length === 0) {
            dispatch(fetchPokemonTypes());
        }
    }, [dispatch, types]);

    return { types };
};
