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
		http_req_duration: ['p(95)<500'],
		http_req_failed: ['rate<0.01'],
	},
};

const tokens = {};
const conversationId = {};

export default function () {
	if (!tokens[__VU]) {
		const loginResponse = http.post(
			`${BASE_URL}/auth/login`,
			JSON.stringify({
				identifier: 'listener4@example.com',
				password: 'Listener1234!',
			}),
			{ headers: { 'Content-Type': 'application/json' } }
		);

		if (loginResponse.status !== 200) {
			sleep(1);
			return;
		}

		try {
			tokens[__VU] = JSON.parse(loginResponse.body).data.access_token;
		} catch (e) {
			sleep(1);
			return;
		}
	}

	if (!conversationId[__VU]) {
		const conversationResponse = http.post(
			`${BASE_URL}/messages/new`,
			JSON.stringify({
				recipient_id: 'c2000000-0000-0000-0000-000000000003',
				body: 'Load test message',
			}),
			{
				headers: {
					Authorization: `Bearer ${tokens[__VU]}`,
					'Content-Type': 'application/json',
				},
			}
		);

		if (conversationResponse.status !== 200 && conversationResponse.status !== 201) {
			sleep(1);
			return;
		}

		try {
			conversationId[__VU] = JSON.parse(conversationResponse.body).data?.message?.conversation_id;
		} catch (e) {
			sleep(1);
			return;
		}
	}

	const response = http.post(
		`${BASE_URL}/messages/conversations/${conversationId[__VU]}/messages`,
		JSON.stringify({
			body: `Load test message ${__VU}_${__ITER}`,
		}),
		{
			headers: {
				Authorization: `Bearer ${tokens[__VU]}`,
				'Content-Type': 'application/json',
			},
		}
	);

	check(response, {
		'status is 200 or 201': (r) => r.status === 200 || r.status === 201,
		'no 500 server error': (r) => r.status !== 500,
		'message sent': (r) => {
			try { return JSON.parse(r.body).data?.id !== undefined; }
			catch (e) { return false; }
		},
	});

	sleep(1);
}
