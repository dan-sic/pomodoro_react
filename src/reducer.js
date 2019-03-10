export default (state, action) => {
  const { timer, sessionLength, sessionTime, breakLength } = state.appData;

  switch (action.type) {
    case "TIMER_DECREMENT":
      let decrementedLength = state.appData[action.payload] - 60;
      let decrementedTimerValue;

      if (action.payload === "sessionLength" && sessionTime === true) {
        // change the timer if Session length was changed while active Session time
        decrementedTimerValue = timer - 60;
      } else if (action.payload === "breakLength" && sessionTime === false) {
        // otherwise change the timer if Break length was changed while there was break time
        decrementedTimerValue = timer - 60;
      } else {
        // otherwise (if break length changed during session time or session length changed during break time) do not change the timer
        decrementedTimerValue = timer;
      }

      return {
        ...state,
        appData: {
          ...state.appData,
          [action.payload]: decrementedLength,
          timer: decrementedTimerValue
        }
      };
    case "TIMER_INCREMENT":
      let incrementedLength = state.appData[action.payload] + 60;
      let incrementedTimerValue;

      if (action.payload === "sessionLength" && sessionTime === true) {
        // change the timer if Session length was changed while active Session time
        incrementedTimerValue = timer + 60;
      } else if (action.payload === "breakLength" && sessionTime === false) {
        // otherwise change the timer if Break length was changed while there was break time
        incrementedTimerValue = timer + 60;
      } else {
        // otherwise (if break length changed during session time or session length changed during break time) do not change the timer
        incrementedTimerValue = timer;
      }

      return {
        ...state,
        appData: {
          ...state.appData,
          [action.payload]: incrementedLength,
          timer: incrementedTimerValue
        }
      };
    case "TOGGLE_TIMER":
      const activeInterval = state.appData.timerInterval;

      if (activeInterval) {
        clearInterval(activeInterval);
      }

      const timerInterval = activeInterval
        ? null
        : setInterval(() => {
            state.dispatch({ type: "DECREMENT_TIMER" });
          }, 1000);

      return {
        ...state,
        appData: {
          ...state.appData,
          timerInterval
        }
      };
    case "DECREMENT_TIMER":
      const newTime = timer - 1;

      return {
        ...state,
        appData: {
          ...state.appData,
          timer: newTime
        }
      };
    case "CHANGE_TIMERS":
      const newTimer = sessionTime ? breakLength : sessionLength;

      return {
        ...state,
        appData: {
          ...state.appData,
          timer: newTimer,
          sessionTime: !sessionTime
        }
      };
    case "RESTART_APP":
      return {
        ...state,
        appData: {
          ...state.appData,
          breakLength: 300,
          sessionLength: 1500,
          timerInterval: null,
          timer: 1500,
          sessionTime: true
        }
      };

    default:
      return state;
  }
};
