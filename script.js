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

// Créer une carte centrée sur Paris
var map = L.map('map').setView([48.8566, 2.3522], 12); // Coordonnées de Paris

// Ajouter un calque de tuiles OpenStreetMap à la carte
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

L.circle([48.8566, 2.3522], {
  color: 'red',
  fillColor: '#f03',
  fillOpacity: 0.5,
  radius: 500
  }).addTo(map);

// Exemple de données
const data = [
  { year: 2000, population: 120 },
  { year: 2005, population: 140 },
  { year: 2010, population: 200 },
  { year: 2015, population: 215 },
  { year: 2020, population: 270 }
];

// Dimensions du graphique
const width = 500, height = 300;

const svg = d3.select("#chart")
  .append("svg")
  .attr("width", width)
  .attr("height", height);

const x = d3.scaleLinear()
  .domain([d3.min(data, d => d.year), d3.max(data, d => d.year)])
  .range([0, width]);

const y = d3.scaleLinear()
  .domain([0, d3.max(data, d => d.population)])
  .range([height, 0]);

// Créer les axes
svg.append("g")
  .attr("transform", "translate(0," + height + ")")
  .call(d3.axisBottom(x));

svg.append("g")
  .call(d3.axisLeft(y));

// Tracer la ligne de population
const line = d3.line()
  .x(d => x(d.year))
  .y(d => y(d.population));

svg.append("path")
  .data([data])
  .attr("class", "line")
  .attr("d", line);
