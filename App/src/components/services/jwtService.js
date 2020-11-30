import axios from "axios";

export default function setAuthorizationToken(jwt){
    axios.defaults.headers.common['Authorization'] = '';
    delete axios.defaults.headers.common['Authorization'];
    if(jwt){
        axios.defaults.headers.common['Authorization'] = `Bearer ${jwt}`;
    }
}