import PropTypes from "prop-types";
import { Autocomplete, TextField, Button, Slider, Box } from "@mui/material";

const FilterPanel = ({
    search, setSearch,
    selectedType, setSelectedType, types,
    weightRange, setWeightRange,
    heightRange, setHeightRange,
    expBaseRange, setExpBaseRange,
    allPokemon = [], // ✅ Evita errores asegurando que tenga un valor predeterminado
    resetFilters
}) => {
    return (
        <Box className="w-full max-w-md bg-gray-800 p-4 rounded-lg shadow-md flex flex-col gap-4 text-white">
            {/* 🔍 Búsqueda con Autocompletado */}
            <Autocomplete
                freeSolo
                disableClearable
                options={allPokemon?.map((pokemon) => pokemon.name) || []}
                inputValue={search}
                onInputChange={(event, newValue) => setSearch(newValue)}
                onChange={(event, newValue) => setSearch(newValue || "")}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label="Buscar Pokémon..."
                        variant="outlined"
                        size="small"
                        className="w-full bg-gray-700 text-white border-yellow-400"
                        inputProps={{
                            ...params.inputProps,
                            type: 'search',
                        }}
                    />

                )}
            />

            {/* 🔹 Filtrar por Tipo */}
            <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full p-2 border border-yellow-400 bg-gray-700 rounded-md text-center focus:ring-2 focus:ring-yellow-500"
            >
                <option value="">Todos los tipos</option>
                {types.map((type, index) => (
                    <option key={index} value={type}>{type.toUpperCase()}</option>
                ))}
            </select>

            {/* 🎛️ Sliders (Compactos) */}
            <div className="flex flex-col gap-3">
                <Box className="text-xs">
                    <label>Peso: {weightRange} kg</label>
                    <Slider
                        value={weightRange}
                        onChange={(e, newValue) => setWeightRange(newValue)}
                        min={1} max={10000}
                        sx={{ color: "#FFD700" }}
                        size="small"
                    />
                </Box>

                <Box className="text-xs">
                    <label>Altura: {heightRange} m</label>
                    <Slider
                        value={heightRange}
                        onChange={(e, newValue) => setHeightRange(newValue)}
                        min={0.1} max={200} step={0.1}
                        sx={{ color: "#FFD700" }}
                        size="small"
                    />
                </Box>

                <Box className="text-xs">
                    <label>Exp. Base: {expBaseRange}</label>
                    <Slider
                        value={expBaseRange}
                        onChange={(e, newValue) => setExpBaseRange(newValue)}
                        min={1} max={700}
                        sx={{ color: "#FFD700" }}
                        size="small"
                    />
                </Box>
            </div>

            {/* 🔄 Botón de Reiniciar Filtros */}
            <Button
                variant="contained"
                color="warning"
                onClick={resetFilters}
                className="mt-2 py-1 text-xs"
            >
                Reiniciar Filtros
            </Button>
        </Box>
    );
};

FilterPanel.propTypes = {
    search: PropTypes.string.isRequired,
    setSearch: PropTypes.func.isRequired,
    selectedType: PropTypes.string.isRequired,
    setSelectedType: PropTypes.func.isRequired,
    types: PropTypes.arrayOf(PropTypes.string).isRequired,
    weightRange: PropTypes.number.isRequired,
    setWeightRange: PropTypes.func.isRequired,
    heightRange: PropTypes.number.isRequired,
    setHeightRange: PropTypes.func.isRequired,
    expBaseRange: PropTypes.number.isRequired,
    setExpBaseRange: PropTypes.func.isRequired,
    allPokemon: PropTypes.array.isRequired, 
    resetFilters: PropTypes.func.isRequired 
};

export default FilterPanel;
