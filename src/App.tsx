import React, { useState } from "react";

const rowStyle = {
  display: "flex"
};

const squareStyle = {
  width: "60px",
  height: "60px",
  backgroundColor: "#ddd",
  margin: "4px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontSize: "20px",
  color: "white"
};

const boardStyle = {
  backgroundColor: "#eee",
  width: "208px",
  alignItems: "center",
  justifyContent: "center",
  display: "flex",
  flexDirection: "column" as "column",
  border: "3px #eee solid"
};

const containerStyle = {
  display: "flex",
  alignItems: "center",
  flexDirection: "column" as "column"
};

const instructionsStyle = {
  marginTop: "5px",
  marginBottom: "5px",
  fontWeight: "bold" as "bold",
  fontSize: "16px"
};

const buttonStyle = {
  marginTop: "15px",
  marginBottom: "16px",
  width: "80px",
  height: "40px",
  backgroundColor: "#8acaca",
  color: "white",
  fontSize: "16px"
};

function Square({
  squareState,
  handleSquareClick,
  rowIndex,
  squareIndex
}: {
  squareState: string;
  handleSquareClick: (rowIndex: number, squareIndex: number) => void;
  rowIndex: number;
  squareIndex: number;
}) {
  return (
    <div
      className="square"
      onClick={() => handleSquareClick(rowIndex, squareIndex)}
      style={squareStyle}
    >
      {squareState}
    </div>
  );
}

function Board() {
  const [nextPlayer, setNextPlayer] = useState("X");

  const [winner, setWinner] = useState("");

  const [boardState, setBoardState] = useState([
    ["", "", ""],
    ["", "", ""],
    ["", "", ""]
  ]);

  React.useEffect(() => {
    //horizontal win check
    for (let i = 0; i < boardState.length; i++) {
      if (boardState[i].every((square) => square === "X")) {
        setWinner((s) => "X");
      }
      if (boardState[i].every((square) => square === "O")) {
        setWinner("O");
      }
    }

    //vertical win check
    for (let i = 0; i < boardState.length; i++) {
      if (
        boardState[0][i] === "X" &&
        boardState[1][i] === "X" &&
        boardState[2][i] === "X"
      ) {
        setWinner("X");
      }
      if (
        boardState[0][i] === "O" &&
        boardState[1][i] === "O" &&
        boardState[2][i] === "O"
      ) {
        setWinner("O");
      }
    }

    //diagonal win check
    if (
      boardState[0][0] === "X" &&
      boardState[1][1] === "X" &&
      boardState[2][2] === "X"
    ) {
      setWinner("X");
    }
    if (
      boardState[0][0] === "O" &&
      boardState[1][1] === "O" &&
      boardState[2][2] === "O"
    ) {
      setWinner("O");
    }
    if (
      boardState[0][2] === "X" &&
      boardState[1][1] === "X" &&
      boardState[2][0] === "X"
    ) {
      setWinner("X");
    }
    if (
      boardState[0][2] === "O" &&
      boardState[1][1] === "O" &&
      boardState[2][0] === "O"
    ) {
      setWinner("O");
    }
  }, [...boardState[0], ...boardState[1], ...boardState[2]]);

  const handleSquareClick = (rowIndex: number, squareIndex: number) => {
    if (boardState[rowIndex][squareIndex] !== "") return;
    setBoardState((bs) => {
      bs[rowIndex][squareIndex] = nextPlayer;
      return bs;
    });

    if (nextPlayer === "X") {
      setNextPlayer("O");
    } else {
      setNextPlayer("X");
    }
  };

  const handleResetClick = () => {
    setBoardState([
      ["", "", ""],
      ["", "", ""],
      ["", "", ""]
    ]);
    setNextPlayer("X");
    setWinner("");
  };

  return (
    <div style={containerStyle} className="gameBoard">
      <div id="statusArea" className="status" style={instructionsStyle}>
        Next player: {nextPlayer}
      </div>
      <div id="winnerArea" className="winner" style={instructionsStyle}>
        Winner: <span>{winner}</span>
      </div>
      <button style={buttonStyle} onClick={handleResetClick}>
        Reset
      </button>
      <div style={boardStyle}>
        {boardState.map((_, rowIndex) => (
          <div key={rowIndex} className="board-row" style={rowStyle}>
            {boardState[rowIndex].map((_, squareIndex) => (
              <Square
                key={squareIndex}
                rowIndex={rowIndex}
                squareIndex={squareIndex}
                squareState={boardState[rowIndex][squareIndex]}
                handleSquareClick={handleSquareClick}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function Game() {
  return (
    <div className="game">
      <div className="game-board">
        <Board />
      </div>
    </div>
  );
}

export default function App() {
  return <Game />;
}
