import http from 'k6/http';
import { check, sleep } from 'k6';

const BASE_URL = 'http://localhost:8080/api/v1';

const TRACK_IDS = [
    'a05375dc-0833-40ea-a8c8-70dac4eb46e1'
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
    const trackId = TRACK_IDS[(__VU - 1) % TRACK_IDS.length];

    const response = http.post(
        `${BASE_URL}/tracks/${trackId}/play`,
        null,
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