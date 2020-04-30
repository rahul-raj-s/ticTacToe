import React, { useState } from "react";
import Login from "./components/login";
import Game from "./components/game";
import ModeSelector from "./components/ModeSelector";
import firebase from "./firebase";
import WaitingRoom from "./components/waitingRoom";
import LevelSelector from "./components/LevelSelector";
import OnlineOptions from "./components/onlineOptions";
import style from "./commonStyle.module.css";
import { useSelector, useDispatch } from "react-redux";
function App() {
  const { route } = useSelector((state) => state.RouterReducer);
  const dispatch = useDispatch();

  // const handleLogin = (newPlayer) => {
  //   firebase
  //     .firestore()
  //     .collection("gameStore")
  //     .add({
  //       player1: newPlayer.player1,
  //       player2: newPlayer.player2,
  //     })
  //     .then((doc) => {
  //       setGameSpec((prevState) => ({ ...prevState, gameId: doc.id }));
  //       setPlayers(newPlayer);
  //     });
  // };
  // useEffect(() => {
  //   let dataVar = [];
  //   firebase
  //     .firestore()
  //     .collection("gameStore")
  //     .onSnapshot((snapshot) => {
  //       for (let i = 0; i < snapshot.docs.length; i++) {
  //         dataVar.push(snapshot.docs[i].data());
  //       }
  //       setData(dataVar);
  //     });
  // }, []);

  return (
    <div className={style.body}>
      <main className={style.main}>
        {route === "level" && <LevelSelector />}
        {route === "game" && <Game />}
        {route === "login" && <Login />}
        {route === "waitingroom" && <WaitingRoom />}
        {route === "onlineoptions" && <OnlineOptions />}
        {route === "home" && <ModeSelector />}
      </main>
      <footer className={style.footer}>
        <h3>Tic Tac Toe</h3>
      </footer>
    </div>
  );
}

export default App;
