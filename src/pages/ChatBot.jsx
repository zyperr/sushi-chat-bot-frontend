import ChatBuble from "../components/chatbot/ChatBuble"
import TextInput from "../components/chatbot/TextInput"
import "../style/pages/ChatBot.css"

export const ChatBot = () => {
  return (
    <section className="section__chat">
        <div className="chat__container">
          <ChatBuble text="hola" type="user" />
          <ChatBuble text="Hola buenas" type="bot" />
          </div> 
        <TextInput/>
    </section>
    )
}
