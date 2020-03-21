import React, { useState } from "react";
import Login from "./components/login";
import BoxContainer from "./components/boxContainer";

function App() {
  const [players, setPlayers] = useState(null);

  const handleLogin = newPlayer => {
    setPlayers(newPlayer);
  };

  return (
    <div className="App">
      {players ? (
        <BoxContainer players={players} />
      ) : (
        <Login onLogin={newPlayer => handleLogin(newPlayer)} />
      )}
    </div>
  );
}

export default App;
