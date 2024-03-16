import { Button, ButtonGroup, Stack, Typography } from "@mui/material";
import styles from "./management.module.scss";
import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";
import SaveIcon from "@mui/icons-material/Save";
import InputFileUpload from "../../uikit/file/fileUpload";
import { FigureType } from "../types";
import PlayCircleFilledWhiteOutlinedIcon from '@mui/icons-material/PlayCircleFilledWhiteOutlined';
import StopCircleOutlinedIcon from '@mui/icons-material/StopCircleOutlined';

type Props = {
  onGolToggle: () => void;
  isGolRunning: boolean;
  resetGol: () => void;
  damp: () => void;
  uploadFromFile: (data: string) => void;
  setFigure: (type: FigureType) => void;
};

const GolManagement = ({
  onGolToggle,
  isGolRunning,
  resetGol,
  damp,
  uploadFromFile,
  setFigure,
}: Props) => {
  return (
    <div className={styles.container}>
      <Typography paddingBottom={2} variant="body1" component="div">
        Зажав левую кнопку мыши можно рисовать на панели слева. Полученное
        художество можно затем обработать алгоритмом, запустив GOL. В любой
        момент можно остановить, где-то добавить, где-то стереть, запустить снова.
      </Typography>
      <Stack spacing={2}>
        <Button
          color={isGolRunning ? "primary" : "success"}
          variant="contained"
          onClick={onGolToggle}
          startIcon={isGolRunning ? <StopCircleOutlinedIcon/> : <PlayCircleFilledWhiteOutlinedIcon/>}
        >
          {isGolRunning ? "Остановить GOL" : "Запустить GOL"}
        </Button>
      </Stack>
      <Typography
        paddingBottom={2}
        paddingTop={2}
        variant="body1"
        component="div"
      >
        Или поместить предустановленную конфигурацию и понаблюдать за магией.
      </Typography>
      <Stack spacing={2}>
        <ButtonGroup fullWidth>
          <Button
            variant="outlined"
            onClick={() => setFigure(1)}
            disabled={isGolRunning}
          >
            copperhead
          </Button>
          <Button
            variant="outlined"
            onClick={() => setFigure(2)}
            disabled={isGolRunning}
          >
            glidergun
          </Button>
          <Button
            variant="outlined"
            onClick={() => setFigure(3)}
            disabled={isGolRunning}
          >
            snarkloop
          </Button>
          <Button
            variant="outlined"
            onClick={() => setFigure(4)}
            disabled={isGolRunning}
          >
            lines
          </Button>
        </ButtonGroup>
        <Typography variant="body1" component="div">
          Если очень понравился результат, можно сохранить на память. Чтобы
          потом была возможность опять на него полюбоваться.
        </Typography>
        <ButtonGroup fullWidth>
          <Button
            variant="contained"
            onClick={damp}
            disabled={isGolRunning}
            startIcon={<SaveIcon />}
          >
            сохранить
          </Button>
          <InputFileUpload disabled={isGolRunning} onUpload={uploadFromFile} />
          <Button
            variant="contained"
            onClick={resetGol}
            disabled={isGolRunning}
            startIcon={<CancelPresentationIcon />}
          >
            Сбросить
          </Button>
        </ButtonGroup>
      </Stack>
    </div>
  );
};

export default GolManagement;
