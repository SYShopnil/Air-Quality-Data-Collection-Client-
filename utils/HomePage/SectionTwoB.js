export function DataStructForSectionTwoB (data, agentOne, agentTwo) {
    let getAllYear = [];
    data.map(airData => {
        getAllYear.push(airData.year)
    })
    getAllYear = [...new Set([...getAllYear])]
    // console.log(getAllYear)
    const final = [];
    const layout = {
        xaxis: {
            title: ""
        },
        yaxis: {
            title: ""
        }
    }
    getAllYear.map(availableYear => {
        const struct = {
            x: [],
            y: [],
            mode: 'lines+markers',
            type: 'scatter'
        }

        data.map(airData => {
            if (availableYear == airData.year) {
                if (airData.agentId == agentOne) {
                    if (!layout.xaxis.title) {
                        layout.xaxis.title = `${airData.agentName} Mean`
                    }
                    struct.x.push(airData.dailyAvgMean)
                } else if (airData.agentId == agentTwo) {
                    if (!layout.yaxis.title) {
                        layout.yaxis.title = `${airData.agentName} Mean`
                    }
                    struct.y.push(airData.dailyAvgMean)
                }
            }

        })
        struct.name = availableYear
        final.push(struct)
    })
    return {
        data: final,
        layout
    }
}