import { useForm, FormProvider } from "react-hook-form";
import { Grid, Paper, Typography } from "@mui/material";
import { FormInput } from "../formComponents/input";
import { LoadingButton } from "@mui/lab";
import { login } from "../../redux/slice/auth";
import { IAuthResponse } from "../../api/types";
import { useMutation } from "@tanstack/react-query";
import { useAppDispatch } from "../../redux/hooks";
import useApi from "../../api/useApi";
import { SUGNIN_URL } from "../../api";
import { useNavigate } from "react-router-dom";
import LoginIcon from '@mui/icons-material/Login';

interface FormData {
  email: string;
  password: string;
}

const Signin = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { post } = useApi();
  const methods = useForm<FormData>({
    defaultValues: {
      email: "testmyauth@yopmail.com",
      password: "qwe",
    },
  });
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

  const signin = async (data: FormData): Promise<IAuthResponse> => {
    const response = await post<IAuthResponse>(SUGNIN_URL, data);

    return response;
  };

  const { mutate, isPending, error } = useMutation<
    IAuthResponse,
    any,
    FormData
  >({
    mutationFn: signin,
    onSuccess: (data: IAuthResponse) => {
      if (data?.email) {
        dispatch(login(data));
        navigate("/");
      }
    },
  });

  const onSubmit = (data: FormData) => {
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
                }}
                type="password"
                autoComplete="new-password"
                disabled={isPending}
              />
            </Grid>
            <Grid item xs={12} mt={"40px"}>
              <LoadingButton
                loading={isPending}
                loadingPosition="start"
                startIcon={<LoginIcon />}
                variant="contained"
                color="primary"
                fullWidth
                type="submit"
              >
                Войти
              </LoadingButton>
            </Grid>
          </Grid>
        </form>
      </FormProvider>
    </Paper>
  );
};

export default Signin;
