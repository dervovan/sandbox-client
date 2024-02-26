import api from "../api";
import { useAppDispatch } from "../redux/hooks";
import { setError } from "../redux/slice/error";

const useApi = () => {
  const dispatch = useAppDispatch();

  const handleStatus = (data: any, status: number) => {
    switch (status) {
      case 401:
        dispatch(setError(data));
        break;

      default:
        break;
    }
  };

  const get = async <T>(url: string) => {
    const result = await api.get<T>(url);
    const { data, response } = result;
    response && handleStatus(response.data, response.status);
    return data || (response?.data as T);
  };

  const post = async <T>(url: string, postData?: any) => {
    const { data, response } = await api.post<T>({
      data: postData,
      url: url,
    });
    response && handleStatus(response.data, response.status);
    return data || (response?.data as T);
  };

  return {
    get,
    post,
  };
};

export default useApi;
