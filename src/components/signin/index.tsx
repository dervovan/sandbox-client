import { useForm, FormProvider } from "react-hook-form";
import { Box, Button, Grid, Paper, Typography } from "@mui/material";
import { FormInput } from "../formComponents/input";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  acceptTerms: boolean;
}

const Signin = () => {
  const methods = useForm<FormData>();
  const {
    handleSubmit,
    formState,
    control,
    getValues,
    watch,
    setValue,
    register,
  } = methods;
  const { errors } = formState;

  const onSubmit = (data: FormData) => {
    console.log(data);
  };

  // const password = watch("password");

  return (
    <Paper
      style={{
        display: "grid",
        gridRowGap: "20px",
        padding: "20px",
        margin: "10px 200px",
      }}
    >
      <Typography
        variant="h4"
        style={{ textAlign: "center", paddingBottom: "40px" }}
      >
        Вход
      </Typography>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <FormInput
                name="Email"
                control={control}
                label="Email *"
                rules={{
                  required: "Обязательно для заполнения",
                  pattern: {
                    value: /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
                    message: "Неверный формат почты",
                  },
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <FormInput
                name="password"
                control={control}
                label="Пароль *"
                rules={{
                  required: "Обязательно для заполнения",
                  // pattern: {
                  //   value:
                  //     /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]*).{8,}$/,
                  //   message:
                  //     "Пароль должен содержать 8 символов: латинские буквы верхнего и нижнего регистра и арабские цифры",
                  // },
                }}
                type="password"
                autoComplete="new-password"
              />
            </Grid>
            <Grid item xs={12} mt={"40px"}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
              >
                Войти
              </Button>
            </Grid>
          </Grid>
        </form>
      </FormProvider>
    </Paper>
  );
};

export default Signin;
