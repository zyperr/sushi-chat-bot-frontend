import {useForm} from "react-hook-form"
import z from "zod"
import {zodResolver} from "@hookform/resolvers/zod"
import { useApiUser } from "../hooks/useApiUser";
import ToggleInput from "../components/register&login/ToggleInput";
import RegisterBtn from "../components/btn";
import ErrorBar from "../components/ErrorBar";
import "../style/pages/Login.css"
import { useState } from "react";

const schema = z.object({
    name: z.string({required_error:"Porfavor complete este campo"}).min(3,{message:"Porfavor complete este campo"}),
    email: z.string().email({message:"Porfavor complete este campo"}).regex(/^[\w-\\.]+@([\w-]+\.)+[\w-]{2,4}$/),
    password: z.string().min(8,{message:"La contraseña debe contener al menos 8 caracteres"}).regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,{message:"La contraseña debe contener al menos una letra mayúscula, una letra minúscula y un número"}),
    repeatPassword: z.string().min(8)

}).refine((data) => data?.password === data?.repeatPassword, {
    message: "Las contrasenas no coinciden",
    path: ["repeatPassword"]
})


const Register = () => {
    const {handleSubmit,register,formState:{errors}} = useForm({resolver:zodResolver(schema)})
    const {register:createUser} = useApiUser()
    const [error,setError]= useState({type:"",message:""})

    const onSubmit = async (data) => {
        const {status} = await createUser(data)
        if(status === 200) {
            setError({type:"create",message:"Cuenta creada exitosamente, Redirigiendo..."});
            const timer = setTimeout(() => {
                setError({type:"",message:""})
                window.location.href = "/login"
            },3500)

            return () => clearTimeout(timer)
        } 
            
        
        setError({type:"error",message:"El usuario ya existe"})
        const timer = setTimeout(() => {
            setError({type:"",message:""})
        },3500)
        return () => clearTimeout(timer)
      };

    if(!register) return null;
    
  return (
    <section className="section__login">
        <ErrorBar  message={error.message} type={error.type}/>
        <form onSubmit={handleSubmit(onSubmit)}  className="form">
            <div className="form__input-container">
                <label htmlFor="name" className="form__label">Nombre de usuario</label>
                <input type="text" id="name" {...register("name")} name="name" className="form__input"/>
                {errors?.name && <p className="form__input-error">{errors.name?.message}</p>}
            </div>
            <div className="form__input-container">
                <label htmlFor="email" className="form__label">Email</label>

                <input type="email" id="email" {...register("email")} name="email" className="form__input"/>

                {errors?.email && <p className="form__input-error">{errors.email?.message}</p>}
            </div>
            <div className="form__input-container">
                <label htmlFor="password" className="form__label">Contraseña</label>

                <ToggleInput id="password" name="password" {...register("password")}/>
                {errors?.password && <p className="form__input-error">{errors.password?.message}</p>}
            </div>
            <div className="form__input-container">
                <label htmlFor="repetirContraseña" className="form__label">Repetir Contraseña</label>
                
                <ToggleInput id="repetirContraseña" name="repeatPassword" {...register("repeatPassword")}/>

                {errors?.repeatPassword && <p className="form__input-error">{errors.repeatPassword?.message}</p>}
            </div>
            <RegisterBtn text="Crear Cuenta" type="submit"/>
            <p className="form__register">¿Ya tienes una cuenta? <a href="/login" className="form__register-link">Inicia sesión</a></p>
        </form>
    </section>
  )
}

export default Register
