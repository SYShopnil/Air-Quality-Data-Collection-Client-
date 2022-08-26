export  function structureForYearlyDataOfSectionFour(rawAirData) {
    const data = rawAirData;
    const final = []
    data.map(airData => {
        const struct = {
            x: [],
            y: [],
            mode: 'lines+markers'
        }
        airData.map (singleAirData => {
            struct.x.push (singleAirData.year)
            struct.y.push (singleAirData.avgAQI)
            struct.name = singleAirData.division
        })
        final.push (struct)
    })
    // console.log(final)
    return final
}

export  function structureForMonthlyDataOfSectionFour (rawAirData) {
    const data = rawAirData; 
    const final = []
    data.map(airData => {
        const struct = {
            x: [],
            y: [],
            mode: 'lines+markers'
        }
        airData.map (singleAirData => {
            struct.x.push (singleAirData.month)
            struct.y.push (singleAirData.avgAQI)
            struct.name = singleAirData.division
        })
        final.push (struct)
    })
    return final
}