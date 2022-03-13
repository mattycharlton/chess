import { ChessInstance } from 'chess.js'
import getPieceValue, { Piece } from './getPieceValue'

export const getAIMove = (
  game: ChessInstance,
  depth: number,
  isMaximisingPlayer: boolean,
) => {
  const possibleGameMoves = game.moves()
  let bestMove = -9999
  let bestMoveFound

  possibleGameMoves.forEach((newMove) => {
    game.move(newMove)
    const value = miniMax(depth - 1, game, -10000, 10000, !isMaximisingPlayer)
    game.undo()
    if (value >= bestMove) {
      bestMove = value
      bestMoveFound = newMove
    }
  })

  if (!bestMoveFound) throw 'Error no move found'
  return bestMoveFound
}

const miniMax = (
  depth: number,
  game: ChessInstance,
  alpha: number,
  beta: number,
  isMaximisingPlayer: boolean,
) => {
  if (depth === 0) return -evaluateBoard(game.board())

  const possibleGameMoves = game.moves()

  // To show possible moves for player
  if (isMaximisingPlayer) {
    let bestMove = -9999

    possibleGameMoves.forEach((newMove) => {
      game.move(newMove)
      bestMove = Math.max(
        bestMove,
        miniMax(depth - 1, game, alpha, beta, !isMaximisingPlayer),
      )
      game.undo()
      alpha = Math.max(alpha, bestMove)
      if (beta <= alpha) return bestMove
    })

    return bestMove
  } else {
    let bestMove = 9999

    possibleGameMoves.forEach((newMove) => {
      game.move(newMove)
      bestMove = Math.min(
        bestMove,
        miniMax(depth - 1, game, alpha, beta, !isMaximisingPlayer),
      )
      game.undo()
      beta = Math.min(beta, bestMove)
      if (beta <= alpha) return bestMove
    })

    return bestMove
  }
}

const evaluateBoard = (board: Array<Array<Piece>>) => {
  let total = 0

  board.forEach((pieces, i) => {
    pieces.forEach((piece, j) => {
      total = total + getPieceValue(board[i][j], i, j)
    })
  })

  return total
}

export default getAIMove
