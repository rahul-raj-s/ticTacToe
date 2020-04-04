import React, { useState } from "react";
import Login from "./components/login";
import BoxContainer from "./components/boxContainer";
import ModeSelector from "./components/ModeSelector";

function App() {
  const [players, setPlayers] = useState(null);
  const [gameSpec, setGameSpec] = useState({ mode: false, level: false });

  const handleLogin = newPlayer => {
    setPlayers(newPlayer);
  };

  return (
    <div className="App">
      {!gameSpec.mode && (
        <ModeSelector
          modeChanger={(id, l1) => setGameSpec({ mode: id, level: l1 })}
        />
      )}
      {players ? (
        <BoxContainer
          players={players}
          mode={gameSpec.mode}
          level={gameSpec.level}
        />
      ) : (
        gameSpec.mode && (
          <Login
            onLogin={newPlayer => handleLogin(newPlayer)}
            mode={gameSpec.mode}
          />
        )
      )}
    </div>
  );
}

export default App;
