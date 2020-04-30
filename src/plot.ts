import {
  select,
  axisLeft,
  axisBottom,
  Axis,
  ScaleLinear
} from 'd3'

export default class PlotMaker {
  protected binHeights: Array<number>;
  protected margin: object;
  protected container: any;
  public plotGroup: any;
  protected width: number;
  protected height: number;
  protected xAxis: Axis<number>;
  protected yAxis: Axis<number>;
  protected xScale: ScaleLinear<number, number>;
  protected yScale: ScaleLinear<number, number>;


  public constructor(
    binHeights: Array<number>,
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


}
