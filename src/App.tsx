import WorkArea from "./components/workArea";
import AppHeader from "./components/header";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { IUser, login } from "./redux/slice/auth";
import FullScreenLoader from "./components/uikit/loader/fullscreen";
import { useAppDispatch, useAppSelector } from "./redux/hooks";
import { RootState } from "./redux/store";
import api from "./api";
import { IAuthResponse } from "./api/types";

function App() {
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();
  const selectUser = (state: RootState) => state.auth;
  const userData = useAppSelector(selectUser);

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
      <WorkArea />
    </>
  );
}

export default App;
