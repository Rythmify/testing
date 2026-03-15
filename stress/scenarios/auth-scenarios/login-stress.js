import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
    stages: [
        { duration: '1m', target: 200},
        { duration: '3m', target: 500},
        { duration: '1m', target: 1000},
        { duration: '2m', target: 0}
    ],
    thresholds: {
        http_req_duration: ['p(95)<500'],
        http_req_failed: ['rate<0.01'],
    },
};

export default function () {
    const payload = JSON.stringify({
        email: 'test@test.com',
        password: 'test1234',
    });
    const response = http.post('http://localhost:8080/api/v1/auth/login', payload, {
        headers: {
            'Content-Type': 'application/json',
        }
    });
    check(response, {
        'status is 200':  (r) => r.status === 200,
        'has access token': (r) => JSON.parse(r.body).data?.access_token !== undefined,
    });
    sleep(1);
}