import axios from 'axios';

//this utility will add authorized user's jwt to the request header

const setAuthToken = (token:string) => {
    if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
        delete axios.defaults.headers.common['Authorization'];
    };
};
export default setAuthToken;