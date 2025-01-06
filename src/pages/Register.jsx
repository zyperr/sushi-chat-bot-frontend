import {useForm} from "react-hook-form"
import z from "zod"
import {zodResolver} from "@hookform/resolvers/zod"
import { LuEyeClosed,LuEye } from "react-icons/lu";
import { useState } from "react";
import "../style/pages/Login.css"


const schema = z.object({
    name: z.string({required_error:"Porfavor complete este campo"}).min(3,{message:"Porfavor complete este campo"}),
    email: z.string().email({message:"Porfavor complete este campo"}).regex(/^[\w-\\.]+@([\w-]+\.)+[\w-]{2,4}$/),
    password: z.string().min(8,{message:"La contraseña debe contener al menos 8 caracteres"}).regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,{message:"La contraseña debe contener al menosuna letra mayúscula, una letra minúscula y un número"}),
    repeatPassword: z.string().min(8)

}).refine((data) => data?.password === data?.repeatPassword, {
    message: "Las contrasenas no coinciden",
    path: ["repeatPassword"]
})

const Register = () => {
    const {handleSubmit,register,formState:{errors}} = useForm({resolver:zodResolver(schema)})
    const [showPassword, setShowPassword] = useState(false);

    const onSubmit = (data) => {
        console.log('Form Data:', data);
      };
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    }
    if(!register) return null;
    
  return (
    <section className="section__login">
        <form onSubmit={handleSubmit(onSubmit)} className="form">
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
                <label htmlFor="contraseña" className="form__label">Contraseña</label>
                <input type={showPassword ? "text" : "password"} id="contraseña" name="password" {...register("password")} className="form__input"/>
                {showPassword ? <LuEye className="form__input-icon" onClick={togglePasswordVisibility} /> : <LuEyeClosed className="form__input-icon" onClick={togglePasswordVisibility} />}
                {errors?.password && <p className="form__input-error">{errors.password?.message}</p>}
            </div>
            <div className="form__input-container">
                <label htmlFor="repetirContraseña" className="form__label">Repetir Contraseña</label>
                <input type={showPassword ? "text" : "password"} id="repetirContraseña" name="password" {...register("repeatPassword")} className="form__input"/>
                {errors?.repeatPassword && <p className="form__input-error">{errors.repeatPassword?.message}</p>}
            </div>
            <p className="form__register">¿Ya tienes una cuenta? <a href="/login" className="form__register-link">Inicia sesión</a></p>
            <button type="submit">Iniciar sesión</button>
        </form>
    </section>
  )
}

export default Register
