import React, { Component } from "react";
import { Consumer, Context } from "../context";

import CircleTimer from "./CircleTimer";

export default class Timer extends Component {
  static contextType = Context;

  componentDidUpdate() {
    if (this.context.appData.timer === -1) {
      this.props.playSound();
      this.context.dispatch({ type: "CHANGE_TIMERS" });
    }
  }

  convertSecondsToTime(timer) {
    const minutes = Math.floor(timer / 60);
    const seconds = timer - minutes * 60;

    if (minutes < 10 && seconds < 10) {
      return `0${minutes}:0${seconds}`;
    } else if (minutes < 10) {
      return `0${minutes}:${seconds}`;
    } else if (seconds < 10) {
      return `${minutes}:0${seconds}`;
    } else {
      return `${minutes}:${seconds}`;
    }
  }

  render() {
    return (
      <Consumer>
        {value => {
          const { timer, sessionTime } = value.appData;
          return (
            <div>
              <div className="timer">
                <CircleTimer radius="140" stroke="6" />
                <div className="timer-body">
                  <label id="timer-label">
                    {sessionTime ? "Session" : "Break"}
                  </label>
                  <span id="time-left">{this.convertSecondsToTime(timer)}</span>
                </div>
              </div>
            </div>
          );
        }}
      </Consumer>
    );
  }
}
