import moment from 'moment';
import './Message.css';

interface IProps {
  data: any
  isMine: boolean
  startsSequence: boolean
  endsSequence: boolean
  showTimestamp: boolean
}
export default function Message(props: IProps) {
    const {
      data,
      isMine,
      startsSequence,
      endsSequence,
      showTimestamp
    } = props;

    const friendlyTimestamp = moment(data.timestamp).format('LLLL');
    return (
      <div className={[
        'message',
        `${isMine ? 'mine' : ''}`,
        `${startsSequence ? 'start' : ''}`,
        `${endsSequence ? 'end' : ''}`
      ].join(' ')}>
        {
          showTimestamp &&
            <div className="timestamp">
              { friendlyTimestamp }
            </div>
        }

        <div className="bubble-container">
          <div className="bubble" title={friendlyTimestamp}>
            { data.message }
            { data?.author === "typing" &&  
              <div className="typing">
                <span></span>
                <span></span>
                <span></span>
              </div>
            }
          </div>
        </div>
      </div>
    );
}