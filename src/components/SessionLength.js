import React from "react";
import { Consumer, Context } from "../context";

export default class SessionLength extends React.Component {
  static contextType = Context;

  handleOnSessionIncrement(dispatch) {
    const { sessionLength, timerInterval, timer } = this.context.appData;

    // prevent changing timer if it is active and setting it above 60
    if (sessionLength < 3600 && timer < 3600 && timerInterval === null) {
      dispatch({ type: "TIMER_INCREMENT", payload: "sessionLength" });
    }
  }

  handleOnSessionDecrement(dispatch) {
    const { sessionLength, timerInterval, timer } = this.context.appData;

    // prevent changing timer if it is active and setting it below 1
    if (sessionLength > 60 && timer > 60 && timerInterval === null) {
      dispatch({ type: "TIMER_DECREMENT", payload: "sessionLength" });
    }
  }

  render() {
    return (
      <Consumer>
        {value => {
          const { dispatch } = value;
          return (
            <div>
              <div className="controls__session">
                <label id="session-label">Session Length</label>
                <div className="controls__session-elements">
                  <i
                    className="fas fa-chevron-down"
                    id="session-decrement"
                    onClick={() => this.handleOnSessionDecrement(dispatch)}
                  />

                  <span id="session-length">
                    {Math.floor(value.appData.sessionLength / 60)}
                  </span>

                  <i
                    className="fas fa-chevron-up"
                    id="session-increment"
                    onClick={() => this.handleOnSessionIncrement(dispatch)}
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
