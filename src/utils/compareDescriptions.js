import { findBestMatch } from 'string-similarity'
import { getAllSpecies } from './firebase.js'

export async function compareDescriptions(userDescription) {
	const allSpecies = await getAllSpecies()
	const justDescriptions = await allSpecies.map((specie) => specie.description)	
	const probableSpecies = await findBestMatch(userDescription, justDescriptions)
	probableSpecies.ratings.sort((a, b) => -(a.rating>b.rating)||+(a.rating<b.rating))

	console.log(allSpecies, probableSpecies)

	let probableSpeciesComplete = []

	probableSpecies.ratings.forEach((pSpecie) => {
		allSpecies.forEach((specie) => {
			if(pSpecie.target==specie.description && pSpecie.rating>=0.50) {
				probableSpeciesComplete.push({scientificName: specie.scientificName, description: specie.description, rating: pSpecie.rating})
			}
		})
	})
	console.log(probableSpeciesComplete)
	return probableSpeciesComplete
}