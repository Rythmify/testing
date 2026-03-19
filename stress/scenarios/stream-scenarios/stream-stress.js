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
        { duration: '1m', target: 50  },
        { duration: '3m', target: 100 },
        { duration: '1m', target: 150 },
        { duration: '2m', target: 0   },
    ],
    thresholds: {
        http_req_duration: ['p(95)<1000'], // streaming allows higher latency — 1s
        http_req_failed:   ['rate<0.01'],
    },
};

export default function () {
    const trackId = TRACK_IDS[__VU % TRACK_IDS.length];

    const response = http.get(`${BASE_URL}/tracks/${trackId}/stream`, {
        headers: {
            'Range': 'bytes=0-1023', // request only first 1KB — don't download full file
        },
    });

    console.log('stream status: ' + response.status);
    console.log('stream body: ' + response.body);

    check(response, {
        'has stream_url':      (r) => JSON.parse(r.body).data?.stream_url !== undefined,
        'status is 200':          (r) => r.status === 200,
        'no 500 server error':    (r) => r.status !== 500,
        'no 404 not found':       (r) => r.status !== 404,
    });

    sleep(1);
}