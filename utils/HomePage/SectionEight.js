export function graphDataForSectionEight(data) {
        // console.log(data);
        let plotData = [];
        let struct = {
            x: [],
            y: [],
            type: 'bar'
        }
        data.map((i) => {
            struct.y.push(i.avgPmValue);
            struct.x.push(i.year);
        })
        plotData.push(struct)
        return plotData
    }