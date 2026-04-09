import http from 'k6/http';
import { check, sleep } from 'k6';

const BASE_URL = 'http://localhost:8080/api/v1';

const USERS = [
    { identifier: 'mo.khaled@example.com', password: 'Password123!' },
    { identifier: 'fatma.nasser@example.com', password: 'Password123!' },
];

const TRACK_IDS = [
    'a05375dc-0833-40ea-a8c8-70dac4eb46e1'
    // '2e9e1e3d-1db9-461a-a928-5e313d6707e4', 
    // '4a9856a3-0331-4a81-84c3-669fd1dd7aeb', 
    // 'df79c985-2996-4093-8d42-31fb2d93604f', 
];

export const options = {
    stages: [
        { duration: '1m', target: 100 },
        { duration: '3m', target: 200 },
        { duration: '1m', target: 300 },
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

    const trackId = TRACK_IDS[(__VU - 1) % TRACK_IDS.length];

    const response = http.post(
        `${BASE_URL}/tracks/${trackId}/play`,
        null,
        { headers: { 'Authorization': `Bearer ${tokens[__VU]}` } }
    );
    console.log('play status: ' + response.status);
    console.log('play body: ' + response.body);
    check(response, {
        'status is 200':        (r) => r.status === 200,
        'has state':            (r) => { try { return JSON.parse(r.body).data.state !== undefined; } catch(e) { return false; } },
        'has stream_url':       (r) => { try { return JSON.parse(r.body).data.stream_url !== null; } catch(e) { return false; } },
        'no 500 server error':  (r) => r.status !== 500,
        'no 404 not found':     (r) => r.status !== 404,
    });

    sleep(1);
}