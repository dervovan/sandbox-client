import { useAppDispatch } from "../../../redux/hooks";
import {
  addToastMessage,
  clearToasts as clearToastsAction,
  closeToast as closeToastAction,
} from "../../../redux/slice/toast";
import { SnackbarOrigin } from "@mui/material";

interface addToastParams extends Partial<SnackbarOrigin> {
  message: string;
}

const useToast = () => {
  const dispatch = useAppDispatch();

  const addToast = ({ vertical, horizontal, message }: addToastParams) => {
    dispatch(
      addToastMessage({
        vertical: vertical ?? "top",
        horizontal: horizontal ?? "center",
        message: message,
        key: new Date().valueOf(),
      })
    );
  };

  const clearToasts = () => {
    dispatch(clearToastsAction());
  };

  const closeToast = (id: string | number) => {
    dispatch(closeToastAction(id));
  };

  return {
    addToast,
    clearToasts,
    closeToast,
  };
};

export default useToast;
