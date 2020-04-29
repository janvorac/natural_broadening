import Model from "./model"
import {
  histogram
} from 'd3'

const lambda0 = 777
const fwhm = 0.05

const model = new Model(lambda0, fwhm, 1000);

let hist = histogram()
  .domain([lambda0 - 3 * fwhm, lambda0 + 3 * fwhm])

console.log(model.photons)
console.log(hist(model.photons))
