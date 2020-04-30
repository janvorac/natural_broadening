import {
  select,
  axisLeft,
  axisBottom,
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


  public constructor(
    binHeights: Array<number>,
    binEdges: Array<number>,
    containerID: string,
    totalWidth: number,
    totalHeight: number
  ) {
    this.margin = {
      top: 10,
      right: 30,
      bottom: 45,
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
      .classed("plotGroup", true)
  }

  protected drawAxes(): void {
    this.xAxis = this.plotGroup.append("g")
      .call(axisBottom(this.xScale))
      .attr("transform", `translate(0,${this.height})`)

    this.yAxis = this.plotGroup.append("g")
      .call(axisLeft(this.yScale))
  }

  protected createScales() {
    this.yScale = scaleLinear()
      .range([this.height, 0])
      .domain([min(this.binHeights), max(this.binHeights)]);
    this.xScale = scaleLinear()
      .range([0, this.width])
      .domain([min(this.binEdges), max(this.binEdges)])
  }

  protected calculateRectangleXs(padding: number = 0.1) {
    this.binHeights.length
  }

  protected drawBars() {
    svg.selectAll("rect")
      .data(this.binHeights)
      .enter()
      .append("rect")
      .attr("x", 1)
      .attr("transform", function(d) { return "translate(" + x(d.x0) + "," + y(d.length) + ")"; }))
        .attr("height", function(d) { return height - y(d.length); })
      .style("fill", "#69b3a2")
  }





}
