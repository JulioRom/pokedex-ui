import { Howl, Howler } from "howler";
import pokedexOpenSound from "../sounds/pokedex_open.mp3";
import selectPokemonSound from "../sounds/select_pokemon.mp3";
import scrollSound from "../sounds/scroll.mp3";

class SoundManager {
    constructor() {
        this.sounds = {
            pokedexOpen: new Howl({ src: [pokedexOpenSound], volume: 0.05 }),
            selectPokemon: new Howl({ src: [selectPokemonSound], volume: 0.3 }),
            scroll: new Howl({ src: [scrollSound], volume: 0.2 }),
        };
        this.isUserInteracted = false;
        this.audioUnlocked = false;
        this.initAudioUnlock();
    }

    initAudioUnlock() {
        const unlockAudio = async () => {
            if (!this.audioUnlocked) {
                try {
                    await Howler.ctx.resume(); // Intentar desbloquear el AudioContext
                    this.audioUnlocked = true;
                    this.isUserInteracted = true;
                    document.removeEventListener("click", unlockAudio);
                    document.removeEventListener("keydown", unlockAudio);
                    console.log("🔊 Audio desbloqueado por interacción del usuario.");

                    // Reproducir el sonido de apertura de la Pokédex si aún no se ha reproducido
                    if (this.sounds.pokedexOpen && !this.sounds.pokedexOpen.playing()) {
                        this.sounds.pokedexOpen.play();
                    }
                } catch (error) {
                    console.warn("⚠️ No se pudo desbloquear el AudioContext:", error);
                }
            }
        };

        document.addEventListener("click", unlockAudio);
        document.addEventListener("keydown", unlockAudio);
    }

    playSound(soundKey) {
        if (this.audioUnlocked && this.sounds[soundKey]) {
            this.sounds[soundKey].play();
        } else {
            console.warn(`⚠️ No se pudo reproducir '${soundKey}', el usuario aún no ha interactuado.`);
        }
    }
}

export const soundManager = new SoundManager();
