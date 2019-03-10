import React from "react";
import { Consumer, Context } from "../context";

export default class BreakLength extends React.Component {
  static contextType = Context;

  handleOnBreakIncrement(dispatch) {
    const { breakLength, timerInterval } = this.context.appData;

    // prevent changing timer if it is active and setting it above 60
    if (breakLength < 3600 && timerInterval === null) {
      dispatch({ type: "TIMER_INCREMENT", payload: "breakLength" });
    }
  }

  handleOnBreakDecrement(dispatch) {
    const { breakLength, timerInterval } = this.context.appData;

    // prevent changing timer if it is active and setting it below 1
    if (breakLength > 60 && timerInterval === null) {
      dispatch({ type: "TIMER_DECREMENT", payload: "breakLength" });
    }
  }

  render() {
    return (
      <Consumer>
        {value => {
          const { dispatch } = value;
          return (
            <div>
              <div className="controls__break">
                <label id="break-label">Break Length</label>
                <div className="controls__break-elements">
                  <i
                    className="fas fa-chevron-down"
                    id="break-decrement"
                    onClick={() => this.handleOnBreakDecrement(dispatch)}
                  />

                  <span id="break-length">
                    {Math.floor(value.appData.breakLength / 60)}
                  </span>

                  <i
                    className="fas fa-chevron-up"
                    id="break-increment"
                    onClick={() => this.handleOnBreakIncrement(dispatch)}
                  />
                </div>
              </div>
            </div>
          );
        }}
      </Consumer>
    );
  }
}
