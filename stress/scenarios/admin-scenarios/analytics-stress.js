// ! Backend API not fully implemented, so this test is expected to fail until the analytics endpoint is ready.
import http from 'k6/http';
import { check, sleep } from 'k6';
export const BASE_URL = 'https://rythmify-backend-dev.livelypebble-6b7965ef.uaenorth.azurecontainerapps.io/api/v1'; 

export const options = {
    stages: [
        { duration: '1m', target: 50}, // ramp up to 50 users over 1 minute
        { duration: '3m', target: 100}, // stay at 100 users for 3 minutes
        { duration: '1m', target: 150}, // ramp up to 150 users over 1 minute
        { duration: '2m', target: 0} // ramp down to 0 users over 2 minutes
    ],
    thresholds: {
        http_req_duration: ['p(95)<500'], 
        http_req_failed: ['rate<0.01'],
    },
};

const tokens = {};

export default function () {

    if (!tokens[__VU]) {
        const response = http.post(
        `${BASE_URL}/auth/login`,
        JSON.stringify({
            identifier: 'admin@rythmify.com', password: 'admin'
        }),
        { headers: { 'Content-Type': 'application/json' } }
        );

        if (response.status !== 200) {
        console.error('Login failed: ' + response.status);
        sleep(1);
        return;
        }

        tokens[__VU] = JSON.parse(response.body).data.access_token;
    }

    console.log('login status: ' + response.status);
    console.log('login body: ' + response.body);
    
    const response = http.get(
    `${BASE_URL}/admin/analytics`,
    {
        headers: {
            'Authorization': `Bearer ${tokens[__VU]}`,
        },
        }
    );

    console.log('analytics status: ' + response.status);
    console.log('analytics body: ' + response.body);

    check(response, {
        'status is 200':            (r) => r.status === 200,
        'no 400 validation error':  (r) => r.status !== 400,
        'no 401 unauthorized':      (r) => r.status !== 401,
        'no 403 forbidden':         (r) => r.status !== 403,
        'no 500 server error':      (r) => r.status !== 500,
        'has data':                 (r) => {
            try { return JSON.parse(r.body).data !== undefined; }
            catch(e) { return false; }
        },  
    });

    sleep(1);
}