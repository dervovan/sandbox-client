import { useForm } from "react-hook-form";
import { Grid, Paper, Typography } from "@mui/material";
import { FormInput } from "../formComponents/input";
import useApi from "../../api/useApi";
import { IAuthResponse, IRefreshTokenResponse } from "../../api/types";
import { useMutation } from "@tanstack/react-query";
import { LoadingButton } from "@mui/lab";
import { useAppDispatch } from "../../redux/hooks";
import { login } from "../../redux/slice/auth";
import { SUGNUP_URL } from "../../api";
import { useNavigate } from "react-router-dom";
import styles from "./index.module.scss";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const Signup = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const methods = useForm<FormData>({
    defaultValues: {
      firstName: "qwe",
      email: "testmyauth@yopmail.com",
      password: "Qqwe1234",
      confirmPassword: "Qqwe1234",
    },
  });
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

  const signup = async (data: FormData): Promise<IAuthResponse> => {
    const response = await post<IAuthResponse>(SUGNUP_URL, data);

    return response;
  };

  const { mutate, isPending, error } = useMutation<
    IAuthResponse,
    any,
    FormData
  >({
    mutationFn: signup,
    onSuccess: (data: IAuthResponse) => {
      data?.email && dispatch(login(data));
      navigate("/pleaseActivate");
    },
  });

  const onSubmit = async (data: FormData) => {
    mutate(data);
  };

  return (
    <Paper className={styles.container}>
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
              disabled={isPending}
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
              disabled={isPending}
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
              disabled={isPending}
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
              disabled={isPending}
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
              disabled={isPending}
            />
          </Grid>
          <Grid item xs={12} mt={"40px"}>
            <LoadingButton
              loading={isPending}
              // loadingPosition="start"
              variant="contained"
              // color="primary"
              fullWidth
              type="submit"
            >
              Зарегистрироваться
            </LoadingButton>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};

export default Signup;
