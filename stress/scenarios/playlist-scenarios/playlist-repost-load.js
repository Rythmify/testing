import http from 'k6/http';
import { check, sleep } from 'k6';
export const BASE_URL = 'http://localhost:8080/api/v1';

export const options = {
    stages: [
        { duration: '2m', target: 30 },
        { duration: '10m', target: 30 },
        { duration: '2m', target: 0 },
    ],
    thresholds: {
        http_req_duration: ['p(95)<1000'],
        http_req_failed: ['rate<0.01'],
    },
};

export const playlistId = [''];

const tokens = {};

export default function () {

    if (!tokens[__VU]) {
        const loginResponse = http.post(
            `${BASE_URL}/auth/login`,
            JSON.stringify({
                identifier: 'mo.khaled@example.com',
                password: 'Password123!',
            }),
            { headers: { 'Content-Type': 'application/json' } }
        );

        if (loginResponse.status !== 200) {
            console.error('Login failed: ' + loginResponse.status);
            sleep(1);
            return;
        }
        console.log('login status: ' + loginResponse.status);
        console.log('login body: ' + loginResponse.body);

        tokens[__VU] = JSON.parse(loginResponse.body).data.access_token;
    }

    const playlistId = playListIds[__VU % playListIds.length];
    const response = http.post(
        `${BASE_URL}/playlists/${playlistId}/repost`,
        null,
        {
            headers: {
                'Authorization': `Bearer ${tokens[__VU]}`,
                'Content-Type': 'application/json',
            },
        }
    );
    console.log('repost status: ' + response.status);
    console.log('repost body: ' + response.body);
    check(response, {
        'status is 200 or 201':       (r) => r.status === 200 || r.status === 201,
        'not own playlist (no 400)':  (r) => r.status !== 400,
        'no 500 server error':        (r) => r.status !== 500,
        'no 404 not found':           (r) => r.status !== 404,
        'no 401 unauthorized':        (r) => r.status !== 401,
        'has valid body':             (r) => {
            try { return JSON.parse(r.body).message !== undefined; }
            catch(e) { return false; }
        },
    });

    sleep(1);
}