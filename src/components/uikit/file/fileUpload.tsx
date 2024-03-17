import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import { ChangeEvent } from "react";

type Props = {
  disabled: boolean;
  onUpload: (string: string) => void;
};

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

export default function InputFileUpload({ disabled, onUpload }: Props) {

  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e?.target?.files) {
      return;
    }
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (evt) => {
      if (!evt?.target?.result) {
        return;
      }
      const { result } = evt.target;
      onUpload(result as string)
    };

    try {
      reader.readAsText(file, "UTF-8");
    } catch (error) {
      console.error(error) 
    } finally {
      e.target.value = ''
    }
  };

  return (
    <Button
      component="label"
      role={undefined}
      variant="contained"
      tabIndex={-1}
      startIcon={<FileUploadIcon />}
      disabled={disabled}
    >
      Загрузить
      <VisuallyHiddenInput type="file" onChange={handleFileUpload} />
    </Button>
  );
}
