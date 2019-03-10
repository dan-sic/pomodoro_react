import React, { Component } from "react";
import { Context } from "../context";

export default class CircleTimer extends Component {
  constructor(props) {
    super(props);

    const { radius, stroke } = this.props;

    this.normalizedRadius = radius - stroke * 2;
    this.circumference = this.normalizedRadius * 2 * Math.PI;
  }

  static contextType = Context;

  countCurrentPercent() {
    const {
      timer,
      sessionLength,
      breakLength,
      sessionTime
    } = this.context.appData;

    const length = sessionTime ? sessionLength : breakLength;
    return ((length - timer) / length) * 100;
  }

  render() {
    console.log(this.countCurrentPercent());
    const { radius, stroke } = this.props;

    const strokeDashoffset =
      this.circumference -
      (this.countCurrentPercent() / 100) * this.circumference;

    const { timer } = this.context.appData;

    return (
      <svg height={radius * 2} width={radius * 2} className="circleSVG">
        {timer === 0 ? null : (
          <>
            <circle
              stroke="rgba(255, 255, 255, 0.192)"
              fill="transparent"
              strokeWidth="1"
              r={this.normalizedRadius}
              cx={radius}
              cy={radius}
            />
            <circle
              stroke="white"
              fill="transparent"
              strokeWidth={stroke}
              strokeDasharray={this.circumference + " " + this.circumference}
              style={{ strokeDashoffset }}
              r={this.normalizedRadius}
              cx={radius}
              cy={radius}
            />
          </>
        )}
      </svg>
    );
  }
}
