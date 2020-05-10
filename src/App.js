import React from "react";
import { useSelector } from "react-redux";
import Login from "./components/login";
import Game from "./components/game";
import ModeSelector from "./components/ModeSelector";
import WaitingRoom from "./components/waitingRoom";
import LevelSelector from "./components/LevelSelector";
import OnlineOptions from "./components/onlineOptions";
import style from "./commonStyle.module.css";
import UserMsg from "./components/userMsg/userMsg";

function App() {
  const { route } = useSelector((state) => state.RouterReducer);

  return (
    <div className={style.body}>
      <main className={style.main}>
        {route === "level" && <LevelSelector />}
        {route === "game" && <Game />}
        {route === "login" && <Login />}
        {route === "waitingroom" && <WaitingRoom />}
        {route === "onlineoptions" && <OnlineOptions />}
        {route === "home" && <ModeSelector />}
        {route === "msg" && <UserMsg />}
      </main>
    </div>
  );
}

export default App;
