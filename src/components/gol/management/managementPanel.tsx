import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import TabContent, { allyProps } from "../../uikit/tabs/tabContent";
import { Dispatch, SetStateAction } from "react";
import { Button, Typography } from "@mui/material";
import GolManagement from "./golManagement";
import { FigureType } from "../types";

interface TabPanelProps {
  activeTab: number;
  setTab: Dispatch<SetStateAction<number>>;
  onGolToggle: () => void;
  isGolRunning: boolean;
  resetGol: () => void;
  damp: () => void;
  uploadFromFile: (data: string) => void;
  setFigure: (type: FigureType) => void
}

const ManagementPanel = ({
  activeTab,
  setTab,
  onGolToggle,
  isGolRunning,
  resetGol,
  damp,
  uploadFromFile,
  setFigure
}: TabPanelProps) => {
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };

  return (
    <div>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={activeTab} onChange={handleChange}>
          <Tab sx={{ flexGrow: 1 }} label="Игра Жизнь" {...allyProps(0)} />
          <Tab sx={{ flexGrow: 1 }} label="Круги на воде" {...allyProps(1)} />
        </Tabs>
      </Box>
      <TabContent value={activeTab} index={0}>
        <GolManagement
          onGolToggle={onGolToggle}
          isGolRunning={isGolRunning}
          resetGol={resetGol}
          damp={damp}
          uploadFromFile={uploadFromFile}
          setFigure={setFigure}
        />
      </TabContent>
      <TabContent value={activeTab} index={1}>
        <Box paddingTop={2}>
          <Typography variant="body1" component="span">
            Просто медитируй, кликая по квадратикам
          </Typography>
        </Box>
      </TabContent>
    </div>
  );
};

export default ManagementPanel;
