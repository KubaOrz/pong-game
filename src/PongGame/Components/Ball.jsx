import { constants } from "../Constants/constants";

const Ball = ({ ballPosition }) => {

    return (
        <div style={{
            position: "absolute",
            top: `${ballPosition.y}px`,
            left: `${ballPosition.x}px`,
            width: `${constants.ballSize}px`,
            height: `${constants.ballSize}px`,
            borderRadius: '50%',
            background: "#000",
        }}>

        </div>
    )
}

export default Ball;