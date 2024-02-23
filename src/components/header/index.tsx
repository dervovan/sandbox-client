import {
  AppBar,
  Button,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Menu,
  MenuItem,
  Skeleton,
  Toolbar,
} from "@mui/material";
import { NavLink } from "react-router-dom";
import Draw from "@mui/icons-material/Draw";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import styles from "./index.module.scss";
import { useState } from "react";
import ProfileMenu from "./profileMenu";
import { IAuthState, IUser } from "../../redux/slice/auth";

type MenuItem = {
  label: string;
  link: string;
};

type Props = {
  onClick?: Function;
  isLoading: boolean;
  profileData: IAuthState
};

const Header: React.FC<Props> = (props: Props) => {
  const {profileData} = props
  const menuItems: MenuItem[] = [
    { label: "Home", link: "/" },
    { label: "About", link: "/about" },
    { label: "Hello", link: "/hello" },
  ];


  return (
    <AppBar position="fixed" className={styles.appBar}>
      <Toolbar className={styles.toolbar}>
        {props.isLoading && <Skeleton sx={{ width: "50%", height: "40px" }} />}
        {!props.isLoading && (
          <List sx={{ display: "flex" }}>
            <ListItem key={"Burger"}>
              <Draw />
            </ListItem>
            {menuItems.map((i) => {
              return (
                <ListItem key={i.label} disablePadding>
                  <ListItemButton component={NavLink} to={i.link}>
                    <ListItemText primary={i.label} />
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>
        )}
        <ProfileMenu profileData={profileData}/>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
