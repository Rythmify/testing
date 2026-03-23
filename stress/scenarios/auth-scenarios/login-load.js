import http from 'k6/http';
import { check, sleep } from 'k6';

const BASE_URL = 'http://localhost:8080/api/v1';

export const options = {
    stages: [
        { duration: '2m',  target: 30 }, // ramp up slowly
        { duration: '10m', target: 30 }, // hold normal load for 10 minutes
        { duration: '2m',  target: 0  }, // ramp down
    ],
    thresholds: {
        http_req_duration: ['p(95)<500'], // strict threshold — normal load
        http_req_failed:   ['rate<0.01'],
    },
};

const USERS = [
    { identifier: 'listener1@example.com', password: 'Listener1234!' },
    { identifier: 'listener2@example.com', password: 'Listener1234!' },
    { identifier: 'listener3@example.com', password: 'Listener1234!' },
    { identifier: 'listener4@example.com', password: 'Listener1234!' },
    { identifier: 'listener5@example.com', password: 'Listener1234!' },
];

export default function () {
    const user = USERS[__VU % USERS.length];

    const response = http.post(
        `${BASE_URL}/auth/login`,
        JSON.stringify({
        identifier: user.identifier,
        password:   user.password,
        }),
        { headers: { 'Content-Type': 'application/json' } }
    );

    check(response, {
        'status is 200':    (r) => r.status === 200,
        'has access token': (r) => {
        try { return JSON.parse(r.body).data?.access_token !== undefined; }
        catch(e) { return false; }
        },
        'no 500 error':     (r) => r.status !== 500,
    });

    sleep(1);
}