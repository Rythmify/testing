import http from 'k6/http';
import { check, sleep } from 'k6';

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

export default function () {
    const payload = JSON.stringify({
        identifier: 'listener4@example.com', password: 'Listener1234!'
    });
    const response = http.post('http://localhost:8080/api/v1/auth/login', payload, {
        headers: {
            'Content-Type': 'application/json',
        }
    });
    console.log('login status: ' + response.status);
    console.log('login body: ' + response.body);
    check(response, {
        'status is 200':  (r) => r.status === 200,
        'has access token': (r) => JSON.parse(r.body).data?.access_token !== undefined,
    });
    sleep(1);
}