export function SectionSixADataManipulation (data) {
    const plot = []
        data.forEach(airData => {
            const struct = {
                y: airData.valueOfPm,
                type: 'box',
                name: airData.station,
                visible: airData.agencyName,

            }
            plot.push(struct)
        })

        return plot
} 