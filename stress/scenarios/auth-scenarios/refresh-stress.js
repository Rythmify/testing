import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
    stages: [
        { duration: '1m', target: 200}, // ramp up to 200 users over 1 minute
        { duration: '3m', target: 500}, // stay at 500 users for 3 minutes
        { duration: '1m', target: 1000}, // ramp up to 1000 users over 1 minute
        { duration: '2m', target: 0} // ramp down to 0 users over 2 minutes
    ],
    thresholds: {
        http_req_duration: ['p(95)<500'],
        http_req_failed: ['rate<0.01'],
    },
};

export default function () {
    const response = http.post('http://localhost:8080/api/v1/auth/refresh',null, {
        headers: {
            'Content-Type': 'application/json',
        },
    });

    check(response, {
        'status is 200':(r) => r.status === 200,
        'has new access_token': (r) => JSON.parse(r.body).data?.access_token !== undefined,
    });
    sleep(1);
}