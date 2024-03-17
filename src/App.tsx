import WorkArea from "./components/workArea";
import AppHeader from "./components/header";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { IUser, login, selectUser } from "./redux/slice/auth";
import FullScreenLoader from "./components/uikit/loader/fullscreen";
import { useAppDispatch, useAppSelector } from "./redux/hooks";
import { RootState } from "./redux/store";
import api from "./api";
import { IAuthResponse } from "./api/types";
import { selectToasts } from "./redux/slice/toast";
import { Snackbar } from "@mui/material";
import useToast from "./components/uikit/toasts/useToast";

function App() {
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();
  const userData = useAppSelector(selectUser);
  const toasts = useAppSelector(selectToasts);
  const { closeToast } = useToast();

  const getCurrentUser = async (): Promise<IAuthResponse> => {
    const result = await api.get<IAuthResponse>("/users/me");
    const { data, response } = result;

    !response && dispatch(login(data));
    return data;
  };

  const { data, isError, isLoading } = useQuery({
    queryKey: ["auth"],
    queryFn: getCurrentUser,
  });

  return (
    <>
      {isLoading && <FullScreenLoader />}
      <AppHeader isLoading={isLoading} profileData={userData} />
      <WorkArea authData={userData} />
      {toasts.map((t) => {
        return (
          <Snackbar
            anchorOrigin={{ vertical: t.vertical, horizontal: t.horizontal }}
            open
            onClose={() => closeToast(t.key)}
            message={t.message}
            key={t.key}
          />
        );
      })}
    </>
  );
}

export default App;
