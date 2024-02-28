// https://github.com/IsaacThaJunior/react-hook-form-and-mui/tree/main/src
import { Controller, Noop, RefCallBack } from "react-hook-form";
import TextField from "@mui/material/TextField";
import { FormInputProps } from "./types";
import { IconButton, InputAdornment } from "@mui/material";
import { Close, Visibility, VisibilityOff } from "@mui/icons-material";
import { useRef, useState } from "react";

export const FormInput = ({
  name,
  control,
  label,
  rules,
  type,
  disabled,
  ...props
}: FormInputProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const ref = useRef<HTMLElement>(null);
  const onClear = (field: { onChange: any }) => {
    field.onChange('');
    if (ref && ref.current) {
      ref.current.focus();
    }

  };

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState: { error }, formState }) => (
        <TextField
          {...field}
          inputRef={ref}
          helperText={error ? error.message : null}
          // size="small"
          error={!!error}
          disabled={disabled}
          fullWidth
          label={label}
          InputProps={{
            endAdornment: !disabled && (
              <InputAdornment position="end">
                {type === "password" ? (
                  <IconButton
                    style={{ opacity: 0.4, margin: "0 4px" }}
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                ) : null}
                <IconButton
                  style={{ opacity: 0.8, margin: "0 4px" }}
                  aria-label="toggle password visibility"
                  onClick={() => onClear(field)}
                  edge="end"
                >
                  {<Close />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          inputProps={{
            ...props,
            type:
              type !== "password" ? type : showPassword ? "text" : "password",
          }}
          // variant="outlined"
        />
      )}
    />
  );
};
