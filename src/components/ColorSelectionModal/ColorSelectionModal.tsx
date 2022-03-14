import Modal from '@mui/material/Modal'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import { MouseEventHandler } from 'react'
import { Wrapper, Img } from './ColorSelectionModel.styled'
import PawnBlackSvg from '../../images/pawn-b.svg'
import PawnWhiteSvg from '../../images/pawn-w.svg'

interface Props {
  selectedColor: string | undefined
  onWhite: MouseEventHandler<HTMLButtonElement>
  onBlack: MouseEventHandler<HTMLButtonElement>
}

const ColorSelectionModel = ({ selectedColor, onWhite, onBlack }: Props) => {
  return (
    <Modal open={selectedColor === undefined}>
      <Box
        sx={{
          position: 'absolute' as 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          height: 400,
          bgcolor: 'background.paper',
          boxShadow: 24,
          pt: 2,
          px: 4,
          pb: 3,
        }}
      >
        Choose colour
        <Wrapper>
          <Button onClick={onWhite}>
            <Img src={PawnWhiteSvg} />
          </Button>
          <Button onClick={onBlack}>
            <Img src={PawnBlackSvg} />
          </Button>
        </Wrapper>
      </Box>
    </Modal>
  )
}

export default ColorSelectionModel
