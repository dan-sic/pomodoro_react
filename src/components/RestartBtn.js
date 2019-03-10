import React from "react";
import { Consumer, Context } from "../context";

export default class RestartBtn extends React.Component {
  static contextType = Context;

  handleRestart(dispatch) {
    // check if timer is not running
    if (this.context.appData.timerInterval === null) {
      dispatch({ type: "RESTART_APP" });
    }
  }

  render() {
    return (
      <Consumer>
        {value => {
          const { dispatch } = value;
          return (
            <button
              className="main-control"
              id="reset"
              onClick={() => this.handleRestart(dispatch)}
            >
              <i className="fas fa-redo" />
            </button>
          );
        }}
      </Consumer>
    );
  }
}
