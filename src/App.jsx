import { useRef, useState } from "react";
import "./App.scss";
import "./Star.scss";
import { useEffect } from "react";
import { Tardis } from "./components/Tardis";
import music from "./assets/doctorWho.mp3";

function App() {
  const audioRef = useRef(null);
  const secondRef = useRef(null);
  const minuteRef = useRef(null);
  const [minute, setMinute] = useState("00");
  const [second, setSecond] = useState("00");
  const [start, setStart] = useState(false);

  function handleStart(e) {
    e.preventDefault();
    setStart(true);
  }

  function handleStop(e) {
    e.preventDefault();
    setStart(false);
  }

  useEffect(() => {
    let intervalID = setInterval(() => {
      audioRef.current?.play();
      onUpdate();
    }, 1000);

    if (!start) {
      audioRef.current?.pause();
      clearInterval(intervalID);
    }
    return () => clearInterval(intervalID);
  }, [start, minute, second]);

  function onUpdate() {
    if (second > 0) {
      setSecond(second - 1);
    } else if (minute > 0) {
      setMinute(minute - 1);
      setSecond(59);
    } else {
      setStart(false);
      audioRef.current.currentTime = 0;
    }
  }

  function formatTime(value) {
    return String(value).padStart(2, "0");
  }

  function handleFocus(valueRef) {
    if (valueRef.current) {
      valueRef.current.select();
    }
  }

  return (
    <>
      <section className="section">
        <div className="stars"></div>
        <div className="stars2"></div>
        <div className="timer">
          <form className="form">
            <div className="form-content">
              <fieldset className="fieldset-minute">
                <label htmlFor="minute">minutos</label>
                <input
                  className="minute"
                  itemID="minute"
                  value={formatTime(minute)}
                  onChange={(e) => {
                    const value = parseInt(e.target.value, 10);
                    if (value >= 0 && value <= 59) {
                      setMinute(value);
                    }
                  }}
                  onFocus={() => handleFocus(minuteRef)}
                  ref={minuteRef}
                  type="text"
                  min={0}
                  max={59}
                  name="minute"
                  id="minute"
                />
              </fieldset>

              <p className="detail">:</p>

              <fieldset className="fieldset-second">
                <label htmlFor="second">segundos</label>

                <input
                  className="second"
                  itemID="second"
                  value={formatTime(second)}
                  onChange={(e) => {
                    const value = parseInt(e.target.value, 10);
                    if (value >= 0 && value <= 59) {
                      setSecond(value);
                    }
                  }}
                  onFocus={() => handleFocus(secondRef)}
                  ref={secondRef}
                  type="text"
                  min={0}
                  max={59}
                  name="second"
                  id="second"
                />
              </fieldset>
            </div>
            <div className="buttons">
              <button
                disabled={minute == 0 && second == 0 ? !start : start}
                className="btn-start material-symbols-outlined"
                onClick={(e) => handleStart(e)}
              >
                play_arrow
              </button>
              <button
                disabled={!start}
                className="btn-pause material-symbols-outlined"
                onClick={(e) => handleStop(e)}
              >
                pause
              </button>
            </div>
          </form>
          <Tardis start={start} />
          <audio ref={audioRef} loop>
            <source src={music} type="audio/mp3" />
            <source src={music} type="audio/ogg" />
          </audio>
        </div>
      </section>
    </>
  );
}

export default App;
