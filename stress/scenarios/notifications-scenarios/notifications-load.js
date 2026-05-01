import http from 'k6/http';
import { check, sleep } from 'k6';

export const BASE_URL = 'https://rythmify-backend-dev.livelypebble-6b7965ef.uaenorth.azurecontainerapps.io/api/v1'; 


export const options = {
    stages: [
        { duration: '10s', target: 0 },
        { duration: '30s', target: 300 },
        { duration: '1m', target: 300 },
        { duration: '30s', target: 0 },
    ],
    thresholds: {
        http_req_duration: ['p(95)<2000'],
        http_req_failed: ['rate<0.05'],
    },
};



const tokens = {};

export default function () {

    if (!tokens[__VU]) {
        const loginResponse = http.post(
        `${BASE_URL}/auth/login`,
        JSON.stringify({
            identifier: 'yoeweida@gmail.com',
            password: 'Yomna1234',
        }),
        { headers: { 'Content-Type': 'application/json' } }
        );

        if (loginResponse.status !== 200) {
        console.error('Login failed: ' + loginResponse.status);
        sleep(1);
        return;
        }

        console.log('login status: ' + loginResponse.status);
        console.log('login body: ' + loginResponse.body);
        tokens[__VU] = JSON.parse(loginResponse.body).data.access_token;
    }
    
    const response = http.get(`${BASE_URL}/notifications`, {
        headers: {
        'Authorization': `Bearer ${tokens[__VU]}`,
        },
    });

    console.log('notifications status: ' + response.status);
    console.log('notifications body: ' + response.body);

    check(response, {
        'status is 200':               (r) => r.status === 200,
        'no 401 unauthorized':         (r) => r.status !== 401,
        'no 500 server error':         (r) => r.status !== 500,
        'has items array':             (r) => {
            try { return Array.isArray(JSON.parse(r.body).data.items); }
            catch(e) { return false; }
        },
        'has unread count':            (r) => {
            try { return JSON.parse(r.body).data.unread_count !== undefined; }
            catch(e) { return false; }
        },
        'has message field':           (r) => {
            try { return JSON.parse(r.body).message !== undefined; }
            catch(e) { return false; }
        },

    });

    sleep(1);
}