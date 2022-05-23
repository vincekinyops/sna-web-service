import {useEffect, useState} from 'react';
import axios from "axios"
import Compose from 'components/Compose';
import Message from 'components/Message';
import moment from 'moment';

import './MessageList.css';

const MY_USER_ID = 'apple';

type MESSAGE = {
  id: number 
  author: string 
  message: string 
  timestamp: number
}
export default function MessageList() {
  const [messages, setMessages] = useState<MESSAGE[]>([])

  useEffect(() => {
    axios.get("https://v2.jokeapi.dev/joke/Programming")
    .then((response) => {
      if(response?.data?.delivery) {
        setMessages([{
          id: new Date().getTime(),
          author: 'orange',
          message: response?.data?.delivery,
          timestamp: new Date().getTime()
        }])
      }
    }).catch(() => {})
  }, [])

  const renderMessages = () => {
    let i = 0;
    let messageCount = messages.length;
    let tempMessages = [];

    while (i < messageCount) {
      let previous = messages[i - 1];
      let current = messages[i];
      let next = messages[i + 1];
      let isMine = current.author === MY_USER_ID;
      let currentMoment = moment(current.timestamp);
      let prevBySameAuthor = false;
      let nextBySameAuthor = false;
      let startsSequence = true;
      let endsSequence = true;
      let showTimestamp = true;

      if (previous) {
        let previousMoment = moment(previous.timestamp);
        let previousDuration = moment.duration(currentMoment.diff(previousMoment));
        prevBySameAuthor = previous.author === current.author;
        
        if (prevBySameAuthor && previousDuration.as('hours') < 1) {
          startsSequence = false;
        }

        if (previousDuration.as('hours') < 1) {
          showTimestamp = false;
        }
      }

      if (next) {
        let nextMoment = moment(next.timestamp);
        let nextDuration = moment.duration(nextMoment.diff(currentMoment));
        nextBySameAuthor = next.author === current.author;

        if (nextBySameAuthor && nextDuration.as('hours') < 1) {
          endsSequence = false;
        }
      }

      tempMessages.push(
        <Message
          key={i}
          isMine={isMine}
          startsSequence={startsSequence}
          endsSequence={endsSequence}
          showTimestamp={showTimestamp}
          data={current}
        />
      );

      // Proceed to the next message.
      i += 1;
    }

    return tempMessages;
  }

  const getAdvice = (keyword: string) => {
    return new Promise((resolve) => {
      axios.get(`https://api.adviceslip.com/advice/search/${keyword}`)
      .then((response) => {
        if(response?.data?.slips) {
          resolve(response?.data?.slips[0])
        } else {
          resolve([])
        }
      }).catch((e) => {

      })
    })
  }

  const handleSend = async (value: string) => {
    let words = value.match(/("[^"]+"|[^"\s]+)/g);
    setMessages([...messages, 
      {
        id: new Date().getTime(),
        author: 'apple',
        message: value,
        timestamp: new Date().getTime()
      },
    ])

    setMessages(prevState => [...prevState, 
      {
        id: new Date().getTime(),
        author: 'typing',
        message: "",
        timestamp: new Date().getTime()
      },
    ])
    let getAdvices: any = words?.map((word) => {
      return getAdvice(word)
    })
    
    let all = await Promise.all(getAdvices)

    let str: string = ''
    all.forEach((advice: any) => {
      if(advice?.advice) {
        str = `${str} ${advice?.advice} `
      } 
    })

    setMessages(prevState => [
      ...prevState.slice(0, prevState.length - 1),
      {
        id: new Date().getTime(),
        author: 'orange',
        message: str,
        timestamp: new Date().getTime()
      }
    ])
  }

  return(
    <div className="message-list">
      <div className="message-list-container">{renderMessages()}</div>

      <Compose 
        rightItems={[
          <i key="one" className={`toolbar-button ion-ios-happy`} />
        ]}
        onSend={handleSend}
      />
    </div>
  );
}