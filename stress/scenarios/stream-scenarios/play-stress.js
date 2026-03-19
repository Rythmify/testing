// ! Backend API not fully implemented, so this test is expected to fail until the play endpoint is ready.

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

export default function () {

    const trackId = TRACK_IDS[__VU % TRACK_IDS.length];

    const response = http.post(
        `${BASE_URL}/tracks/${trackId}/play`,
        JSON.stringify({ duration_played: 30 }),
        { headers: { 'Content-Type': 'application/json' } }
    );

    check(response, {
        'status is 200':       (r) => r.status === 200,
        'status is 201':       (r) => r.status === 201,
        'no 500 server error': (r) => r.status !== 500,
        'no 404 not found':    (r) => r.status !== 404,
    });

    sleep(1);
}