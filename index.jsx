const { useState } = React;

const WINNER_COMBOS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]

export function Board() {

  const [turn, setTurn] = useState("X");
  const [board, setBoard] = useState(Array(9).fill(null));
  const [winner, setWinner] = useState("");
  const [draw, setDraw] = useState(false)

  const checkWinner = (newBoard) => {
    WINNER_COMBOS.forEach((combo) => {
      if (
        newBoard[combo[0]] &&
        newBoard[combo[0]] ===
        newBoard[combo[1]] &&
        newBoard[combo[1]] ===
        newBoard[combo[2]]
      ) {
        setWinner(newBoard[combo[0]])
        return
      }
    })

    if (!newBoard.includes(null)) {
      setDraw(true)
      return
    }

    turn === "O" ? setTurn("X") : setTurn("O")
  }

  const handleClick = (index) => {
    if (board[index] || winner) return
    const newBoard = [...board];
    newBoard[index] = turn;
    setBoard(newBoard);

    checkWinner(newBoard)
  }

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setTurn("X");
    setWinner("");
    setDraw(false)
  }

  return (
    <>
      <h1>Tic-Tac-Toe</h1>
      <p>
        {winner && !draw
          ? "Winner: " + winner
          : draw
          ? "It's a Draw!"
          : "Next Player: " + turn
        }
      </p>
      <div className="grid">
        {board.map((square, index) => (
          <button className="square"
            key={index}
            onClick={() => handleClick(index)}
          >
            {board[index]}
          </button>
        ))}
      </div>
      <button id="reset"
        onClick={() => resetGame()}
      >
        Reset Game
      </button>
    </>
  )
}
