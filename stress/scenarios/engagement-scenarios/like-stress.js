// ! Backend API not fully implemented, so this test is expected to fail until the like endpoint is ready.
import http from 'k6/http';
import { check, sleep } from 'k6';
import http from 'k6/http';
import { BASE_URL } from '../notifications-scenarios/notifications-stress';
const BASE_URL = 'http://localhost:8080/api/v1'; 
const trackId = ['d1000000-0000-0000-0000-000000000002']; //TODO : replace with actual track ID from the global database
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
        const loginResponse = http.post(
        `${BASE_URL}/auth/login`,
        JSON.stringify({
            identifier: 'listener4@example.com', //TODO : replace with actual user email from the global database
            password: 'Listener1234!', //TODO : replace with actual user password from the global database
        }),
        { headers: { 'Content-Type': 'application/json' } }
        );

        if (loginResponse.status !== 200) {
        console.error('Login failed: ' + loginResponse.status);
        sleep(1);
        return;
        }

        tokens[__VU] = JSON.parse(loginResponse.body).data.access_token;
    }
    console.log('login status: ' + loginResponse.status); //TODO : move this log statement inside the if block where loginResponse is defined to avoid reference error
    console.log('login body: ' + loginResponse.body); //TODO : move this log statement inside the if block where loginResponse is defined to avoid reference error

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
        'status is 200':       (r) => r.status === 200,
        'status is 201':       (r) => r.status === 201,
        'no 500 server error': (r) => r.status !== 500,
        'no 409 conflict':     (r) => r.status !== 409,
    });

    sleep(1);
}