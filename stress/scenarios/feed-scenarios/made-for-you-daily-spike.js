import http from 'k6/http';
import { check, sleep } from 'k6';

const BASE_URL = 'http://localhost:8080/api/v1';

const USERS = [
    { identifier: 'mo.khaled@example.com',    password: 'Password123!' },
    { identifier: 'fatma.nasser@example.com', password: 'Password123!' },
];

export const options = {
    stages: [
        { duration: '10s', target: 0   }, // start at 0
        { duration: '30s', target: 500 }, // instant spike to 500 users
        { duration: '1m',  target: 500 }, // hold the spike
        { duration: '30s', target: 0   }, // drop back to 0
    ],
    thresholds: {
        http_req_duration: ['p(95)<2000'], // higher threshold for spike
        http_req_failed:   ['rate<0.05'],  // allow 5% failure under spike
    },
};

const tokens = {};

export default function () {
    if (!tokens[__VU]) {
        const user = USERS[__VU % USERS.length];
        const loginRes = http.post(
            `${BASE_URL}/auth/login`,
            JSON.stringify({ identifier: user.identifier, password: user.password }),
            { headers: { 'Content-Type': 'application/json' } }
        );
        if (loginRes.status !== 200) { sleep(1); return; }
        tokens[__VU] = JSON.parse(loginRes.body).data.access_token;
    }

    const response = http.get(`${BASE_URL}/home/made-for-you/daily`, {
        headers: { 'Authorization': `Bearer ${tokens[__VU]}` },
    });

    console.log('home status: ' + response.status);
    console.log('home body: ' + response.body);

    const body = (() => {
        try { return JSON.parse(response.body); }
        catch (e) { return null; }
    })();

    check(response, {
        'status is 200':              (r) => r.status === 200,
        'has mix_id':                 (_) => body?.data?.mix_id === 'daily_drops',
        'has title':                  (_) => body?.data?.title === 'Daily Drops',
        'has tracks':                 (_) => Array.isArray(body?.data?.tracks),
        'has at least one track':     (_) => Array.isArray(body?.data?.tracks) && body.data.tracks.length > 0,
        'no 500 server error':        (r) => r.status !== 500,
    });

    sleep(1);
}