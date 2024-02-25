import { useForm } from "react-hook-form";
import { Box, Button, Grid, Paper, Typography } from "@mui/material";
import { FormInput } from "../formComponents/input";
import useApi from "../../api/useApi";
import { IRefreshTokenResponse } from "../../api/types";
import { useMutation } from "@tanstack/react-query";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const Signup = () => {
  const methods = useForm<FormData>();
  const { post } = useApi();
  const {
    handleSubmit,
    formState,
    control,
    getValues,
    watch,
    setValue,
    register,
  } = methods;
  // const { errors } = formState;

  const signup = async ({
    email,
    password,
  }: FormData): Promise<IRefreshTokenResponse> => {
    const response = await post<IRefreshTokenResponse>(`/auth/signup`, {
      email: email,
      password: password,
    });

    return response;
  };

  const { mutate, isPending, error } = useMutation<
    IRefreshTokenResponse,
    any,
    FormData
  >({
    mutationFn: signup,
  });
  const onSubmit = (data: FormData) => {
    console.log(data);
    mutate(data);
  };

  return (
    <Paper
      style={{
        display: "grid",
        gridRowGap: "20px",
        padding: "20px",
        margin: "10px 200px",
      }}
    >
      {isPending && "isPending"}
      <Typography
        variant="h4"
        style={{ textAlign: "center", paddingBottom: "40px" }}
      >
        Регистрация
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <FormInput
              name="firstName"
              control={control}
              label="Имя *"
              rules={{
                required: "Обязательно для заполнения",
                minLength: { value: 2, message: "Минимум 2 символа" },
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormInput
              name="lastName"
              control={control}
              label="Фамилия"
              rules={{
                minLength: { value: 2, message: "Минимум 2 символа" },
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <FormInput
              name="email"
              control={control}
              label="Email *"
              rules={{
                required: "Обязательно для заполнения",
                pattern: {
                  value: /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
                  message: "Неверный формат почты",
                },
              }}
              autoComplete="nope"
            />
          </Grid>
          <Grid item xs={12}>
            <FormInput
              name="password"
              control={control}
              label="Пароль *"
              rules={{
                required: "Обязательно для заполнения",
                pattern: {
                  value:
                    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]*).{8,}$/,
                  message:
                    "Пароль должен содержать 8 символов: латинские буквы верхнего и нижнего регистра и арабские цифры",
                },
              }}
              type="password"
              autoComplete="new-password"
            />
          </Grid>
          <Grid item xs={12}>
            <FormInput
              name="confirmPassword"
              control={control}
              label="Подтвердите пароль *"
              rules={{
                required: "Обязательно для заполнения",
                validate: (data: any) => {
                  return (
                    getValues("password") === data || "Пароли не совпадают"
                  );
                },
              }}
              type="password"
              autoComplete="new-password"
            />
          </Grid>
          <Grid item xs={12} mt={"40px"}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Зарегистрироваться
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};

export default Signup;
