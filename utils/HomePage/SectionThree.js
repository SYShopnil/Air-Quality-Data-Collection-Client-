export function createGraphStructureForSectionThree (rawAirData) {
    const data = rawAirData
        const final = [];
        data.map (rawData => {
            console.log(rawData.color)
            const struct = {
                type: "scattermapbox",
                fill: "toself",
                lon: rawData.lon,
                lat: rawData.lat,
                marker: { 
                    size: 2, 
                    color: rawData.color
                }
            }
            final.push (struct)
        })
        const layout =  {
            mapbox: {
                style: "stamen-terrain",
                center: { lon:90.3563 , lat:  23.6850 },
                zoom: 5
            },
            showlegend: false,
            height: 450,
            width: 600
        };
        console.log(layout)
        return {
            layout,
            airData: final
        }
}