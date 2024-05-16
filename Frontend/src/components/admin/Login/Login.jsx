import { Button, TextField } from "@mui/material"
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useForm } from 'react-hook-form'

function Login() {

    const {
        register,
        handleSubmit,   
        formState: { errors },
      } = useForm()

      function onSubmit(data){
        console.log(data);
      }

  return (
    <div id="login-form" className="flex flex-col w-96 p-6 m-6 justify-center items-center gap-4 rounded-2xl shadow-md bg-cyan-100">
        <LockOutlinedIcon fontSize="large" color="secondary"/>
        <h1 className="font-bold text-2xl">Login</h1>
        <form method="POST" onSubmit={handleSubmit(onSubmit)}>
            <div className="login-form-field-container flex flex-col gap-8">
                <TextField id="username" label="Username" variant="outlined" 
                  {...register("username", {required: true})} error={errors.username ? true : false} helperText={errors.username ? "Username is required" : ""}
                />
                <TextField id="password" label="Password" variant="outlined" type="password" 
                  {...register("password", {required: true})} error={errors.password ? true : false} helperText={errors.password ? "Password is required" : ""}
                />
                <Button variant="contained" type="submit" className="h-12"> Continue </Button>
            </div>
        </form>
    </div>
  )
}

export default Login
