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

const matchWalkers = (walkerObj) => {
    let matchingCities = []
    for (const city of walkerCities) {
        if (city.walkerId === walkerObj.id) {
            matchingCities.push(city)
        }
    }
    return matchingCities
}

const matchCities = (matchingCities) => {
    let cityNames = ""
    for (const cityMatch of matchingCities) {
        for (const city of cities) {
            if (city.id === cityMatch.cityId) {
                if (cityNames === "") {
                    cityNames += `${city.name}`
                }
                else {
                    cityNames = `${cityNames} and ${city.name}`
                }
            }
        }
    }
    return cityNames
}