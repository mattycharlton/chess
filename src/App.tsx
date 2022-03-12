import { useState } from 'react'
import { Container } from './App.styled'
import { Chess, ChessInstance, Square } from 'chess.js'
import { Chessboard } from 'react-chessboard'

const App: React.FC = () => {
  const [game, setGame] = useState(new Chess())

  const safeGameMutate = (modify: Function) => {
    setGame((g) => {
      const update = { ...g }
      modify(update)
      return update
    })
  }

  const makeRandomMove = () => {
    const possibleMoves = game.moves()
    if (game.game_over() || game.in_draw() || possibleMoves.length === 0) return // exit if the game is over
    const randomIndex = Math.floor(Math.random() * possibleMoves.length)
    safeGameMutate((game: ChessInstance) => {
      game.move(possibleMoves[randomIndex])
    })
  }

  const onDrop = (sourceSquare: Square, targetSquare: Square) => {
    let move = null
    safeGameMutate((game: ChessInstance) => {
      move = game.move({
        from: sourceSquare,
        to: targetSquare,
        promotion: 'q', // always promote to a queen for example simplicity
      })
    })
    if (move === null) return false // illegal move
    setTimeout(makeRandomMove, 200)
    return true
  }

  return (
    <Container>
      <Chessboard
        position={game.fen()}
        onPieceDrop={onDrop}
        customLightSquareStyle={{ backgroundColor: '#dee4e7' }}
        customDarkSquareStyle={{ backgroundColor: '#4f849e' }}
      />
    </Container>
  )
}

export default App
