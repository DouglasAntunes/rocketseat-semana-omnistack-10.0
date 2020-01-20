import axios from 'axios';

export const backendAddress = 'http://10.0.2.2:3333'; //Android Localhost
// export const backendAddress = 'http://192.168.105.100:3333'; //LAN

const api = axios.create({
    baseURL: backendAddress,
});

export default api;
