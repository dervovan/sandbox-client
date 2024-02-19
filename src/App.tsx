import WorkArea from "./components/workArea";
import AppHeader from "./components/header";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import api from "./api";
import { IUser, Role, login } from "./redux/slice/auth";
import FullScreenLoader from "./components/uikit/loader/fullscreen";
import { useAppDispatch, useAppSelector } from "./redux/hooks";

interface IAuthResponse {
  login: string;
  email: string;
  role: Role;
}

// const getCurrentUser = (): Promise<AxiosResponse<IAuthResponse>> =>
// api.post({ url: "/getCurrentUser" });

function App() {
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();
  const user = useAppSelector(state => state.auth);

  const getCurrentUser = async (): Promise<IUser> => {
    const result = await api.get('https://jsonplaceholder.typicode.com/todos/1'); 
    dispatch(login(result));
    return result
  }

  const { data, isError, isLoading } = useQuery({
    queryKey: ["auth"],
    queryFn: getCurrentUser,
  });

  return (
    <>
      {isLoading && <FullScreenLoader />}
      <AppHeader isLoading={isLoading}/>
      <WorkArea />
    </>
  );
}

export default App;
