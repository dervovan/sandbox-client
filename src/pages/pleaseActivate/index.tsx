import { Container, Paper, Typography } from "@mui/material";
import { useAppSelector } from "../../redux/hooks";
import { selectUser } from "../../redux/slice/auth";

function AccountActivationConfirmation() {
  const authData = useAppSelector(selectUser);
  const mailText = authData?.userData?.email
    ? ` адрес ${authData?.userData?.email} `
    : " почту ";

  return (
    <Paper
      style={{
        padding: "20px",
        margin: "10px 200px",
      }}
    >
      <Container maxWidth="sm">
        <Typography variant="h4" gutterBottom>
          Активация аккаунта
        </Typography>
        <Typography variant="body1" gutterBottom>
          Мы отправили электронное письмо на {mailText} со ссылкой для активации. Пожалуйста,
          проверьте свой почтовый ящик и активируйте учетную запись.
        </Typography>
      </Container>
    </Paper>
  );
}

export default AccountActivationConfirmation;
