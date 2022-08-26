export function SectionFiveDataManipulation (data) {
     let plotData = [];
        let struct = {
            x: [],
            y: [],
            mode: 'line',
            name: 'Scatter'
        }
        data.map((data) => {
            struct.x.push(data.division);
            struct.y.push(data.avgPM);
        })
        plotData.push(struct);
        return plotData;
}