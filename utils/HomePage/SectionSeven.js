export function sectionSevenBDataManipulation (data) {
    const finale = []
    data.forEach (airDataRaw => {
        const struct = {
            y: airDataRaw.valueOfPm,
            type: 'box',
            name: airDataRaw.session
        }
        finale.push (struct)
    })
    return finale
}