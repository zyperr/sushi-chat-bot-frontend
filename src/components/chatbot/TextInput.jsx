import { forwardRef } from "react";
import { FaArrowRight } from "react-icons/fa";
import "../../style/components/chatbot/TextInput.css"

const TextInput = forwardRef(({onChangeHandler,sendMessage},ref) => {
  return (
    <footer className="footer__container">
      <input 
      type="text" 
      placeholder='¡Intenta pidiendo el menu!'
      className="footer__input"
      onChange={onChangeHandler}
      />
      <button className="footer__button" onClick={sendMessage}>
        <FaArrowRight  className="footer__button-icon"/>
      </button>
    </footer>
  )
}) 

export default TextInput