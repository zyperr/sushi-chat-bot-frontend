import {useForm} from "react-hook-form"
import z from "zod"
import {zodResolver} from "@hookform/resolvers/zod"
import LoginBtn from "../components/btn";
import ToggleInput from "../components/register&login/ToggleInput";
import { useApiUser } from "../hooks/useApiUser";
import { useState } from "react";
import ErrorBar from "../components/ErrorBar";
import "../style/pages/Login.css"

const schema = z.object({
    name: z.string({required_error:"Porfavor complete este campo"}).min(3,{message:"Porfavor complete este campo"}),
    password: z.string().min(8,{message:"Porfavor complete este campo"}).regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,{message:"La contraseña debe contener al menos 8 caracteres, una letra mayúscula, una letra minúscula y un número"}),    
})
const toggleBar = (fnState) => {
    const timer = setTimeout(() => {
        fnState({type:"",message:""})
    },3500)
    return () => clearTimeout(timer)
}
const Login = () => {
    const [error,setError]= useState({type:"",message:""})

    const {handleSubmit,register,formState:{errors}} = useForm({resolver:zodResolver(schema)})
    const {login} = useApiUser()
    const onSubmit = async (data) => {
        const {status} = await login(data);
        if(status === 200) {
            setError({type:"ok",message:"Sesión iniciada exitosamente, Redirigiendo..."});
            toggleBar(setError)
            const timer = setTimeout(() => {
                window.location.href = "/"
            },3600)
            return () => clearTimeout(timer)
        }
        if(status === 401) {
            setError({type:"error",message:"El usuario no existe"});
            toggleBar(setError)

        }
        if(status === 400) {
            setError({type:"error",message:"La contraseña no es correcta"});
            toggleBar(setError)
        }

    }

  return (
    <section className="section__login">
        <ErrorBar message={error.message} type={error.type}/>
        <form onSubmit={handleSubmit(onSubmit)} className="form">
            <div className="form__input-container">
                <label htmlFor="name" className="form__label">Nombre de usuario</label>
                <input type="text" id="name" {...register("name")} name="name" className="form__input"/>
                {errors.name && <p className="form__input-error">{errors.name.message}</p>}
            </div>
            <div className="form__input-container">
                <label htmlFor="password" className="form__label">Contraseña</label>
                <ToggleInput id="password" name="password" {...register("password")}/>
                {errors.password && <p className="form__input-error">{errors.password.message}</p>}
            </div>
            <LoginBtn text="Iniciar Sesión" type="submit"/>
            <p className="form__register">¿No tienes una cuenta? <a href="/register" className="form__register-link">Registrate</a></p>
        </form>
    </section>

  )
}


export default Login