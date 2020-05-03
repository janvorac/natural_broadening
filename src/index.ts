import Model from "./model"
import PlotMaker from "./plot"

const lambda0 = 501.57 //nm - He 1P -> 1S
const fwhm = 0.05

const model = new Model(lambda0, fwhm, 10, 20);


const plotMaker = new PlotMaker(model.counts, model.bins, "#histogram-container", 480, 200)

document.getElementById("add-photons").addEventListener("click", addPhotonsClicked);

/*
function addPhotonsClicked() {
  const numPhotons = 10
  for (let i = 0; i < numPhotons; i++) {
    const timer = setInterval(() => {
      const binIndex = model.addPhoton()
      if (binIndex) {
        plotMaker.addPhoton(binIndex)
      }
    }, 50)
  }
}
*/

function addPhotonsClicked() {
  const numPhotons = numPhotonsInput.value;
  console.log(numPhotons)
  let photonsAdded = 0;
  const timer = setInterval(() => {
    const binIndex = model.addPhoton()
    if (binIndex) {
      plotMaker.addPhoton(binIndex)
    }
    photonsAdded += 1;
    if (photonsAdded >= numPhotons) {
      clearInterval(timer)
    }

  }, 50)

}


//console.log(model.photons)
//console.log(hist(model.photons))
