// ! Backend API not fully implemented, so this test is expected to fail until the feed endpoint is ready.
import http from 'k6/http';
import { check, sleep } from 'k6';
const BASE_URL = 'http://localhost:8080/api/v1'; 

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
            identifier: 'listener4@example.com', password: 'Listener1234!'
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

    const response = http.get(`${BASE_URL}/feed`, {
        headers: {
        'Authorization': `Bearer ${tokens[__VU]}`,
        },
    });

    check(response, {
        'status is 200':       (r) => r.status === 200,
        'has data':            (r) => JSON.parse(r.body).data !== undefined,
        'no 500 server error': (r) => r.status !== 500,
    });

    sleep(1);
}
