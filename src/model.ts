export default class Model {
  protected lambda0: number;
  protected numOfPhotons: number;
  protected linewidth: number;
  protected _photons: Array<number>;
  public bins: Array<number>;
  public counts: Array<number>;


  public constructor(
    lambda0: number,
    linewidth: number,
    numOfPhotons: number,
    numBins: number = 20
  ) {
    this.lambda0 = lambda0;
    this.numOfPhotons = numOfPhotons;
    this.linewidth = linewidth;
    this.createPhotons();
    this.calculateEquidistBins(lambda0, linewidth, numBins)
    this.counts = new Array(this.bins.length - 1).fill(0);
    this.bins = this.calculateEquidistBins(lambda0, linewidth, numBins)
    this.counts = this.AssignPhotonsToBins(this.photons, this.bins)
  }

  /**
   * Get a random number. The numbers should follow a Cauchy (aka Lorentzian)
   * distribution with the FWHM (full-width at half-maximum) of `linewidth`
   * and centered around `lambda0`.
   * The recalculation from uniformly distributed random numbers is derived here:
   * https://math.stackexchange.com/questions/484395/how-to-generate-a-cauchy-random-variable
   *
   * @param  lambda0 center of the Cauchy distribution
   * @param  linewidth FWHM of the distribution
   * @return         A random number from the Cauchy distribution centered
   *                 around `lambda0` with `linewidth` FWHM
   */
  protected randomCauchy(lambda0: number, linewidth: number): number {
    const randUniform = Math.random();
    const randCauchy = lambda0 + linewidth * Math.tan(Math.PI * (randUniform - 0.5));
    return randCauchy;
  }

  public createPhotons(): void {
    this._photons = [];
    for (let i = 0; i < this.numOfPhotons; i++) {
      this._photons.push(this.randomCauchy(this.lambda0, this.linewidth))
    }
  }

  get photons(): Array<number> {
    return this._photons;
  }

  public calculateEquidistBins(
    lambda0: number,
    linewidth: number,
    numBins: number
  ): Array<number> {

    this.bins = [];
    const left = lambda0 - 6 * linewidth
    const right = lambda0 + 6 * linewidth
    const step = (right - left) / numBins
    for (let i = 0; i <= numBins; i++) {
      this.bins.push(left + i * step)
    }
    return this.bins
  }

  protected findBin(value: number, bins: Array<number>) {
    for (let leftBinEdgeIndex = 0; leftBinEdgeIndex < bins.length - 1; leftBinEdgeIndex++) {
      if ((value >= bins[leftBinEdgeIndex]) && (value < bins[leftBinEdgeIndex + 1])) {
        return leftBinEdgeIndex;
      }
    }
    return null;
  }

  public AssignPhotonsToBins(photons: Array<number>, bins: Array<number>) {
    const left = bins[0];
    const right = bins[bins.length - 1];

    for (let photon of photons) {
      if ((photon < left) || (photon > right)) { continue }
      const binIndex = this.findBin(photon, bins)
      if (binIndex) {
        this.counts[binIndex] += 1;
      }
    }
    return this.counts
  }

  public addPhoton() {
    const value = this.randomCauchy(this.lambda0, this.linewidth)
    return this.findBin(value, this.bins)
  }
}
