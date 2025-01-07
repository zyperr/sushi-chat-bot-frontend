import "../style/pages/LogOut.css"
import {useApiUser} from "../hooks/useApiUser"
export const LogOut = () => {
    const {logout} = useApiUser()
    logout()
  return (
    <section className="section__logout">
        <article className="logout">
            <h2 className="logout__title">Sesión cerrada exitosamente</h2>
            <p className="logout__text">
                Estas siendo redirigido a la pagina de login
            </p>
        </article>
    </section>
  )
}
