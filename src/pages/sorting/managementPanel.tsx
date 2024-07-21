import { ButtonGroup, Button, Slider, Box, TextField } from "@mui/material";
import { SyntheticEvent, useState } from "react";
import PauseCircleOutlinedIcon from "@mui/icons-material/PauseCircleOutlined";
import NotStartedOutlinedIcon from "@mui/icons-material/NotStartedOutlined";
import PlayCircleOutlineOutlinedIcon from "@mui/icons-material/PlayCircleOutlineOutlined";
import RotateLeftOutlinedIcon from "@mui/icons-material/RotateLeftOutlined";
import CheckBox from "@mui/material/Checkbox";

type Props = {
  onSpeedChangeCommit: () => void;
  onSpeedChange: (
    event: Event | SyntheticEvent<Element, Event>,
    newValue: number | number[]
  ) => void;
  speed: number;
  handleSort: () => void;
  currentAnimation: number;
  handleResume: () => void;
  handleStop: () => void;
  handleReset: () => void;
  inProgress: boolean;
  timespan: string | number;
};

const ManagementPanel: React.FC<Props> = ({
  onSpeedChangeCommit,
  onSpeedChange,
  speed,
  handleSort,
  currentAnimation,
  handleResume,
  handleStop,
  handleReset,
  inProgress,
  timespan,
}) => {
  const [checked, setChecked] = useState(true);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  return (
    <>
      <Box
        sx={{
          paddingTop: 3,
          paddingBottom: 1,
          borderTop: 1,
          borderColor: "divider",
          display: "grid",
          alignItems: "center",
          gridAutoFlow: "column",
          gridTemplateColumns: "min-content min-content auto",
          gap: 5,
        }}
      >
        <ButtonGroup>
          <Button
            variant="contained"
            onClick={handleSort}
            disabled={currentAnimation !== 0 || inProgress}
            sx={{ paddingLeft: 4, paddingRight: 4 }}
          >
            <PlayCircleOutlineOutlinedIcon />
          </Button>
          <ResumeButton
            handleResume={handleResume}
            handleStop={handleStop}
            inProgress={inProgress}
            currenAnimation={currentAnimation}
          />
          <Button
            variant="outlined"
            onClick={handleReset}
            sx={{ paddingLeft: 4, paddingRight: 4 }}
          >
            <RotateLeftOutlinedIcon />
          </Button>
        </ButtonGroup>
        <Box
          sx={{
            display: "grid",
            alignItems: "center",
            gridAutoFlow: "column",
            gridTemplateColumns: "min-content min-content",
            gap: 1,
          }}
        >
          <CheckBox onChange={handleChange} checked={checked} />
          <TextField
            label="Время сортировки"
            value={checked ? `${timespan} ms` : ""}
            sx={{ width: "150px" }}
            disabled={!checked}
            InputProps={{
              readOnly: true,
            }}
          />
        </Box>
        <Box
          sx={{
            paddingLeft: 3,
            paddingRight: 3,
          }}
        >
          {/* <Typography variant="h6">Интервал между сравнениями</Typography> */}
          <Slider
            onChangeCommitted={onSpeedChangeCommit}
            onChange={onSpeedChange}
            aria-label="speed"
            defaultValue={speed}
            value={speed}
            valueLabelDisplay="off"
            shiftStep={30}
            step={10}
            marks
            min={10}
            max={200}
          />
        </Box>
      </Box>
    </>
  );
};
type ResumeProps = {
  inProgress: boolean;
  currenAnimation: number;
  handleResume: () => void;
  handleStop: () => void;
};

const ResumeButton: React.FC<ResumeProps> = ({
  inProgress,
  currenAnimation,
  handleResume,
  handleStop,
}) => {
  return (
    <>
      {inProgress || currenAnimation === 0 ? (
        <Button
          variant="outlined"
          onClick={handleStop}
          disabled={currenAnimation === 0}
          sx={{ paddingLeft: 4, paddingRight: 4 }}
        >
          <PauseCircleOutlinedIcon />
        </Button>
      ) : (
        <Button
          variant="outlined"
          onClick={handleResume}
          sx={{ paddingLeft: 4, paddingRight: 4 }}
        >
          <NotStartedOutlinedIcon />
        </Button>
      )}
    </>
  );
};

export default ManagementPanel;
