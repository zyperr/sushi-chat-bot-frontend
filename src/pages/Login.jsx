import {useForm} from "react-hook-form"
import z from "zod"
import {zodResolver} from "@hookform/resolvers/zod"
import { LuEyeClosed,LuEye } from "react-icons/lu";
import { useState } from "react";

import "../style/pages/Login.css"

const schema = z.object({
    name: z.string({required_error:"Porfavor complete este campo"}).min(3,{message:"Porfavor complete este campo"}),
    password: z.string().min(8,{message:"Porfavor complete este campo"}).regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,{message:"La contraseña debe contener al menos 8 caracteres, una letra mayúscula, una letra minúscula y un número"}),    
})

const Login = () => {

    const {handleSubmit,register,formState:{errors}} = useForm({resolver:zodResolver(schema)})
    const [showPassword, setShowPassword] = useState(false);
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    }
    const onSubmit = (data) => {
        console.log(data)
    }
  return (
    <section className="section__login">
        <form onSubmit={handleSubmit(onSubmit)} className="form">
            <div className="form__input-container">
                <label htmlFor="name" className="form__label">Nombre de usuario</label>
                <input type="text" id="name" {...register("name")} name="name" className="form__input"/>
                {errors.name && <p className="form__input-error">{errors.name.message}</p>}
            </div>
            <div className="form__input-container">
                <label htmlFor="contraseña" className="form__label">Contraseña</label>
                <input type={showPassword ? "text" : "password"} id="contraseña" name="password" {...register("password")} className="form__input"/>
                {showPassword ? <LuEye className="form__input-icon" onClick={togglePasswordVisibility} /> : <LuEyeClosed className="form__input-icon" onClick={togglePasswordVisibility} />}
                {errors.password && <p className="form__input-error">{errors.password.message}</p>}
            </div>
            <button type="submit">Iniciar sesión</button>
            <p className="form__register">¿No tienes una cuenta? <a href="/register" className="form__register-link">Registrate</a></p>
        </form>
    </section>

  )
}


export default Login