import React, { Component } from "react";
import "./App.css";
import Provider from "./context";

import BreakLength from "./components/BreakLength";
import SessionLength from "./components/SessionLength";
import PlayPauseBtn from "./components/PlayPauseBtn";
import Timer from "./components/Timer";
import RestartBtn from "./components/RestartBtn";
import soundfile from "./resources/beep.mp3";

export default class App extends Component {
  constructor(props) {
    super(props);

    this.sound = React.createRef();
  }

  playSound = () => {
    this.sound.current.play();
  };

  render() {
    return (
      <Provider>
        <div>
          <h1>Pomodoro Clock</h1>
          <div className="container">
            <div className="controls">
              <BreakLength />
              <SessionLength />
            </div>
            <Timer playSound={this.playSound} />
            <div className="main-controls">
              <PlayPauseBtn />
              <RestartBtn />
            </div>
          </div>
        </div>
        <audio src={soundfile} id="beep" ref={this.sound} />
      </Provider>
    );
  }
}
