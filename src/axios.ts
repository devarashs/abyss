import axios from 'axios';

const api = import.meta.env.VITE_API || 'https://abyssapi.chill-hub.net';
axios.defaults.baseURL = api;
export default axios;
