import { useState } from 'react'
import { Container } from './App.styled'
import { Chess, ChessInstance, Square } from 'chess.js'
import { Chessboard } from 'react-chessboard'
import getAIMove from './helpers/getAIMove'

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

  const makeAIMove = () => {
    if (game.game_over()) {
      console.log('GameOver')
      return null
    }
    safeGameMutate((game: ChessInstance) => {
      const bestMove = getAIMove(game, 1, true) // 1 is Depth
      game.move(bestMove)
    })
  }

  const onPieceDrop = (sourceSquare: Square, targetSquare: Square) => {
    let move = null
    safeGameMutate((game: ChessInstance) => {
      move = game.move({
        from: sourceSquare,
        to: targetSquare,
        promotion: 'q',
      })
    })
    if (move === null) return false
    setTimeout(makeAIMove, 200)
    return true
  }

  return (
    <Container>
      <Chessboard
        position={game.fen()}
        onPieceDrop={onPieceDrop}
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
