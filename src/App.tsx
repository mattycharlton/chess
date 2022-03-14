import { useState } from 'react'
import { Container } from './App.styled'
import { Chess, ChessInstance, Square } from 'chess.js'
import { Chessboard } from 'react-chessboard'
import getComputerMove from './helpers/getComputerMove'
import ColorSelectionModel from './components/ColorSelectionModal'

const WHITE = 'white'
const BLACK = 'black'

const App: React.FC = () => {
  const [game, setGame] = useState<ChessInstance>(new Chess())
  const [selectedColor, setSelectedColor] = useState<
    typeof WHITE | typeof BLACK | undefined
  >()

  const safeGameMutate = (modify: Function) => {
    setGame((g) => {
      const update = { ...g }
      modify(update)
      return update
    })
  }

  const makeComputerMove = () => {
    if (game.game_over() || game.in_draw() || game.in_checkmate()) {
      alert('Game Over')
      console.log('Game Over')
      return null
    }
    safeGameMutate((game: ChessInstance) => {
      const bestMove = getComputerMove(game, 3, true, selectedColor === WHITE)
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
    setTimeout(makeComputerMove, 200)
    return true
  }

  return (
    <Container>
      <ColorSelectionModel
        selectedColor={selectedColor}
        onBlack={() => {
          setSelectedColor(BLACK)
          setTimeout(makeComputerMove, 200)
        }}
        onWhite={() => setSelectedColor(WHITE)}
      />
      <Chessboard
        boardOrientation={selectedColor}
        position={game.fen()}
        onPieceDrop={onPieceDrop}
        boardWidth={
          window.innerWidth < window.innerHeight
            ? window.innerWidth - 25
            : window.innerHeight - 25
        }
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
