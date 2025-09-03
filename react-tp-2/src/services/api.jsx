import axios from "axios";

export const api = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com', // API de test gratuite
    timeout: 10000, // 10 secondes de timeout
    headers: {
        'Content-Type': 'application/json'
    }
});