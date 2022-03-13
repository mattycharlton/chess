import { useState } from 'react'
import { Container } from './App.styled'
import { Chess, ChessInstance, Square } from 'chess.js'
import { Chessboard } from 'react-chessboard'

const App: React.FC = () => {
  const localStorage = window.localStorage
  const [game, setGame] = useState<ChessInstance>(
    new Chess(localStorage.getItem('activeChessGame') || undefined),
  )

  const safeGameMutate = (modify: Function) => {
    setGame((g) => {
      const update = { ...g }
      modify(update)
      localStorage.setItem('activeChessGame', game.fen())
      return update
    })
  }

  const makeRandomMove = () => {
    const possibleMoves = game.moves()
    if (game.game_over() || game.in_draw() || possibleMoves.length === 0) {
      localStorage.removeItem('activeChessGame')
      return
    }

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
        boardWidth={1000}
        customBoardStyle={{
          borderRadius: '4px',
          boxShadow: 'rgb(0 0 0 / 50%) 0px 5px 15px',
        }}
        customLightSquareStyle={{ backgroundColor: '#dee4e7' }}
        customDarkSquareStyle={{ backgroundColor: '#4f849e' }}
      />
    </Container>
  )
}

export default App
