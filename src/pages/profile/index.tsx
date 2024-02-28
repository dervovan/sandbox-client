import { useAppSelector } from "../../redux/hooks";
import { RootState } from "../../redux/store";
import { TextField, Typography, Paper, styled } from "@mui/material";
import { Role } from "../../redux/slice/auth";

const roles: Record<Role, string> = {
  ADMIN: "Администратор",
  USER: "Пользователь",
  "": "",
};

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  margin: theme.spacing(2),
  display: "grid",
  gridAutoFlow: "row",
  gap: theme.spacing(3),
}));

const Profile: React.FC = () => {
  const selectUser = (state: RootState) => state.auth.userData;
  const userData = useAppSelector(selectUser);

  return (
    <StyledPaper>
      <Typography variant="h6" style={{ textAlign: "center" }}>
        Профиль
      </Typography>
      <TextField
        label="Имя"
        value={userData?.firstName || ''}
        inputProps={{ readOnly: true }}
      />
      <TextField
        label="Фамилия"
        value={userData?.lastName || ''}
        inputProps={{ readOnly: true }}
        disabled={!userData?.lastName}
      />
      <TextField
        label="Email"
        value={userData?.email || ''}
        inputProps={{ readOnly: true }}
      />
      <TextField
        label="Роль"
        value={userData?.role?.[0] ? roles[userData?.role?.[0] as Role] : ''}
        inputProps={{ readOnly: true }}
      />
    </StyledPaper>
  );
};

export default Profile;
