import { usePokemonDetail } from "../../hooks/usePokemonDetails";
import PokemonStatsChart from "./PokemonStatsChart";
import { motion } from "framer-motion";

const PokemonDetail = () => {
    const { selectedPokemon, status } = usePokemonDetail();

    return (
        <motion.div
            className="pokedex-info bg-black text-white w-[45%] min-h-[420px] h-full p-4 flex flex-col items-center rounded-r-[40px] border-l-4 border-gray-700"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
        >
            {/*  Loading */}
            {status === "loading" && (
                <p className="text-center text-gray-400 mt-auto mb-auto">
                    Cargando detalles...
                </p>
            )}

            {/*  Si no hay Pokémon seleccionado */}
            {!selectedPokemon && status !== "loading" && (
                <p className="text-center text-gray-400 mt-auto mb-auto">
                    Selecciona un Pokémon
                </p>
            )}

            {/*  Si hay un Pokémon seleccionado */}
            {selectedPokemon && (
                <>
                    <h2 className="truncate max-w-xs text-xl font-bold uppercase text-center">
                        #{selectedPokemon.id} {selectedPokemon.name}
                    </h2>
                    <img
                        src={selectedPokemon.image || selectedPokemon.sprites?.front_default}
                        alt={selectedPokemon.name}
                        className="w-24 h-24 my-3"
                    />
                    <p className="text-center text-yellow-400 font-semibold">
                        Tipos: {selectedPokemon.types?.map(type => type.type.name.toUpperCase()).join(", ") || "Desconocido"}
                    </p>
                    <p className="text-gray-300 mt-2">⚖️ Peso: {selectedPokemon.weight} kg</p>
                    <p className="text-gray-300">📏 Altura: {selectedPokemon.height} m</p>
                    <p className="text-gray-300">🎖️ Exp. Base: {selectedPokemon.base_experience}</p>

                    {/* 📊 Estadísticas */}
                    <h3 className="text-lg font-bold mt-4">📊 Estadísticas</h3>
                    <PokemonStatsChart stats={selectedPokemon.stats} />
                </>
            )}
        </motion.div>
    );
};

export default PokemonDetail;
