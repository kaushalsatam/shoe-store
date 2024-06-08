import { Button, TextField } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { baseURL } from "../../../utils/baseURL";

function Login({ setIsAdminAuthenticated }) {
  const navigate = useNavigate();

  const handleLogin = async (data) => {
    try {
      const result = await axios.post(`${baseURL}/adminLogin`, data);
      // console.log(result.data)
      if (result.status == 200) {
        setIsAdminAuthenticated(true);
        navigate("/admin");
      }
    } catch (e) {
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
    console.log(data);
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
