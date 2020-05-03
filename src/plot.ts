import {
  select,
  axisLeft,
  axisTop,
  Axis,
  scaleLinear,
  min,
  max
} from 'd3'

export default class PlotMaker {
  protected binHeights: Array<number>;
  protected binEdges: Array<number>;
  protected margin: object;
  protected container: any;
  public plotGroup: any;
  protected width: number;
  protected height: number;
  protected xAxis: Axis<number>;
  protected yAxis: Axis<number>;
  protected xScale: any;
  protected yScale: any;
  protected rectWidth: number;
  protected data: Array<object>;


  public constructor(
    binHeights: Array<number>,
    binEdges: Array<number>,
    containerID: string,
    totalWidth: number,
    totalHeight: number
  ) {
    this.margin = {
      top: 60,
      right: 30,
      bottom: 4,
      left: 60
    };
    this.container = select(containerID)
    this.binHeights = binHeights;
    this.binEdges = binEdges;
    this.width = totalWidth - this.margin["left"] - this.margin["right"];
    this.height = totalHeight - this.margin["top"] - this.margin["bottom"];
    this.plotGroup = this.container.append('g')
      .attr(
        "transform",
        `translate(${this.margin["left"]}, ${this.margin["top"]})`
      )
      .classed("plotGroup", true);
    this.createScales();
    this.drawAxes();
    this.calculateRectangleXs();
    this.drawBars();
  }

  protected drawAxes(): void {
    this.xAxis = this.plotGroup.append("g")
      .call(axisTop(this.xScale))
    //.attr("transform", `translate(0,${this.height})`)

    this.yAxis = this.plotGroup.append("g")
      .call(axisLeft(this.yScale))

    this.plotGroup.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - this.margin["left"])
      .attr("x", 0 - (this.height / 2))
      .attr("dy", "0.8em")
      .style("text-anchor", "middle")
      .text("photon count");
    this.container.append("text")
      .attr("y", this.margin["top"] / 4)
      .attr("x", (this.width / 2) + this.margin["left"])
      .style("text-anchor", "middle")
      .attr("dy", "0.8em")
      .text("wavelength [nm]")

  }

  protected createScales() {
    this.yScale = scaleLinear()
      .range([this.height, 0])
      .domain([0, max(this.binHeights)]);
    this.xScale = scaleLinear()
      .range([0, this.width])
      .domain([min(this.binEdges), max(this.binEdges)])
  }

  protected calculateRectangleXs() {
    this.rectWidth = this.width / this.binHeights.length
    this.data = []
    for (let i = 0; i < this.binHeights.length; i++) {
      this.data.push({ 'height': this.binHeights[i], 'width': i * this.rectWidth })
    }
  }

  protected drawBars(padding: number = 2) {
    this.plotGroup.selectAll("rect")
      .data(this.data)
      .enter()
      .append("rect")
      .attr("x", 1)
      .attr("transform", (d: object) => `translate(${d['width']}, 0)`)
      .attr("y", (d: object) => this.yScale(d['height']))
      .attr("width", this.rectWidth - padding)
      .attr("height", (d: object) => this.height - this.yScale(d['height']))
      .style("fill", "#69b3a2")
  }

  public addPhoton(binIndex: number) {
    this.binHeights[binIndex] += 1
    this.data[binIndex]['height'] += 1
    this.redraw()
  }

  protected redraw() {
    this.yScale.domain([0, max(this.binHeights)])
    this.plotGroup.selectAll("rect")
      .attr("y", (d: object) => this.yScale(d['height']))
      .attr("height", (d: object) => this.height - this.yScale(d['height']))
    this.yAxis.call(axisLeft(this.yScale))
  }


}
