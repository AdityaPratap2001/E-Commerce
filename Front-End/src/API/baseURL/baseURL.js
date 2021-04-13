import axios from 'axios';

const instance = axios.create(
    {
        // baseURL: "http://91d7ddfbae13.ngrok.io"
        baseURL: "http://localhost:8080"
        // baseURL: "http://445a2038d9d1.ngrok.io"
        // baseURL: "http://1779ff5e5c3d.ngrok.io"
    }
);

export default instance;