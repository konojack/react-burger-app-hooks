import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-burger-appp.firebaseio.com/'
})

export default instance;