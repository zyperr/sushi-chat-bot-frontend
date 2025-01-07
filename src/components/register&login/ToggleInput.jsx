import {forwardRef,useState} from 'react'
import { LuEyeClosed,LuEye } from "react-icons/lu";


const ToggleInput = forwardRef(({...rest},ref) => {
    const [showPassword, setShowPassword] = useState(false);
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    }
    return (
        <>
            <input {...rest} ref={ref} className="form__input" type={showPassword ? `text` : `password`} />
                            
             {showPassword ? <LuEye className="form__input-icon" onClick={togglePasswordVisibility} /> : <LuEyeClosed className="form__input-icon" onClick={togglePasswordVisibility} />}
        </>
    )

})



export default ToggleInput