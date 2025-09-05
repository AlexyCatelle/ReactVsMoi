import axios from 'axios';

// Configuration de base
export const api = axios.create({
    baseURL: 'https://tyradex.vercel.app/api/v1/', // API pokemon
    timeout: 10000, // 10 secondes de timeout
    headers: {
        'Content-Type': 'application/json'
    }
})