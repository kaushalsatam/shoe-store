import { Button, TextField } from "@mui/material";
import axios from "axios";
import { useForm } from "react-hook-form";
import { baseURL } from "../../../utils/baseURL";
import { useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();

  async function handleSignup(data) {
    await axios.post(`${baseURL}/signup`, data);
    navigate("/products");
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    handleSignup(data);
  };

  return (
    <div className="customer-signup p-12 flex flex-col justify-center items-center gap-4">
      <h1 className="font-bold text-2xl">
        Welcome to <span className="text-indigo-600">Solespace</span>
      </h1>
      <h1 className="font-bold text-3xl">Signup</h1>
      <form method="post" onSubmit={handleSubmit(onSubmit)}>
        <div className="signup-form-field-container flex flex-col justify-center items-center gap-4">
          <TextField
            id="outlined-basic"
            label="Name"
            variant="outlined"
            {...register("name")}
            className="w-80"
          />
          <TextField
            id="outlined-basic"
            label="Email"
            variant="outlined"
            type="email"
            {...register("email")}
            className="w-80"
          />
          <TextField
            id="outlined-basic"
            label="Phone"
            variant="outlined"
            type="number"
            {...register("phone")}
            className="w-80"
          />
          <TextField
            id="outlined-basic"
            label="Address"
            variant="outlined"
            multiline
            maxRows={5}
            {...register("address")}
            className="w-80"
          />
          <TextField
            id="outlined-basic"
            label="Password"
            variant="outlined"
            type="password"
            {...register("password")}
            className="w-80"
          />
          <Button variant="contained" type="submit">
            CONTINUE
          </Button>
          <p>Already have an account? Login</p>
        </div>
      </form>
    </div>
  );
}

export default Signup;
