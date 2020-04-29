import Model from "./model"
import {
  histogram
} from 'd3'

const lambda0 = 501.57 //nm - He 1P -> 1S
const fwhm = 0.05

const model = new Model(lambda0, fwhm, 1000);


const bins = model.calculateEquidistBins(lambda0, fwhm, 20)
console.log(bins)
const counts = model.AssignPhotonsToBins(model.photons, bins)
console.log(counts)
//console.log(model.photons)
//console.log(hist(model.photons))
