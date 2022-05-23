import './Compose.css';
import {useState} from 'react';

export default function Compose({ onSend, rightItems, ...rest } : { onSend: any, rightItems: any }) {
  const [message, setMessage] = useState("")

  const onKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if(e?.key === "Enter") {
      onSend(message)
      setMessage("")
    }
  }

  return (
    <div className="compose">
      <input
        type="text"
        className="compose-input"
        placeholder="Type a message, @name"
        value={message}
        onChange={(e) => setMessage(e?.target?.value)}
        onKeyUp={onKeyUp}
        {...rest}
      />

      {
        rightItems
      }
    </div>
  );
}