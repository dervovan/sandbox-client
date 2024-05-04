import { SyntheticEvent, useState } from "react";
import styles from "./index.module.scss";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import TabContent, { a11yProps } from "../../components/uikit/tabs/tabContent";
import { Paper, Typography } from "@mui/material";
import { generateRandomData } from "./utility";
import SortingContainer from "./sortingArea/container";
import { mergeSortAlgorithm } from "./algorithm/merge";
import Orientation from "./sortingArea/orientation";
import { AnimationData } from "./types";
import ManagementPanel from "./managementPanel";

const Sorting = () => {
  const [activeTab, setTab] = useState(0);
  const [data, setData] = useState(() => generateRandomData());
  const [currentOrientation, setOrientation] = useState(1);
  const [speed, setSpeed] = useState(10);
  const [currentAnimation, setCurrentAnimation] = useState(0);
  const [inProgress, setInProgress] = useState(false);
  const [timeouts, setTimeouts] = useState<ReturnType<typeof setTimeout>[]>([]);
  const [animations, setAnimations] = useState<AnimationData[]>([]);

  const handleAlgorithmChange = (
    event: React.SyntheticEvent,
    newValue: number
  ) => {
    setTab(newValue);
    handleReset();
  };

  const handleOrientationChange = (
    event: React.SyntheticEvent,
    newValue: number
  ) => {
    setOrientation(newValue);
  };

  const handleReset = () => {
    setData(generateRandomData());
    setAnimations([]);
    setCurrentAnimation(0);
    timeouts.forEach((i) => clearTimeout(i));
    setTimeouts([]);
    setInProgress(false);
  };

  const handleSort = () => {
    setInProgress(true);
    const animations: AnimationData[] = [];
    mergeSortAlgorithm(data.slice(), animations);
    setAnimations(animations);
    runAnimations(animations);
  };

  const handleFinish = () => {
    setCurrentAnimation(0);
    setAnimations([]);
    setTimeouts([]);
    setInProgress(false);
  };

  const handleStop = () => {
    timeouts.forEach((i) => clearTimeout(i));
    setTimeouts([]);
    setInProgress(false);
    // setAnimations(animations.slice(currentAnimation));
  };

  const handleResume = () => {
    runAnimations(animations.slice(currentAnimation));
    setInProgress(true);
  };

  const onSpeedChangeCommit = () => {
    timeouts.forEach((i) => clearTimeout(i));
    const leftAnimations = animations.slice(currentAnimation);
    setAnimations(leftAnimations);
    inProgress && runAnimations(leftAnimations);
  };

  const onSpeedChange = (
    event: Event | SyntheticEvent<Element, Event>,
    newValue: number | number[]
  ): void => {
    setSpeed(newValue as number);
  };

  const runAnimations = (animations: AnimationData[]) => {
    if (animations.length) {
      const timeouts: ReturnType<typeof setTimeout>[] = [];

      for (let i = 0; i <= animations.length; i++) {
        const time: ReturnType<typeof setTimeout> = setTimeout(() => {
          setCurrentAnimation(i);
          setData((prevData) => {
            let newData = prevData.map((i) => ({ ...i, isComparing: false }));
            if (animations[i]) {
              newData[animations[i].index].value = animations[i].value;
              newData[animations[i].firstCompare].isComparing = true;
              newData[animations[i].secondCompare].isComparing = true;
            } else {
              handleFinish();
            }
            return newData;
          });
        }, i * speed);
        timeouts.push(time);
      }
      setTimeouts(timeouts);
    }
  };

  return (
    <Paper className={styles.container}>
      <Typography paddingBottom={1} paddingTop={1} variant="h6" component="div">
        Визуализация алгоритмов сортировки
      </Typography>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={activeTab} onChange={handleAlgorithmChange}>
          {tabs.map((tab, i) => (
            <Tab
              key={i}
              sx={{ flexGrow: 1 }}
              label={tab.label}
              {...a11yProps(i)}
            />
          ))}
        </Tabs>
      </Box>
      {tabs.map((tab, i) => (
        <TabContent key={i} value={activeTab} index={i}>
          <div className={styles.tabContent}>
            <Orientation
              setValue={handleOrientationChange}
              value={currentOrientation}
            />
            <SortingContainer data={data} orientation={currentOrientation} />
          </div>
        </TabContent>
      ))}
      <ManagementPanel
        onSpeedChangeCommit={onSpeedChangeCommit}
        onSpeedChange={onSpeedChange}
        speed={speed}
        handleSort={handleSort}
        currentAnimation={currentAnimation}
        handleResume={handleResume}
        handleStop={handleStop}
        handleReset={handleReset}
        inProgress={inProgress}
      />
    </Paper>
  );
};

export default Sorting;

const tabs = [
  { label: "Merge" },
  { label: "Insertion" },
  { label: "Selection" },
  { label: "Bubble" },
  { label: "Heap" },
  { label: "Quick" },
];