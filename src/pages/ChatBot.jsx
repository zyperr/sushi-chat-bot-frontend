import ChatBuble from "../components/chatbot/ChatBuble"
import TextInput from "../components/chatbot/TextInput"
import { useApiUser } from "../hooks/useApiUser"
import { useEffect, useState } from "react"
import CardProduct from "../components/menu/CardProduct"
import PageBtn from "../components/btn"
import "../style/pages/ChatBot.css"

export const ChatBot = ({userData}) => {
  const [message,setMessage] = useState("")
  const [chat,setChat] = useState([])
  const token = localStorage.getItem('user-token');
  const {chatBot} = useApiUser()

  const onChangeHandler = (e) => {
    setMessage(e.target.value)
  }
  const sendMessage = async () => {
    const data = await chatBot(message,token)
    const userData = {message:message,type:"user"}
    const botData = {message:data.botResponse,type:"bot",products:data?.data}
    setChat([botData,userData,...chat])
  }
  useEffect(() => {
    const handleData = async () => {
      const data = await chatBot("hola",token)
      const botData = {message:data.botResponse,type:"bot"}
      setChat([botData])
    }
    handleData()
  },[])


  return (
      userData ? (
      <section className="section__chat">
          <div className="chat__container">
              {
                chat.map((item,index) => (
                  <>
                    {
                      <div key={`${item.message}-${index-1}`}  className="chat__products">
                        <div className="chat__products-container">
                              {
                                  item?.products?.map(({_id,name,price,picture,pieces}) => {
                                    return (
                                        <CardProduct  key={_id} name={name} picture={picture} price={price} pieces={pieces}/>
                                    )
                                  })                        
                              }
                        </div>
                      </div>
                    }
                    <ChatBuble key={`${item.message}-${index}`} text={item.message} type={item.type}/>
                  </>
                ))
              }
            </div> 
          <TextInput onChangeHandler={onChangeHandler} sendMessage={sendMessage}/>
      </section>
    ) : (
      <section className="section__chat-not-auth">
          <div className="chat__container">
            <h2 className="chat__title">Inicia sesion para hablar con el bot <span className="chat__title-span">👋</span></h2>
            <p className="chat__text">Si no tienes una cuenta <a href="/register">registrate</a>
            </p>
            <p className="chat__text">
              Si ya tienes una cuenta <a href="/login">Inicia sesion aqui</a>
            </p>
          </div> 
      </section>
    )
    
    )
}
