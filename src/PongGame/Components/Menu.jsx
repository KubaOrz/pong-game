import { constants } from "../Constants/constants";

const Menu = ({ score, onPause, paused, onRestart }) => {

    return (
        <div style={{
                justifyContent: 'space-between', 
                direction: 'column', 
                display: 'flex',
                width: `${constants.fieldWidth}`
            }}>
            <button onClick={onPause} style={{
                width: '70px',
                height: '25px'
            }}>
                {paused ? 'Start' : 'Pause'}
            </button>
            <div>
                {score.leftPlayer} : {score.rightPlayer}
            </div>
            <button onClick={onRestart}style={{
                width: '70px',
                height: '25px'
            }}>
                Restart
            </button>
        </div>
    )
}

export default Menu;