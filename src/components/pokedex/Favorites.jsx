import { useState, useEffect } from "react";
import { Card, CardContent, Typography, Grid, IconButton, Button } from "@mui/material";
import { Favorite, Delete } from "@mui/icons-material";
import PokemonCard from "./PokemonCard";
import Swal from "sweetalert2";

const Favorites = () => {
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
        setFavorites(storedFavorites);
    }, []);

    // 🏠 Agregar o eliminar un Pokémon de favoritos en tiempo real
    const toggleFavorite = (pokemon) => {
        let updatedFavorites = [...favorites];

        if (favorites.some((fav) => fav.id === pokemon.id)) {
            updatedFavorites = favorites.filter((fav) => fav.id !== pokemon.id);
        } else {
            updatedFavorites.push(pokemon);
        }

        setFavorites(updatedFavorites);
        localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    };

    // 🏠 Eliminar todos los favoritos con confirmación
    const clearFavorites = () => {
        Swal.fire({
            title: "¿Eliminar todos los favoritos?",
            text: "Esta acción no se puede deshacer",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Sí, eliminar",
        }).then((result) => {
            if (result.isConfirmed) {
                setFavorites([]);
                localStorage.removeItem("favorites");
                Swal.fire("Eliminados", "Todos los Pokémon han sido eliminados.", "success");
            }
        });
    };

    return (
        <div className="p-6 min-h-screen bg-gray-900 text-white">
            <h2 className="text-3xl font-bold mb-6 text-center">🔥 Pokémon Favoritos</h2>

            {favorites.length === 0 ? (
                <Typography variant="h6" className="text-gray-400 text-center">
                    No tienes Pokémon favoritos aún.
                </Typography>
            ) : (
                <Grid container spacing={3} justifyContent="center">
                    {favorites.map((pokemon) => (
                        pokemon && pokemon.id ? ( // ✅ Validamos que `pokemon` tenga ID antes de renderizar
                            <Grid item key={`${pokemon.id}-${pokemon.name}`} xs={12} sm={6} md={4} lg={3}>
                                <Card className="bg-gray-800 shadow-lg border border-gray-700 rounded-lg relative">
                                    {/* 📌 Botón de favorito en la parte superior derecha */}
                                    <IconButton
                                        onClick={() => toggleFavorite(pokemon)}
                                        color={favorites.some((fav) => fav.id === pokemon.id) ? "error" : "default"}
                                        className="absolute top-2 right-2"
                                    >
                                        <Favorite />
                                    </IconButton>

                                    <CardContent className="flex flex-col items-center p-4">
                                        <PokemonCard pokemon={pokemon} />
                                    </CardContent>
                                </Card>
                            </Grid>
                        ) : null
                    ))}
                </Grid>
            )}

            {favorites.length > 0 && (
                <div className="flex justify-center mt-6">
                    <Button 
                        variant="contained" 
                        color="error" 
                        startIcon={<Delete />}
                        onClick={clearFavorites}
                        className="hover:bg-red-700"
                    >
                        Eliminar todos
                    </Button>
                </div>
            )}
        </div>
    );
};

export default Favorites;
