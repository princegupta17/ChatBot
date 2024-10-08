import { TextField } from "@mui/material";

type Props = {
  name: string;
  type: string;
  label: string;
};

function CustomizeInput(props: Props) {
  return (
    <TextField
      margin="normal"
      InputLabelProps={{ style: { color: "white" } }}
      name={props.name}
      type={props.type}
      label={props.label}
      InputProps={{
        style: {
          width: "400px",
          borderRadius: 10,
          fontSize: 20,
          color: "white",
        },
      }}
    ></TextField>
  );
}

export default CustomizeInput;
