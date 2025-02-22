import { usePokemonList } from "../../hooks/usePokemonList";
import { usePokemonDetail } from "../../hooks/usePokemonDetails";
import { motion } from "framer-motion";
import PokemonList from "./PokemonList";
import PokemonDetail from "./PokemonDetail";

const PokedexLayout = () => {
    const { 
        filteredPokemon, search, setSearch, 
        selectedType, setSelectedType, types, 
        weightRange, setWeightRange, 
        heightRange, setHeightRange, 
        expBaseRange, setExpBaseRange
    } = usePokemonList();
    const { selectedPokemon, handlePokemonClick } = usePokemonDetail();

    return (
        <motion.div className="pokedex-container flex flex-col items-center min-h-screen bg-gray-900 p-4 gap-4"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
        >
            {/* 🔍 Controles de búsqueda */}
            <div className="w-full max-w-xl bg-gray-800 p-3 rounded-lg shadow-md flex flex-wrap gap-3 justify-center text-white">
                <input
                    type="text"
                    placeholder="Buscar Pokémon..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full sm:w-1/2 p-2 border border-yellow-400 bg-gray-700 rounded-md text-center focus:ring-2 focus:ring-yellow-500"
                />
                <select
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                    className="w-full sm:w-1/2 p-2 border border-yellow-400 bg-gray-700 rounded-md text-center focus:ring-2 focus:ring-yellow-500"
                >
                    <option value="">Todos los tipos</option>
                    {types.map((type, index) => (
                        <option key={index} value={type}>{type.toUpperCase()}</option>
                    ))}
                </select>
                
                {/* Sliders */}
                <div className="w-full flex flex-col items-center gap-2 text-sm">
                    <label>Peso: {weightRange} kg</label>
                    <input 
                        type="range" 
                        min="1" max="10000" 
                        value={weightRange} 
                        onChange={(e) => setWeightRange(Number(e.target.value))}
                        className="w-full" 
                    />
                    <label>Altura: {heightRange} m</label>
                    <input 
                        type="range" 
                        min="0.1" max="200" step="0.1"
                        value={heightRange} 
                        onChange={(e) => setHeightRange(Number(e.target.value))}
                        className="w-full" 
                    />
                    <label>Exp. Base: {expBaseRange}</label>
                    <input 
                        type="range" 
                        min="1" max="700" 
                        value={expBaseRange} 
                        onChange={(e) => setExpBaseRange(Number(e.target.value))}
                        className="w-full" 
                    />
                </div>
            </div>

            {/* 🏠 Estructura de la Pokédex */}
            <motion.div className="pokedex-frame relative bg-red-700 w-[850px] h-[550px] rounded-[50px] shadow-2xl border-8 border-black flex"
                initial={{ y: "-100vh" }}
                animate={{ y: 0 }}
                transition={{ type: "spring", stiffness: 100 }}
            >
                {/* 📋 Lista de Pokémon */}
                <PokemonList filteredPokemon={filteredPokemon} onPokemonClick={handlePokemonClick} />
                {/* 🔹 DETALLES DEL POKÉMON SELECCIONADO */}
                <PokemonDetail selectedPokemon={selectedPokemon} />
            </motion.div>
        </motion.div>
    );
};

export default PokedexLayout;
