import { constants } from "../Constants/constants";

const Paddle = ({ hPosition, paddlePosition }) => {
    return (
        <div
            style={{
            position: "absolute",
            top: `${paddlePosition}px`,
            left: `${hPosition}px`,
            width: "5px",
            height: `${constants.paddleHeight}px`,
            background: "#000",
            }}
        ></div>
    )
}

export default Paddle;