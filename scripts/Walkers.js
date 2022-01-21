import { getCities, getWalkerCities, getWalkers } from "./database.js"

document.addEventListener(
    "click",
    (clickEvent) => {
        const itemClicked = clickEvent.target
        if (itemClicked.id.startsWith("walker")) {
            const [, walkerId] = itemClicked.id.split("--")

            for (const walker of walkers) {
                if (walker.id === parseInt(walkerId)) {
                    const assignments = matchWalkers(walker)
                    const cities = matchCities(assignments)
                    window.alert(`${walker.name} services ${cities}`)
                }
            }
        }
    }
)

const walkers = getWalkers()
const walkerCities = getWalkerCities()
const cities = getCities()

export const Walkers = () => {
    let walkerHTML = "<ul>"

    for (const walker of walkers) {
        walkerHTML += `<li id="walker--${walker.id}">${walker.name}</li>`
    }

    walkerHTML += "</ul>"

    return walkerHTML
}

const matchWalkers = (walker) => {
    const matchingCities = []
    for (const assignment of walkerCities) {
        if (assignment.walkerId === walker.id) {
            matchingCities.push(assignment)
        }
    }
    return matchingCities
}

const matchCities = (matchingCities) => {
    let cityNames = ""
    for (const assignment of matchingCities) {
        for (const city of cities) {
            if (city.id === assignment.cityId) {
                cityNames = `${cityNames} and ${city.name}`
            }
        }
    }
    return cityNames
}