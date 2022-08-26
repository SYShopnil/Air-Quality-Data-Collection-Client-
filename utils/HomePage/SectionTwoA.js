export function makeStructDataForSectionTwoA(data) {
    const final = []
    data.map(group => {
        const struct = {
            x: [],
            y: []
        }
        group.map(airData => {
            struct.x.push(airData.time)
            struct.y.push(airData.avg)
            struct.type = "scatter"
            struct.name = airData.agencyName
        })
        final.push(struct)
    })
    return final
}