import { useState } from "react";
import {
  Button,
  ListItemIcon,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import styles from "./index.module.scss";
import { IAuthState, IUser } from "../../redux/slice/auth";
import { useNavigate } from "react-router-dom";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import { useMutation } from "@tanstack/react-query";
import useApi from "../../api/useApi";
import { logout } from "../../redux/slice/auth";
import { useAppDispatch } from "../../redux/hooks";

interface ProfileMenuProps {
  profileData: IAuthState;
  disabled: boolean;
}

const ProfileMenu = ({ profileData, disabled }: ProfileMenuProps) => {
  const navigate = useNavigate();
  const { post } = useApi();
  const dispatch = useAppDispatch();
  const { isAuthorized, userData } = profileData || {};
  const [menuButton, setMenuButton] = useState<HTMLElement | null>(null);

  const onLogout = async () => {
    const response = await post<any>("/auth/logout");

    return response;
  };

  const { mutate, isPending, error } = useMutation({
    mutationFn: onLogout,
    onSuccess: () => {
      dispatch(logout());
    },
  });

  const handleQuit = () => {
    mutate()
    navigate("/signin");
    setMenuButton(null);
  };

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
              <MenuItem key="exit" onClick={handleQuit}>
                <ListItemIcon>
                  <LogoutIcon fontSize="medium" />
                </ListItemIcon>
                Выйти
              </MenuItem>,
            ]
          : [
              <MenuItem
                key="signin"
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
                key="signup"
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
