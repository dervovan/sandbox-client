import { useEffect, useState } from "react";
import styles from "./index.module.scss";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import TabContent, { allyProps } from "../../components/uikit/tabs/tabContent";
import { ButtonGroup, Paper, Button, Typography } from "@mui/material";
import { generateRandomData } from "./utility";
import SortingContainer from "./sortingArea/container";
import Column from "./sortingArea/column";
import { mergeSort } from "./algorithm/merge";
import Orientation from "./sortingArea/orientation";
import { AnimationData, SortingElement } from "./types";
import { replaceItem } from "../../utility/array";

const Sorting = () => {
  const [activeTab, setTab] = useState(0);
  const [data, setData] = useState(() => generateRandomData());
  const [currentOrientation, setOrientation] = useState(1);
  const [lastSorted, setLastSorted] = useState<SortingElement[]>([]);
  const [inProgress, setInProgress] = useState(false);
  const [timeouts, setTimeouts] = useState<ReturnType<typeof setTimeout>[]>([]);
  const [animations, setAnimations] = useState<AnimationData[]>([]);

  // console.log(
  //   "-----data-------",
  //   data.map((i) => i.value)
  // );

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
    timeouts.forEach((i) => clearTimeout(i));
    setTimeouts([]);
    setInProgress(false);
  };

  const handleSort = () => {
    setInProgress(true);
    // setLastSorted(mergeSort(data, animations));
    setData(mergeSort(data, animations));
    // setAnimations([...animations]);
  };

  const handleFinish = () => {
    setAnimations([]);
    setTimeouts([]);
    setInProgress(false);
    setData(lastSorted)
  };

  const handleStop = () => {
    // setAnimations([]);
    timeouts.forEach((i) => clearTimeout(i));
    setTimeouts([]);
    setInProgress(false);
  };

  useEffect(() => {
    if (animations.length) {
      console.log("animations", animations);
      const timeouts: ReturnType<typeof setTimeout>[] = [];

      for (let i = 0; i <= animations.length; i++) {
        const time: ReturnType<typeof setTimeout> = setTimeout(() => {
          setData((prevData) => {
            let newData = prevData.map((i) => ({ ...i, isComparing: false }));
            if (animations[i]) {
              const leftIndex = newData
                .map((i) => i.index)
                .indexOf(animations[i].left!.index);
              const rightIndex = newData
                .map((i) => i.index)
                .indexOf(animations[i].right!.index);
              const left = newData[leftIndex];
              const right = newData[rightIndex];
              left.isComparing = true;
              right.isComparing = true;
              newData[leftIndex] = right
              newData[rightIndex] = left
            } else {
              handleFinish();
            }
            return [...newData];
          });
        }, i * 10);
        timeouts.push(time);
      }
      setTimeouts(timeouts);
    }
  }, [animations]);

  return (
    <Paper className={styles.container}>
      <Typography paddingBottom={2} variant="h6" component="div">
        Визуализация алгоритмов сортировки
      </Typography>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={activeTab} onChange={handleAlgorithmChange}>
          {tabs.map((tab, i) => (
            <Tab
              key={i}
              sx={{ flexGrow: 1 }}
              label={tab.label}
              {...allyProps(i)}
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
      <Box sx={{ paddingTop: 2, borderTop: 1, borderColor: "divider" }}>
        <ButtonGroup>
          <Button
            variant="contained"
            onClick={handleSort}
            disabled={inProgress}
          >
            Запустить
          </Button>
          <Button variant="outlined" onClick={handleStop} disabled={false}>
            Стоп
          </Button>
          <Button variant="outlined" onClick={handleReset} disabled={false}>
            Сбросить
          </Button>
        </ButtonGroup>
      </Box>
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
