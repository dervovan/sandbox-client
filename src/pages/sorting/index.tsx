import { SyntheticEvent, useRef, useState } from "react";
import styles from "./index.module.scss";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import TabContent, { a11yProps } from "../../components/uikit/tabs/tabContent";
import { Paper, Typography } from "@mui/material";
import { generateRandomData } from "./utility";
import SortingContainer from "./sortingArea/container";
import { mergeSortAlgorithm, mergeSortAnimations } from "./algorithm/merge";
import Orientation from "./sortingArea/orientation";
import { AnimationData } from "./types";
import ManagementPanel from "./managementPanel";
import { quickSortAlgorithm, quickSortAnimations } from "./algorithm/quick";

const Sorting = () => {
  const [activeTab, setTab] = useState(0);
  const [data, setData] = useState(() => generateRandomData());
  const [currentOrientation, setOrientation] = useState(1);
  const [speed, setSpeed] = useState(10);
  const [currentAnimation, setCurrentAnimation] = useState(0);
  const [inProgress, setInProgress] = useState(false);
  const [timespan, setTimespan] = useState(0);
  const [timeouts, setTimeouts] = useState<ReturnType<typeof setTimeout>[]>([]);
  const [animations, setAnimations] = useState<AnimationData[]>([]);
  const sortTimer = useRef<ReturnType<typeof setTimeout>>();

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
    clearInterval(sortTimer.current);
    setTimespan(0);
  };

  const handleSort = () => {
    const sortStart = new Date();
    setInProgress(true);
    const timer = setInterval(() => {
      setTimespan(new Date().valueOf() - sortStart.valueOf());
    }, 177);
    sortTimer.current = timer;
    const animations: AnimationData[] = [];
    tabs[activeTab].sortAlgorithm(data.slice(), animations);
    setAnimations(animations);
    tabs[activeTab].runAnimations(
      animations,
      setCurrentAnimation,
      setData,
      handleFinish,
      setTimeouts,
      speed
    );
  };

  const handleFinish = () => {
    setCurrentAnimation(0);
    setAnimations([]);
    setTimeouts([]);
    setInProgress(false);
    clearInterval(sortTimer.current);
  };

  const handleStop = () => {
    timeouts.forEach((i) => clearTimeout(i));
    setTimeouts([]);
    setInProgress(false);
  };

  const handleResume = () => {
    tabs[activeTab].runAnimations(
      animations.slice(currentAnimation),
      setCurrentAnimation,
      setData,
      handleFinish,
      setTimeouts,
      speed
    );

    setInProgress(true);
  };

  const onSpeedChangeCommit = () => {
    timeouts.forEach((i) => clearTimeout(i));
    const leftAnimations = animations.slice(currentAnimation);
    setAnimations(leftAnimations);
    inProgress &&
      tabs[activeTab].runAnimations(
        leftAnimations,
        setCurrentAnimation,
        setData,
        handleFinish,
        setTimeouts,
        speed
      );
  };

  const onSpeedChange = (
    event: Event | SyntheticEvent<Element, Event>,
    newValue: number | number[]
  ): void => {
    setSpeed(newValue as number);
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
        timespan={timespan}
      />
    </Paper>
  );
};

export default Sorting;

const tabs = [
  {
    label: "Quick",
    sortAlgorithm: quickSortAlgorithm,
    runAnimations: quickSortAnimations,
  },
  {
    label: "Merge",
    sortAlgorithm: mergeSortAlgorithm,
    runAnimations: mergeSortAnimations,
  },
];
