import Model from "./model"
import PlotMaker from "./plot"

const lambda0 = 501.57 //nm - He 1P -> 1S
const fwhm = 0.05

const model = new Model(lambda0, fwhm, 10, 20);


const plotMaker = new PlotMaker(model.counts, model.bins, "#histogram-container", 480, 200)

document.getElementById("add-photons").addEventListener("click", addPhotonsClicked);
function addPhotonsClicked() {
  const numPhotons = 10
  for (let i = 0; i < numPhotons; i++) {
    const binIndex = model.addPhoton()
    if (binIndex) {
      plotMaker.addPhoton(binIndex)
    }
  }
}
//console.log(model.photons)
//console.log(hist(model.photons))
