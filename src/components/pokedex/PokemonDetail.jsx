import { usePokemonDetail } from "../../hooks/usePokemonDetails";
import PokemonStatsChart from "./PokemonStatsChart";
import { motion } from "framer-motion";

const PokemonDetail = () => {
    const { selectedPokemon, status } = usePokemonDetail();

    if (status === "loading") {
        return (
            <motion.div className="pokedex-info bg-black text-white w-[45%] min-h-[400px] h-full p-4 flex flex-col items-center justify-center rounded-r-[40px] border-l-4 border-gray-700"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
            >
                <p className="text-center text-gray-400">Cargando detalles...</p>
            </motion.div>
        );
    }

    if (!selectedPokemon) {
        return (
            <motion.div className="pokedex-info bg-black text-white w-[45%] min-h-[400px] h-full p-4 flex flex-col items-center justify-center rounded-r-[40px] border-l-4 border-gray-700"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
            >
                <p className="text-center text-gray-400">Selecciona un Pokémon</p>
            </motion.div>
        );
    }

    return (
        <motion.div className="pokedex-info bg-black text-white w-[45%] min-h-[400px] h-full p-4 flex flex-col items-center rounded-r-[40px] border-l-4 border-gray-700"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
        >
            <h2 className="text-xl font-bold uppercase flex justify-between items-center">
                #{selectedPokemon.id} {selectedPokemon.name}
            </h2>
            <img src={selectedPokemon.image || selectedPokemon.sprites?.front_default}
                alt={selectedPokemon.name}
                className="w-24 h-24 my-3"
            />

            <p className="text-center text-yellow-400 font-semibold">Tipos: {selectedPokemon.types?.map(type => type.type.name).join(", ") || "Desconocido"}</p>
            <p className="text-gray-300 mt-2">⚖️ Peso: {selectedPokemon.weight} kg</p>
            <p className="text-gray-300">📏 Altura: {selectedPokemon.height} m</p>
            <p className="text-gray-300">🎖️ Exp. Base: {selectedPokemon.base_experience}</p>

            <h3 className="text-lg font-bold mt-4">📊 Estadísticas</h3>
            <PokemonStatsChart stats={selectedPokemon.stats} />
        </motion.div>
    );
};

export default PokemonDetail;
