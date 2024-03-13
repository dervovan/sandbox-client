import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import TabContent, { allyProps } from "../../uikit/tabs/tabContent";
import { Dispatch, SetStateAction } from "react";
import { Button } from "@mui/material";
import GolManagement from "./golManagement";

interface TabPanelProps {
  activeTab: number;
  setTab: Dispatch<SetStateAction<number>>;
  onGolToggle: () => void;
  isGolRunning: boolean;
  resetGol: () => void;
}

const ManagementPanel = ({
  activeTab,
  setTab,
  onGolToggle,
  isGolRunning,
  resetGol,
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
        />
      </TabContent>
      <TabContent value={activeTab} index={1}>
        Item Two
      </TabContent>
    </div>
  );
};

export default ManagementPanel;
