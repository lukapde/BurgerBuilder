import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-my-burger-ff2f4.firebaseio.com/'
});

export default instance;