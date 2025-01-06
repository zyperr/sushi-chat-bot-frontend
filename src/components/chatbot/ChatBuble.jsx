import "../../style/components/chatbot/ChatBubble.css"
const ChatBuble = ({text,type}) => {
  return (
    <article className={`chat-bubble ${type}`} >
        <p className={`chat-bubble-text ${type}`}>{text}</p>
    </article>
  )
}

export default ChatBuble
