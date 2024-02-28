import { Container, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <Container maxWidth="md">
      <Typography variant="h2" component="h1" gutterBottom>
        404 - Страница не найдена
      </Typography>
      <Typography variant="body1">
        Страница, которую вы ищете, не существует.
      </Typography>
      <NavLink to="/" color="primary">
        На главную страницу
      </NavLink>
    </Container>
  );
};

export default NotFoundPage;
