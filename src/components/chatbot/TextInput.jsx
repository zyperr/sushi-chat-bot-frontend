import "../../style/components/chatbot/TextInput.css"
import { FaArrowRight } from "react-icons/fa";

const TextInput = () => {
  return (
    <footer className="footer__container">
      <input 
      type="text" 
      placeholder='¡Intenta pidiendo el menu!'
      className="footer__input"
      />
      <button className="footer__button">
        <FaArrowRight  className="footer__button-icon"/>
      </button>
    </footer>
  )
}

export default TextInput