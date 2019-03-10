import React from "react";
import { Consumer } from "../context";

export default class PlayPauseBtn extends React.Component {
  render() {
    return (
      <Consumer>
        {value => {
          const { dispatch } = value;
          const isRunning = Boolean(value.appData.timerInterval);
          return (
            <div>
              <button
                className="main-control"
                id="start_stop"
                onClick={() => dispatch({ type: "TOGGLE_TIMER" })}
              >
                <i className={`fas fa-${isRunning ? "pause" : "play"}`} />
              </button>
            </div>
          );
        }}
      </Consumer>
    );
  }
}
