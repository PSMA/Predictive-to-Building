var mymap = L.map('map', {maxZoom: 19}).setView([-27.3717673, 135.3515625], 4);

var basemaps = [
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        minZoom: 0,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        label: 'OSM Mapnik'  // optional label used for tooltip
    }),
    L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community',
        maxZoom: 19,
        minZoom: 0,
        label: 'Esri World Imagry'
    }),
    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 19,
        minZoom: 0,
        label: 'CartoDB Positron'
    })
];

mymap.addControl(L.control.basemaps({
    basemaps: basemaps
}));


let buildLayer = L.featureGroup();
buildLayer.addTo(mymap);

let input =$("#input");
let suggestions = $("#suggestions")

input.on('input', () => {
    suggestions.empty()
    if (input.val().length > 3){
        getSuggestions();
    }
})

function getSuggestions() {
    $.ajax({
        url: "/suggest",
        data: {
            addressString: input.val()
        },
        success: (resp) => {
            handleSuggestions(resp);
        }
    });
}

function handleSuggestions(suggestionData) {
    JSON.parse(suggestionData).suggest.map((suggestion) => {
        let sug = $("<li>");
        sug.text(suggestion.address);
        suggestions.append(sug);
        sug.addClass("list-group-item");
        sug.click(function (e) {
            e.preventDefault();
            getBuilding(suggestion);
        });
    });
}

function getBuilding(suggestionData) {
    $.ajax({
        url: "/getBuilding",
        data: {
            addressId: suggestionData.id
        },
        success: (resp) => {
            handleBuilding(resp, suggestionData);
        }
    });
}

function handleBuilding(buildingData, suggestionObj) {
    buildLayer.clearLayers();
    
    let jsonBD =  JSON.parse(buildingData)
    if (jsonBD.hasOwnProperty("message"))
    {
        alert("No building data available at " + suggestionObj.address)
    } else {
        jsonBD.data.map((build) => {
            var geojsonFeature = {
                "type": "Feature",
                "geometry": {
                    "type": "MultiPolygon",
                    "coordinates": build['footprint2d']['coordinates']
                }
            };
            L.geoJSON(geojsonFeature).addTo(buildLayer);
            mymap.fitBounds(buildLayer.getBounds());
        });
    }
}

