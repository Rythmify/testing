import http from 'k6/http';
import { check, sleep } from 'k6';

const BASE_URL = 'http://localhost:8080/api/v1';

export const options = {
	stages: [
		{ duration: '2m', target: 30 },
		{ duration: '10m', target: 30 },
		{ duration: '2m', target: 0 },
	],
	thresholds: {
		http_req_duration: ['p(95)<500'],
		http_req_failed: ['rate<0.01'],
	},
};

export default function () {
	const uniqueId = `${Date.now()}_${__VU}_${__ITER}`;

	const payload = JSON.stringify({
		email: `loaduser_${uniqueId}@rythmify.com`,
		password: 'Test_1234',
		display_name: `LoadUser_${uniqueId}`,
		gender: 'male',
		date_of_birth: '1995-01-01',
	});

	const response = http.post(
		`${BASE_URL}/auth/register`,
		payload,
		{ headers: { 'Content-Type': 'application/json' } }
	);

	check(response, {
		'status is 201': (r) => r.status === 201,
		'user created': (r) => {
			try { return JSON.parse(r.body).data !== undefined; }
			catch (e) { return false; }
		},
		'no 500 error': (r) => r.status !== 500,
	});

	sleep(1);
}
