// Utilisation de l'API World Bank pour récupérer la population d'un pays
fetch('http://api.worldbank.org/v2/country/FR/indicator/SP.POP.TOTL?format=json')
  .then(response => response.json())  // Convertir la réponse en JSON
  .then(data => {
    const populationData = data[1];  // Les données réelles sont dans le second élément
    populationData.forEach(item => {
      console.log(`Année : ${item.date}, Population : ${item.value}`);
      // Traiter les données pour afficher un graphique ou autre

    });
  })
  .catch(error => {
    console.error("Erreur lors de la récupération des données démographiques :", error);
  });


//-----------------------------------
// Créer une carte centrée sur Paris
// Initialisation de la carte avec Leaflet.js
var map = L.map('map').setView([48.8566, 2.3522], 12); // Coordonnées de Paris

// Ajouter un calque de tuiles OpenStreetMap à la carte
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

//Ajout de cercles représentant la densité de population
const arrondissements = [
  { coord: [48.8626, 2.3364], densite: 20100 }, // 1er arrondissement
  { coord: [48.8681, 2.3418], densite: 26000 }, // 2e arrondissement
  { coord: [48.8638, 2.3622], densite: 22000 }, // 3e arrondissement
  { coord: [48.8546, 2.3570], densite: 25000 }, // 4e arrondissement
  { coord: [48.8443, 2.3471], densite: 28000 }, // 5e arrondissement
  { coord: [48.8493, 2.3331], densite: 30000 }, // 6e arrondissement
  { coord: [48.8565, 2.3121], densite: 20000 }, // 7e arrondissement
  { coord: [48.8718, 2.3119], densite: 24000 }, // 8e arrondissement
  { coord: [48.8762, 2.3365], densite: 29000 }, // 9e arrondissement
  { coord: [48.8747, 2.3583], densite: 37000 }, // 10e arrondissement
  { coord: [48.8572, 2.3793], densite: 40000 }, // 11e arrondissement
  { coord: [48.8355, 2.4157], densite: 23000 }, // 12e arrondissement
  { coord: [48.8277, 2.3631], densite: 22000 }, // 13e arrondissement
  { coord: [48.8314, 2.3232], densite: 21000 }, // 14e arrondissement
  { coord: [48.8405, 2.2983], densite: 25000 }, // 15e arrondissement
  { coord: [48.8632, 2.2631], densite: 16000 }, // 16e arrondissement
  { coord: [48.8867, 2.3082], densite: 23000 }, // 17e arrondissement
  { coord: [48.8924, 2.3447], densite: 21000 }, // 18e arrondissement
  { coord: [48.8844, 2.3821], densite: 20000 }, // 19e arrondissement
  { coord: [48.8635, 2.3984], densite: 24000 }  // 20e arrondissement
];

// Ajouter un cercle pour chaque arrondissement
arrondissements.forEach(({ coord, densite }) => {
L.circle(coord,{
  color: 'red',
  fillColor: '#f03',
  fillOpacity: 0.1,
  radius: densite * 0.03 // Rayon basé sur la densité
}).addTo(map).bindPopup(`Densité de population : ${densite} habitants/km²`);
});



//-----------------------------------
//Création d'un graphique linéaire avec D3.js
const data = [
  { year: 2010, population: 2200000 },
  { year: 2011, population: 2225000 },
  { year: 2012, population: 2250000 },
  { year: 2013, population: 2275000 },
  { year: 2020, population: 2300000 }
];

const svg = d3.select('#graph');
const margin = { top: 20, right: 30, bottom: 30, left: 50 };
const width = 600 - margin.left - margin.right;
const height = 400 - margin.top - margin.bottom;

const x = d3.scaleLinear()
  .domain(d3.extent(data, d => d.year))
  .range([margin.left, width + margin.left]);

const y = d3.scaleLinear()
  .domain([2000000, 2500000])
  .range([height + margin.top, margin.top]);

// Ajouter des axes
svg.append('g')
  .attr('transform', `translate(0,${height + margin.top})`)
  .call(d3.axisBottom(x));
svg.append('g')
  .attr('transform', `translate(${margin.left},0)`)
  .call(d3.axisLeft(y));

// Ajouter la ligne
svg.append('path')
  .datum(data)
  .attr('fill', 'none')
  .attr('stroke', 'blue')
  .attr('stroke-width', 2)
  .attr('d', d3.line()
    .x(d => x(d.year))
    .y(d => y(d.population))
  );
