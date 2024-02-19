import {
  AppBar,
  Button,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Skeleton,
  Toolbar,
} from "@mui/material";
import { NavLink } from "react-router-dom";
import Draw from "@mui/icons-material/Draw";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import styles from "./index.module.scss";

type MenuItem = {
  label: string;
  link: string;
};

type Props = {
  onClick?: Function;
  isLoading: boolean;
};

const Header: React.FC<Props> = (props: Props) => {
  const menuItems: MenuItem[] = [
    { label: "Home", link: "/" },
    { label: "About", link: "/about" },
    { label: "Hello", link: "/hello" },
  ];
  
  return (
    <AppBar position="fixed" className={styles.appBar}>
      <Toolbar className={styles.toolbar}>
        {props.isLoading && <Skeleton sx={{width: '50%', height: '40px'}}/>}
        {!props.isLoading && <List sx={{ display: "flex" }}>
          <ListItem key={"Burger"}>
            <Draw />
          </ListItem>
          {menuItems.map(i => {
            return (
              <ListItem key={i.label} disablePadding>
                <ListItemButton
                  component={NavLink}
                  to={i.link}
                >
                  <ListItemText primary={i.label} />
                </ListItemButton>
              </ListItem>
            )
          })}
        </List>}
        <Button className={styles.accountCircle}>
          <AccountCircleIcon/>
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
