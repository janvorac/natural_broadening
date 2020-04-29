import {
  select,
  axisLeft,
  axisBottom
} from 'd3'

export default class PlotMaker {
  protected binHeights: Array<number>;
  protected margin: object;
  protected container: any;
  public plotGroup: any;
  protected width: number;
  protected height: number;

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
  }


}
