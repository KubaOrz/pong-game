import { constants } from "../Constants/constants";

const Timer = ({ seconds }) => {
    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
      
        const formattedMinutes = minutes > 0 ? `${minutes} m` : '';
        const formattedSeconds = `${remainingSeconds} s`;
      
        return `${formattedMinutes} ${formattedSeconds}`;
      };      

    return (
        <div style={{textAlign: 'right', height: constants.fieldTopOffset}}>
            Time: {formatTime(seconds)}
        </div>
    )
}

export default Timer;