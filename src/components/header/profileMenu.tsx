import { useState } from "react";
import { Button, Menu, MenuItem, Typography } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import styles from "./index.module.scss";
import { IAuthState, IUser } from "../../redux/slice/auth";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";

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
              <MenuItem key="profile" LinkComponent={NavLink} href="/profile">
                Профиль
              </MenuItem>,
              <MenuItem key="exit" LinkComponent={NavLink} href="/">
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
                Вход
              </MenuItem>,
              <MenuItem
                onClick={() => {
                  navigate("/signup");
                  setMenuButton(null);
                }}
              >
                Регистрация
              </MenuItem>,
            ]}

        {/* <ListDivider /> */}
      </Menu>
    </>
  );
};

export default ProfileMenu;
