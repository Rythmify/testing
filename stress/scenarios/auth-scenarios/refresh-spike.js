import http from 'k6/http';
import { check, sleep } from 'k6';

const BASE_URL = 'http://localhost:8080/api/v1';

export const options = {
    stages: [
        { duration: '10s', target: 0   },
        { duration: '30s', target: 500 },
        { duration: '1m',  target: 500 },
        { duration: '30s', target: 0   },
    ],
    thresholds: {
        http_req_duration: ['p(95)<2000'],
        http_req_failed:   ['rate<0.05'],
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

  // login only once per VU
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