import React from "react";
import reducer from "./reducer";

export const Context = React.createContext();

export default class Provider extends React.Component {
  state = {
    appData: {
      breakLength: 300,
      sessionLength: 1500,
      timerInterval: null,
      timer: 1500,
      sessionTime: true
    },
    dispatch: action => this.setState(state => reducer(state, action))
  };

  render() {
    return (
      <Context.Provider value={this.state}>
        {this.props.children}
      </Context.Provider>
    );
  }
}

export const Consumer = Context.Consumer;
