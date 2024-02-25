import {
  AppBar,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  MenuItem,
  Skeleton,
  Toolbar,
} from "@mui/material";
import { NavLink } from "react-router-dom";
import Draw from "@mui/icons-material/Draw";
import styles from "./index.module.scss";
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
  const {profileData, isLoading} = props
  const menuItems: MenuItem[] = [
    { label: "Home", link: "/" },
    { label: "About", link: "/about" },
    { label: "Hello", link: "/signup" },
  ];

  return (
    <AppBar position="fixed" className={styles.appBar}>
      <Toolbar className={styles.toolbar}>
        {isLoading && <Skeleton sx={{ width: "50%", height: "40px" }} />}
        {!isLoading && (
          <List sx={{ display: "flex" }}>
            <ListItem key={"Burger"}>
              <Draw />
            </ListItem>
            {menuItems.map((i) => {
              return (
                <ListItem key={i.label} disablePadding className={styles.menuItem}>
                  <ListItemButton component={NavLink} to={i.link}>
                    <ListItemText primary={i.label} />
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>
        )}
        <ProfileMenu disabled={isLoading} profileData={profileData}/>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
