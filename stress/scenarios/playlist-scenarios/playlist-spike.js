import http from 'k6/http';
import { check, sleep } from 'k6';
export const BASE_URL = 'http://localhost:8080/api/v1'; 

export const options = {
	stages: [
		{ duration: '10s', target: 0 },
		{ duration: '30s', target: 300 },
		{ duration: '1m', target: 300 },
		{ duration: '30s', target: 0 },
	],
	thresholds: {
		http_req_duration: ['p(95)<2000'],
		http_req_failed: ['rate<0.05'],
	},
};
export const playListIds = [
    'b903ac71-d18e-42c5-81e3-0cff4ff7c615',
]

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

    const playlistId = playListIds[__VU % playListIds.length]
    const response = http.get(
        `${BASE_URL}/playlists/${playlistId}`,
        {
            headers: {
                'Authorization': `Bearer ${tokens[__VU]}`,
            },
            }
        );
        console.log('playlist status: ' + response.status);
        console.log('playlist body: ' + response.body);
        check(response, {
            'status is 200':       (r) => r.status === 200,
            'has data':            (r) => {
            try { return JSON.parse(r.body).data !== undefined; }
            catch(e) { return false; }
            },
            'no 500 server error': (r) => r.status !== 500,
            'no 404 not found':    (r) => r.status !== 404,
        });

    sleep(1);
}