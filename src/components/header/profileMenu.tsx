import { useState } from "react";
import {
  Button,
  Menu,
  MenuItem,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import styles from "./index.module.scss";
import { IAuthState, IUser } from "../../redux/slice/auth";
import { NavLink } from "react-router-dom";

interface ProfileMenuProps {
  profileData: IAuthState
}


const ProfileMenu = ({profileData}: ProfileMenuProps) => {
  const {isAuthorized, userData} = profileData || {};
  const [menuButton, setMenuButton] = useState<HTMLElement | null>(null);

  return <>
    <Button
      className={styles.accountCircle}
      onClick={(event) => setMenuButton(event.currentTarget)}
    >
      <AccountCircleIcon />
    </Button>
    <Menu
      anchorEl={menuButton}
      open={!!menuButton}
      onClose={() => setMenuButton(null)}
    >
      {isAuthorized ? [
        <MenuItem key='profile' LinkComponent={NavLink} href='/profile'>
          Профиль
        </MenuItem>,
        <MenuItem key='exit' LinkComponent={NavLink} href='/'>Выйти</MenuItem>
      ] : [
        <MenuItem key='signin' LinkComponent={NavLink} href='/signin'>Войти</MenuItem>,
        <MenuItem key='signup' LinkComponent={NavLink} href='/signup'>Зарегистрироваться</MenuItem>
      ]}
      
      {/* <ListDivider /> */}
    </Menu>
  </>;
};

export default ProfileMenu;
