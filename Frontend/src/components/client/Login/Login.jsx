import { Button, TextField } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useForm } from "react-hook-form";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { baseURL } from "../../../utils/baseURL";

function Login({ setIsAuthenticated, setCustomerData }) {
  const navigate = useNavigate();

  const handleLogin = async (data) => {
    try {
      const result = await axios.post(`${baseURL}/login`, data, {
        withCredentials: true,
      });
      console.log(result.data);
      if (result.data.authToken) {
        setIsAuthenticated(true);
        localStorage.setItem("authToken", result.data.authToken);
        setCustomerData(result.data.userData);
        navigate("/");
        toast.success(result.data.message);
      } else {
        toast.error(result.data.message);
      }
    } catch (e) {
      console.log(e.message);
      // toast.error("Login unsuccessful!");
    }
  };

  // react-hook form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  function onSubmit(data) {
    console.log(data);
    handleLogin(data);
  }

  return (
    <>
      <div className="login-form-container my-16 w-full flex justify-center items-center flex-col">
        <h1 className="text-2xl font-semibold">Welcome Back!</h1>
        <div
          id="login-form"
          className="flex flex-col w-96 p-6 m-6 justify-center items-center gap-4 rounded-2xl shadow-md"
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
        <p>
          Don't have an account ?{" "}
          <NavLink to={"/signup"} className="text-blue-500">
            Sign up
          </NavLink>
        </p>
      </div>
    </>
  );
}

export default Login;
