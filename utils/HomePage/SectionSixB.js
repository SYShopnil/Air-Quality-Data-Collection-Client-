export function sectionSixBDataManipulation (data) {
    const finale = []
    data.forEach (airDataRaw => {
        const struct = {
            y: airDataRaw.valueOfPm,
            type: 'box',
            name: airDataRaw.month
        }
        finale.push (struct)
    })
    return finale
}