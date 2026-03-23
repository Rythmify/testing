import http from 'k6/http';
import { check, sleep } from 'k6';

const BASE_URL = 'http://localhost:8080/api/v1';

export const options = {
    stages: [
        { duration: '1m', target: 50  },
        { duration: '3m', target: 100 },
        { duration: '1m', target: 150 },
        { duration: '2m', target: 0   },
    ],
    thresholds: {
        http_req_duration: ['p(95)<500'],
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

const tokens = {};

function extractRefreshToken(setCookieHeader) {
    const match = setCookieHeader && setCookieHeader.match(/refresh_token=([^;]+)/);
    return match ? match[1] : null;
}

export default function () {

    if (!tokens[__VU]) {
        const user = USERS[__VU % USERS.length];

        const loginRes = http.post(
        `${BASE_URL}/auth/login`,
        JSON.stringify({
            identifier: user.identifier,
            password:   user.password,
        }),
        { headers: { 'Content-Type': 'application/json' } }
        );

        if (loginRes.status !== 200) {
        sleep(1);
        return;
        }

        const token = extractRefreshToken(loginRes.headers['Set-Cookie']);
        if (!token) {
        sleep(1);
        return;
        }

        tokens[__VU] = token;
    }

    // call refresh every iteration using stored token
    const response = http.post(
        `${BASE_URL}/auth/refresh`,
        null,
        {
        headers: {
            'Content-Type': 'application/json',
            'Cookie': `refresh_token=${tokens[__VU]}`,
        },
        }
    );

    // update token after rotation
    const newToken = extractRefreshToken(response.headers['Set-Cookie']);
    if (newToken) tokens[__VU] = newToken;

    check(response, {
        'status is 200':        (r) => r.status === 200,
        'has new access_token': (r) => {
        try { return JSON.parse(r.body).data?.access_token !== undefined; }
        catch(e) { return false; }
        },
        'no 500 error':         (r) => r.status !== 500,
    });

    sleep(1);
}