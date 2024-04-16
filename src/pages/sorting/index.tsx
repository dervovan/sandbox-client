import { useState } from "react";
import styles from "./index.module.scss";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import TabContent, { allyProps } from "../../components/uikit/tabs/tabContent";
import { ButtonGroup, Paper, Button, Typography } from "@mui/material";
import { generateRandomData } from "./utility";
import SortingContainer from "./sortingArea/container";

const Sorting = () => {
  const [activeTab, setTab] = useState(0);
  const [data, setData] = useState(generateRandomData());

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };

  const reset = () => {
    setData(generateRandomData());
  };

  return (
    <Paper className={styles.container}>
      <Typography paddingBottom={2} variant="body1" component="div">
        Визуализация различных алгоритмов сортировки
      </Typography>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={activeTab} onChange={handleChange}>
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
        <TabContent value={activeTab} index={i}>
          <SortingContainer data={generateRandomData()} />
        </TabContent>
      ))}

      <Box sx={{ paddingTop: 2, borderTop: 1, borderColor: "divider" }}>
        <ButtonGroup>
          <Button variant="contained" onClick={() => {}} disabled={false}>
            Запустить
          </Button>
          <Button variant="outlined" onClick={reset} disabled={false}>
            Сбросить
          </Button>
        </ButtonGroup>
      </Box>
    </Paper>
  );
};

export default Sorting;

const tabs = [
  { label: "Insertion" },
  { label: "Selection" },
  { label: "Bubble" },
  { label: "Merge" },
  { label: "Heap" },
  { label: "Quick" },
];
