import { useSelector } from "react-redux";
import { Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend
} from "chart.js";

// 📌 Registrar componentes de Chart.js
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

// 🎨 Mapeo de iconos para cada estadística
const statIcons = {
    hp: "❤️",
    attack: "⚔️",
    defense: "🛡️",
    speed: "💨",
    special_attack: "🔮",
    special_defense: "🛡️"
};

const PokemonStatsChart = () => {
    const selectedPokemon = useSelector(state => state.pokemonDetail.selectedPokemon);

    if (!selectedPokemon || !selectedPokemon.stats) {
        return <p className="text-center text-gray-300">Selecciona un Pokémon para ver sus estadísticas</p>;
    }

    // 🔹 Convertimos los nombres de las estadísticas a iconos
    const labels = selectedPokemon.stats.map(stat => {
        const formattedName = stat.stat.name.replace("-", "_"); // 🛠️ Reemplazamos "-" por "_"
        return statIcons[formattedName] || "❓";
    });

    const data = {
        labels,
        datasets: [
            {
                label: "Estadísticas Base",
                data: selectedPokemon.stats.map(stat => stat.base_stat),
                backgroundColor: [
                    "rgba(255, 99, 132, 0.5)",  // HP
                    "rgba(54, 162, 235, 0.5)",  // Attack
                    "rgba(255, 206, 86, 0.5)",  // Defense
                    "rgba(75, 192, 192, 0.5)",  // Speed
                    "rgba(153, 102, 255, 0.5)", // Special Attack
                    "rgba(255, 159, 64, 0.5)"   // Special Defense
                ],
                borderColor: [
                    "rgba(255, 99, 132, 1)",
                    "rgba(54, 162, 235, 1)",
                    "rgba(255, 206, 86, 1)",
                    "rgba(75, 192, 192, 1)",
                    "rgba(153, 102, 255, 1)",
                    "rgba(255, 159, 64, 1)"
                ],
                borderWidth: 2
            }
        ]
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            y: {
                beginAtZero: true,
                max: 200
            }
        },
        plugins: {
            legend: {
                display: false
            }
        }
    };

    return (
        <div className="w-full h-52 bg-gray-800 p-4 rounded-lg shadow-md">
            <Bar data={data} options={options} />
        </div>
    );
};

export default PokemonStatsChart;
