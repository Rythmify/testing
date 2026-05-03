import http from 'k6/http';
import { check, sleep } from 'k6';

const BASE_URL = 'http://localhost:8080/api/v1';

const USERS = [
    { identifier: 'mo.khaled@example.com',    password: 'Password123!' },
    { identifier: 'fatma.nasser@example.com', password: 'Password123!' },
];

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

    const response = http.get(`${BASE_URL}/home`, {
        headers: { 'Authorization': `Bearer ${tokens[__VU]}` },
    });

    console.log('home status: ' + response.status);
    console.log('home body: ' + response.body);

    check(response, {
        'status is 200':              (r) => r.status === 200,
        'has hot_for_you':            (r) => { try { return JSON.parse(r.body).data.hot_for_you !== undefined; } catch(e) { return false; } },
        'has trending_by_genre':      (r) => { try { return JSON.parse(r.body).data.trending_by_genre !== undefined; } catch(e) { return false; } },
        'has artists_to_watch':       (r) => { try { return JSON.parse(r.body).data.artists_to_watch !== undefined; } catch(e) { return false; } },
        'has discover_with_stations': (r) => { try { return JSON.parse(r.body).data.discover_with_stations !== undefined; } catch(e) { return false; } },
        'no 500 server error':        (r) => r.status !== 500,
    });

    sleep(1);
}