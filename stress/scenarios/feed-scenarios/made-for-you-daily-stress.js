import http from 'k6/http';
import { check, sleep } from 'k6';

const BASE_URL = 'http://localhost:8080/api/v1';

const USERS = [
    { identifier: 'mo.khaled@example.com',    password: 'Password123!' },
    { identifier: 'fatma.nasser@example.com', password: 'Password123!' },
];

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