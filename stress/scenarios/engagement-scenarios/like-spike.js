import http from 'k6/http';
import { check, sleep } from 'k6';
const BASE_URL = 'https://rythmify-backend-dev.livelypebble-6b7965ef.uaenorth.azurecontainerapps.io/api/v1'; 
const trackId = ['3eaab4b9-4412-41bc-8a42-9bbbde9f418c']; 
export const options = {
    stages: [
        { duration: '10s', target: 5   },
        { duration: '30s', target: 200 }, 
        { duration: '1m',  target: 5   }, 
        { duration: '30s', target: 0   }, 
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


    const likeResponse = http.post(`${BASE_URL}/tracks/${trackId}/like`, null, {
        headers: {
        'Authorization': `Bearer ${tokens[__VU]}`,
        'Content-Type': 'application/json',
        },
    });
    console.log('like status: ' + likeResponse.status);
    console.log('like body: ' + likeResponse.body);

    http.del(
        `${BASE_URL}/tracks/${trackId}/like`,
        null,
        {
        headers: {
            'Authorization': `Bearer ${tokens[__VU]}`,
            'Content-Type': 'application/json',
        },
        }
    );

    check(likeResponse, {
        'is status 200 or 201': (r) => r.status === 200 || r.status === 201,
        'no 401 unauthorized':       (r) => r.status !== 401,
        'no 403 not allowed action':    (r) => r.status !==403,
        'no 404 not found':          (r) => r.status !== 404,
        'no 500 server error': (r) => r.status !== 500,
        'no 409 conflict':     (r) => r.status !== 409,
        'has valid body':            (r) => {
            try { return JSON.parse(r.body).message !== undefined; }
            catch(e) { return false; }
        },
    });

    sleep(1);
}