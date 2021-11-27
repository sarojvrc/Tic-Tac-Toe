import "./App.css";
import { useState, useEffect } from "react";
import Square from "./Components/Square";
import { Patterns } from "./Patterns";
import Footer from "./Components/Footer";
import Header from "./Components/Header";

function App() {
  const [board, setBoard] = useState(["", "", "", "", "", "", "", "", ""]);
  const [player, setPlayer] = useState("O");
  const [result, setResult] = useState({winner:"none", state:"none"});

  useEffect(() => {
    checkWin();
    checkIfTie();
    // Lets change the user's value depending upon the previous state
    if (player == "X") {
      setPlayer("O");
    } else {
      setPlayer("X");
    }
  }, [board]);

  useEffect(() => {
    if (result.state != "none"){
      alert(`Game Finished!! Winning Player: ${result.winner}`);
      restartGame();
    }
    
  }, [result]);

  //function for Choose the square
  const chooseSquare = (square) => {
    //set board for the Player
    setBoard(
      board.map((val, idx) => {
        if (idx == square && val == "") {
          return player;
        }
        return val;
      })
    );

    
  };

  //function for winner check
  const checkWin = () => {
    Patterns.forEach((currPattern) => {
      const firstPlayer = board[currPattern[0]];

      if(firstPlayer == "") return;

      let foundWinningPattern = true;
      currPattern.forEach((idx) => {
        if (board[idx] != firstPlayer) {
          foundWinningPattern = false;
        }
      });

      if(foundWinningPattern){
      setResult({winner:player, state:"won"})
      }
    });
  };

  //function to check if it is a Tie Game
  const checkIfTie = () => {
    let filled = true;
    board.forEach((square) => {
      if(square == ""){
        filled = false
      }
    })

    if(filled == true){
      setResult({winner:"No One", state:"Tie"});
    }
  }

  //function to restart the Game
  const restartGame = () => {
    setBoard(["", "", "", "", "", "", "", "", ""]);
    setPlayer("O");
  }

  return (
    <div className="App">
      <Header />
      <div className="board">
        {/* 1st row */}
        <div className="row">
          <Square
            val={board[0]}
            chooseSquare={() => {
              chooseSquare(0);
            }}
          />
          <Square
            val={board[1]}
            chooseSquare={() => {
              chooseSquare(1);
            }}
          />
          <Square
            val={board[2]}
            chooseSquare={() => {
              chooseSquare(2);
            }}
          />
        </div>
        {/* 2nd row */}
        <div className="row">
          <Square
            val={board[3]}
            chooseSquare={() => {
              chooseSquare(3);
            }}
          />
          <Square
            val={board[4]}
            chooseSquare={() => {
              chooseSquare(4);
            }}
          />
          <Square
            val={board[5]}
            chooseSquare={() => {
              chooseSquare(5);
            }}
          />
        </div>
        {/* 3rd row */}
        <div className="row">
          <Square
            val={board[6]}
            chooseSquare={() => {
              chooseSquare(6);
            }}
          />
          <Square
            val={board[7]}
            chooseSquare={() => {
              chooseSquare(7);
            }}
          />
          <Square
            val={board[8]}
            chooseSquare={() => {
              chooseSquare(8);
            }}
          />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
