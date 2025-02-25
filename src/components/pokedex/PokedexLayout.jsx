import { usePokemonList } from "../../hooks/usePokemonList";
import { usePokemonDetail } from "../../hooks/usePokemonDetails";
import { motion } from "framer-motion";
import PokemonList from "./PokemonList";
import PokemonDetail from "./PokemonDetail";
import FilterPanel from "./FilterPanel"; // ✅ Panel de filtros desacoplado

const PokedexLayout = () => {
    const { 
        filteredPokemon, allPokemon, // ✅ Añadimos `allPokemon` para autocompletado
        search, setSearch, 
        selectedType, setSelectedType, types, 
        weightRange, setWeightRange, 
        heightRange, setHeightRange, 
        expBaseRange, setExpBaseRange 
    } = usePokemonList();

    const { selectedPokemon, handlePokemonClick } = usePokemonDetail();

    // 🔄 Función para reiniciar los filtros
    const resetFilters = () => {
        setSearch("");
        setSelectedType("");
        setWeightRange(10000);
        setHeightRange(200);
        setExpBaseRange(700);
    };

    return (
        <motion.div className="pokedex-container flex flex-col items-center min-h-screen bg-gray-900 p-4 gap-4"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
        >
            {/* 🛠️ Panel de Filtros con Autocompletado */}
            <FilterPanel
                search={search}
                setSearch={setSearch}
                selectedType={selectedType}
                setSelectedType={setSelectedType}
                types={types}
                weightRange={weightRange}
                setWeightRange={setWeightRange}
                heightRange={heightRange}
                setHeightRange={setHeightRange}
                expBaseRange={expBaseRange}
                setExpBaseRange={setExpBaseRange}
                allPokemon={allPokemon} // ✅ Pasamos los nombres para el autocompletado
                resetFilters={resetFilters} // ✅ Pasamos la función para resetear filtros
            />

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
