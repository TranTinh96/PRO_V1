import io from "socket.io-client";
const socket = io("https://tnt-iot.herokuapp.com"); 
export default socket;