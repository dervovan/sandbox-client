import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { a11yProps } from "../../../components/uikit/tabs/tabContent";
import AlignVerticalBottomOutlinedIcon from "@mui/icons-material/AlignVerticalBottomOutlined";
import AlignVerticalCenterOutlinedIcon from "@mui/icons-material/AlignVerticalCenterOutlined";
import AlignVerticalTopOutlinedIcon from "@mui/icons-material/AlignVerticalTopOutlined";
import { Box } from "@mui/material";

type Props = {
  setValue: (event: React.SyntheticEvent, newValue: number) => void;
  value: number;
};

const Orientation: React.FC<Props> = ({ setValue, value }) => {
  return (
    <Box sx={{ alignContent: "center" }}>
      <Tabs
        orientation="vertical"
        value={value}
        onChange={setValue}
        sx={{ borderRight: 1, borderColor: "divider" }}
      >
        <Tab
          sx={{ flexGrow: 1 }}
          icon={<AlignVerticalTopOutlinedIcon />}
          {...a11yProps(0)}
        />
        <Tab
          sx={{ flexGrow: 1 }}
          icon={<AlignVerticalCenterOutlinedIcon />}
          {...a11yProps(1)}
        />
        <Tab
          sx={{ flexGrow: 1 }}
          icon={<AlignVerticalBottomOutlinedIcon />}
          {...a11yProps(2)}
        />
      </Tabs>
    </Box>
  );
};

export default Orientation;
