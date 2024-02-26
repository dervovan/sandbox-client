import { useState } from "react";
import { Button, ListItemIcon, Menu, MenuItem, Typography } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import styles from "./index.module.scss";
import { IAuthState, IUser } from "../../redux/slice/auth";
import { useNavigate } from "react-router-dom";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';

interface ProfileMenuProps {
  profileData: IAuthState;
  disabled: boolean;
}

const ProfileMenu = ({ profileData, disabled }: ProfileMenuProps) => {
  const { isAuthorized, userData } = profileData || {};
  const [menuButton, setMenuButton] = useState<HTMLElement | null>(null);
  const navigate = useNavigate();

  return (
    <>
      <Button
        disabled={disabled}
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
        {isAuthorized
          ? [
              <MenuItem
                key="profile"
                onClick={() => {
                  navigate("/profile");
                  setMenuButton(null);
                }}
              >
                <ListItemIcon>
                  <ManageAccountsIcon fontSize="medium" />
                </ListItemIcon>
                Профиль
              </MenuItem>,
              <MenuItem
                key="exit"
                onClick={() => {
                  navigate("/");
                  setMenuButton(null);
                }}
              >
                <ListItemIcon>
                  <LogoutIcon fontSize="medium" />
                </ListItemIcon>
                Выйти
              </MenuItem>,
            ]
          : [
              <MenuItem
                onClick={() => {
                  navigate("/signin");
                  setMenuButton(null);
                }}
              >
                <ListItemIcon>
                  <LoginIcon fontSize="medium" />
                </ListItemIcon>
                Вход
              </MenuItem>,
              <MenuItem
                onClick={() => {
                  navigate("/signup");
                  setMenuButton(null);
                }}
              >
                <ListItemIcon>
                  <AppRegistrationIcon fontSize="medium" />
                </ListItemIcon>
                Регистрация
              </MenuItem>,
            ]}

        {/* <ListDivider /> */}
      </Menu>
    </>
  );
};

export default ProfileMenu;
