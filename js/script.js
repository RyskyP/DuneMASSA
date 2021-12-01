//js carrousel page 3
//changement image
// Variable globale
let index = 0;
// Gestion des événements
$('main>section:nth-of-type(3)>div>span').click(function () {
  // Récupération index
  let indexN = $('main>section:nth-of-type(3)>div>span').index(this);
  // Renouveller l'image
  $('main>section:nth-of-type(3)>div>img').eq(index).fadeOut(1000).end().eq(indexN).fadeIn(1000);
  // Mettre à jour l'index
index = indexN;
});

//changement texte
let index2 = 0;
$('main>section:nth-of-type(3)>div>span').click(function () {
  let indexN2 = $('main>section:nth-of-type(3)>div>span').index(this);
  $('main>section:nth-of-type(3)>div:nth-of-type(3)>p').eq(index2).fadeOut(1000).end().eq(indexN2).fadeIn(1000);
index2 = indexN2;
});

//js carrousel page 4
let index3 = 0;
$('main>section:nth-of-type(4)>div>span').click(function () {
  let indexN = $('main>section:nth-of-type(4)>div>span').index(this);
  $('main>section:nth-of-type(4)>div>img').eq(index).fadeOut(1000).end().eq(indexN).fadeIn(1000);
index = indexN;
});

//js carte page 5
//--------------------------------------------bouton loc--------------------------------------------------------
// Appelée si récupération des coordonnées réussie
function positionSucces(position) {
  // Injection du résultat dans du texte
  const lat = Math.round(1000 * position.coords.latitude) / 1000;
  const long = Math.round(1000 * position.coords.longitude) / 1000;
  $("p").text(`Latitude: ${lat}°, Longitude: ${long}°`);
  carte.flyTo([position.coords.latitude,position.coords.longitude],12);
  //afficher les cinés
  L.geoJSON(cine, {
    style: function (feature) {
        return {color: feature.properties.color};
    }
  }).bindPopup(function (layer) {
    return layer.feature.properties.description;
  }).addTo(carte)
}

// Appelée si échec de récuparation des coordonnées
function positionErreur(erreurPosition) {
  // Cas d'usage du switch !
  let natureErreur;
  switch (erreurPosition.code) {
    case erreurPosition.TIMEOUT:
      // Attention, durée par défaut de récupération des coordonnées infini
      natureErreur = "La géolocalisation prends trop de temps...";
      break;
    case erreurPosition.PERMISSION_DENIED:
      natureErreur = "Vous n'avez pas autorisé la géolocalisation.";
      break;
    case erreurPosition.POSITION_UNAVAILABLE:
      natureErreur = "Votre position n'a pu être déterminée.";
      break;
    default:
      natureErreur = "Une erreur inattendue s'est produite.";
  }
  // Injection du texte
  $("p").text(natureErreur);
}
//--------------------------------------------carte--------------------------------------------------------
// Récupération des coordonnées au clic sur le bouton
$("button").click(function () {
  // Support de la géolocalisation
  if ("geolocation" in navigator) {
    // Support = exécution du callback selon le résultat
    navigator.geolocation.getCurrentPosition(positionSucces, positionErreur, {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 30000
    });
  } else {
    // Non support = injection de texte
    $("p").text("La géolocalisation n'est pas supportée par votre navigateur");
  }
});

// Création de la carte, vide à ce stade
let carte = L.map('carte', {
  center: [47.2608333, 2.4188888888888886], // Zoom Dijon
  zoom: 5,
  minZoom: 4,
  maxZoom: 19,
});
// Ajout des tuiles (ici OpenStreetMap)
// https://wiki.openstreetmap.org/wiki/Tiles#Servers
L.tileLayer('https://a.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap contributors</a>',
}).addTo(carte);
// Ajout de l'échelle
L.control.scale().addTo(carte);

var marker = L.marker([47.323570, 5.034663]).addTo(mymap);



