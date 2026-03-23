import http from 'k6/http';
import { check, sleep } from 'k6';

const BASE_URL = 'http://localhost:8080/api/v1';

export const options = {
	stages: [
		{ duration: '10s', target: 0 },
		{ duration: '30s', target: 80 },
		{ duration: '1m', target: 80 },
		{ duration: '30s', target: 0 },
	],
	thresholds: {
		http_req_duration: ['p(95)<4000'],
		http_req_failed: ['rate<0.05'],
	},
};

const tokens = {};

export default function () {
	if (!tokens[__VU]) {
		const loginRes = http.post(
			`${BASE_URL}/auth/login`,
			JSON.stringify({
				identifier: 'listener4@example.com',
				password: 'Listener1234!',
			}),
			{ headers: { 'Content-Type': 'application/json' } }
		);

		if (loginRes.status !== 200) {
			sleep(1);
			return;
		}

		try {
			tokens[__VU] = JSON.parse(loginRes.body).data.access_token;
		} catch (e) {
			sleep(1);
			return;
		}
	}

	const fakeAudio = http.file(
		new Uint8Array(1024).buffer,
		'test-track.mp3',
		'audio/mpeg'
	);

	const response = http.post(
		`${BASE_URL}/tracks`,
		{
			audio_file: fakeAudio,
			title: `Spike Test Track ${__VU}_${__ITER}`,
			genre: 'Islamic Lecture',
			description: 'Spike test upload',
			tags: JSON.stringify(['quran', 'ramadan']),
			visibility: 'private',
		},
		{
			headers: {
				Authorization: `Bearer ${tokens[__VU]}`,
			},
		}
	);

	check(response, {
		'status is 201': (r) => r.status === 201,
		'track was created': (r) => {
			try { return JSON.parse(r.body).data?.id !== undefined; }
			catch (e) { return false; }
		},
		'no 500 server error': (r) => r.status !== 500,
		'no 403 forbidden': (r) => r.status !== 403,
	});

	sleep(1);
}
