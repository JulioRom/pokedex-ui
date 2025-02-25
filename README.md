# 🏆 Pokédex React - Interfaz Interactiva de Pokémon

## 📌 Descripción
Esta es una Pokédex desarrollada en **React.js**, que permite a los usuarios explorar todos los Pokémon con sus estadísticas, imágenes y detalles. Se han implementado características avanzadas como **filtros por nombre, tipo, peso, altura y experiencia base**, una **pestaña de favoritos** y una interfaz inspirada en la estética de las Pokédex de los juegos oficiales.

---

## 🚀 **Características**
✅ **Exploración completa** de todos los Pokémon disponibles en la PokéAPI  
✅ **Filtros avanzados** por nombre, tipo, peso, altura y experiencia base  
✅ **Autocompletado** en la búsqueda de Pokémon para mayor rapidez  
✅ **Pestaña de Favoritos** con gestión de Pokémon guardados  
✅ **Interfaz responsiva y optimizada** con **Tailwind CSS** y **Material UI**  
✅ **Gestín eficiente de datos** con **React Query** (caché y optimización de solicitudes)  
✅ **Efectos de sonido y animaciones** para mejorar la experiencia de usuario  
✅ **Gráficos estadísticos** usando **Chart.js**  
✅ **Carga eficiente y renderizado optimizado**  

---

## 🛠 **Tecnologías Utilizadas**
- ⚛️ **React.js** - Framework principal  
- 🎨 **Tailwind CSS** - Estilos modernos y optimizados  
- 🔍 **React Query** - Caché y optimización de solicitudes  
- 🎧 **Howler.js** - Manejo de sonidos  
- 📊 **Chart.js** - Gráficos de estadísticas  
- 🛠 **Material UI** - Componentes modernos para una mejor experiencia de usuario  
- 📛 **Redux Toolkit** - Gestión de estado avanzada  
- 📝 **PokéAPI** - API de datos  

---

## 📆 **Instalación y Configuración**

1. **Clonar el repositorio**
```bash
git clone https://github.com/JulioRom/pokedex-ui.git
cd pokedex-ui
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Ejecutar el proyecto en desarrollo**
```bash
npm run dev
```

4. **Construir para producción**
```bash
npm run build
```

---

## 🔧 **Uso de la Aplicación**
1. **Buscar Pokémon:** Usa la barra de búsqueda para encontrar un Pokémon por nombre o número.  
2. **Autocompletado:** A medida que escribes, verás sugerencias de nombres de Pokémon.  
3. **Filtrar Pokémon:** Puedes filtrar por tipo, peso, altura y experiencia base.  
4. **Explorar detalles:** Haz clic en cualquier Pokémon para ver sus estadísticas y características.  
5. **Guardar en Favoritos:** Puedes guardar Pokémon en una pestaña especial para tener acceso rápido.  
6. **Escuchar sonidos:** Algunos eventos activan sonidos para mayor inmersión.  
7. **Ver gráficos de estadísticas:** Consulta las estadísticas de cada Pokémon de forma visual con **Chart.js**.  

---

## 📝 **Personalización y Mejora**
- **Modificar estilos:** Puedes personalizar los colores y diseño en `tailwind.config.js` o modificar directamente los archivos CSS.
- **Agregar nuevas funciones:** Modifica los hooks en `hooks/usePokemonList.js` o `hooks/usePokemonDetails.js`.
- **Configurar sonidos:** Edita `soundManager.js` para cambiar los sonidos de la Pokédex.

---

## 🛠 **Errores y Solución de Problemas**
Si tienes problemas con la instalación o ejecución, intenta:
```bash
npm install --legacy-peer-deps
```
Si Tailwind no compila correctamente, revisa la configuración de `tailwind.config.js` y asegúrate de que está detectando los archivos de React.

Si el autocompletado no funciona correctamente, verifica que la prop `allPokemon` se esté pasando correctamente al componente `FilterPanel`.

---

## 🤝 **Contribuciones**
¡Cualquier contribución es bienvenida! Si deseas mejorar la Pokédex, envía un **pull request** o abre un **issue** en GitHub.

---

## 👨‍💻 **Autor**

- **Desarrollado por JulioRom**
- 📧 **Correo:** [julioandrescampos@gmail.com](mailto:julioandrescampos@gmail.com)
- 🔗 **GitHub:** [https://github.com/JulioRom](https://github.com/JulioRom)


## 📝 **Licencia**
Este proyecto se distribuye bajo la licencia **MIT**, lo que significa que puedes usarlo libremente con las condiciones de atribución adecuadas.

---
🎉 **Desarrollado con pasión por el mundo Pokémon y React.js. ¡Atrápalos todos!** 🚀🔥
