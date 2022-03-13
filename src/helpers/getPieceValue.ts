import {
  pawnWhite,
  rookWhite,
  bishopWhite,
  kingWhite,
  pawnBlack,
  rookBlack,
  bishopBlack,
  kingBlack,
  knight,
  queen,
} from './getPositionEvaluations'

type PieceType = 'p' | 'n' | 'b' | 'r' | 'q' | 'k'

export type Piece = {
  type: PieceType
  color: 'w' | 'b'
} | null

export const getPieceValue = (piece: Piece, x: number, y: number) => {
  if (!piece) return 0

  const isWhite = piece.color === 'w'
  const absoluteValue = getAbsoluteValue(piece, isWhite, x, y)
  if (absoluteValue) return piece.color === 'w' ? absoluteValue : -absoluteValue

  throw 'Error'
}

const getAbsoluteValue = (
  piece: Piece,
  isWhite: boolean,
  x: number,
  y: number,
) => {
  if (!piece) throw 'Unknown piece type: ' + piece

  switch (piece.type) {
    case 'p':
      return 10 + (isWhite ? pawnWhite[y][x] : pawnBlack[y][x])
    case 'r':
      return 50 + (isWhite ? rookWhite[y][x] : rookBlack[y][x])
    case 'n':
      return 30 + knight[y][x]
    case 'b':
      return 30 + (isWhite ? bishopWhite[y][x] : bishopBlack[y][x])
    case 'q':
      return 90 + queen[y][x]
    case 'k':
      return 900 + (isWhite ? kingWhite[y][x] : kingBlack[y][x])
    default:
      throw 'Error: ' + piece.type
  }
}

export default getPieceValue
