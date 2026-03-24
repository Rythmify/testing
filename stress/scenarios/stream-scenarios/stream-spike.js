import http from 'k6/http';
import { check, sleep } from 'k6';

const BASE_URL = 'http://localhost:8080/api/v1';

const TRACK_IDS = [
	'd1000000-0000-0000-0000-000000000002',
	'd1000000-0000-0000-0000-000000000008',
	'd1000000-0000-0000-0000-000000000011',
	'd1000000-0000-0000-0000-000000000012',
	'd1000000-0000-0000-0000-000000000014',
];

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

export default function () {
	const trackId = TRACK_IDS[__VU % TRACK_IDS.length];

	const response = http.get(`${BASE_URL}/tracks/${trackId}/stream`, {
		headers: {
			// Request a small byte range to avoid full media download per iteration.
			Range: 'bytes=0-1023',
		},
	});

	check(response, {
		'status is 200': (r) => r.status === 200,
		'has stream_url': (r) => {
			try { return JSON.parse(r.body).data?.stream_url !== undefined; }
			catch (e) { return false; }
		},
		'no 500 server error': (r) => r.status !== 500,
		'no 404 not found': (r) => r.status !== 404,
	});

	sleep(1);
}
