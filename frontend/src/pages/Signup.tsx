import { Box, Button, Typography } from "@mui/material";
import CustomizeInput from "../components/shared/CustomizeInput";
import { IoIosLogIn } from "react-icons/io";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
axios.defaults.baseURL = "http://localhost:5000/api/v1";
axios.defaults.withCredentials = true;

function Signup() {
  const auth = useAuth();
  const navigate = useNavigate();
  const handlesubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formdata = new FormData(e.currentTarget);
    const name = formdata.get("name") as string;
    const email = formdata.get("email") as string;
    const password = formdata.get("password") as string;

    try {
      toast.loading("Signing Up", { id: "signup" });
      await auth?.signup(name, email, password);
      toast.success("Registered Successfully", { id: "signup" });
    } catch (error) {
      console.log(error);
      toast.error("Signing Up Failed", { id: "signup" });
    }
  };

  useEffect(() => {
    if (auth?.user) {
      return navigate("/chat");
    }
  }, [auth, navigate]);
  return (
    <Box width={"100%"} height={"100%"} display={"flex"} flex={1}>
      <Box padding={8} mt={8} display={{ md: "flex", sm: "none", xs: "none" }}>
        <img src="airobot.png" alt="robot" style={{ width: "400px" }}></img>
      </Box>
      <Box
        display={"flex"}
        flex={{ xs: "1", md: "0.5" }}
        justifyContent={"center"}
        alignItems={"center"}
        padding={2}
        ml={"auto"}
        mt={16}
      >
        <form
          onSubmit={handlesubmit}
          style={{
            margin: "auto",
            padding: "30px",
            boxShadow: "10px 10px 20px #000",
            borderRadius: "10px",
            border: "none",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <Typography
              variant="h4"
              textAlign="center"
              padding={2}
              fontWeight={600}
            >
              Login
            </Typography>
            <CustomizeInput type="text" name="name" label="Name" />
            <CustomizeInput type="email" name="email" label="Email" />
            <CustomizeInput type="password" name="password" label="Password" />
            <Button
              type="submit"
              sx={{
                px: 2,
                py: 1,
                mt: 2,
                width: "400px",
                borderRadius: 2,
                bgcolor: "00fffc",
                ":hover": { bgcolor: "white", color: "black" },
              }}
              endIcon={<IoIosLogIn />}
            >
              Signup
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  );
}

export default Signup;
