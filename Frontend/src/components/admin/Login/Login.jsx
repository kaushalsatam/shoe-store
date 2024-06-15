import { Button, TextField } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { baseURL } from "../../../utils/baseURL";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login({ setIsAdminAuthenticated }) {
  const navigate = useNavigate();

  const handleLogin = async (data) => {
    try {
      const result = await axios.post(`${baseURL}/adminLogin`, data);
      if (result.status === 200) {
        setIsAdminAuthenticated(true);
        toast.success(result.data.message);
        navigate("/admin");
      } else {
        toast.error(result.data.message);
      }
    } catch (e) {
      if (e.response) {
        // The request was made and the server responded with a status code that falls out of the range of 2xx
        toast.error(e.response.data.message);
      } else if (e.request) {
        // The request was made but no response was received
        toast.error("No response from server. Please try again later.");
      } else {
        // Something happened in setting up the request that triggered an Error
        toast.error("An error occurred. Please try again.");
      }
      console.log(e.message);
    }
  };

  // react-hook form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  function onSubmit(data) {
    handleLogin(data);
  }

  return (
    <>
      <div className="login-form-container h-screen w-full flex justify-center items-center flex-col">
        <div
          id="login-form"
          className="flex flex-col w-96 p-6 m-6 justify-center items-center gap-4 rounded-2xl shadow-md bg-cyan-100"
        >
          <LockOutlinedIcon fontSize="large" color="secondary" />
          <h1 className="font-bold text-2xl">Login</h1>
          <form method="POST" onSubmit={handleSubmit(onSubmit)}>
            <div className="login-form-field-container flex flex-col gap-8">
              <TextField
                id="email"
                label="Email"
                variant="outlined"
                type="email"
                {...register("email", { required: true })}
                error={errors.email ? true : false}
                helperText={errors.email ? "Email is required" : ""}
              />
              <TextField
                id="password"
                label="Password"
                variant="outlined"
                type="password"
                {...register("password", { required: true })}
                error={errors.password ? true : false}
                helperText={errors.password ? "Password is required" : ""}
              />
              <Button variant="contained" type="submit" className="h-12">
                {" "}
                Continue{" "}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
