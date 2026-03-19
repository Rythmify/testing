import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
    stages: [
        { duration: '1m', target: 10}, // ramp up to 10 users over 1 minute
        { duration: '3m', target: 15}, // stay at 15 users for 3 minutes
        { duration: '1m', target: 30}, // ramp up to 30 users over 1 minute
        { duration: '2m', target: 0} // ramp down to 0 users over 2 minutes
    ],
    thresholds: {
        http_req_duration: ['p(95)<500'],
        http_req_failed: ['rate<0.01'],
    },
};

export default function () {
    const uniqueEmail = `testuser_${__VU}_${__ITER}@rythmify.com`;

    const payLoad = JSON.stringify({
        email: uniqueEmail,
        password: 'Test_1234',
        display_name: `TestUser_${__VU}_${__ITER}`,
        gender: 'male',
        date_of_birth: '1990-01-01'
    });

    const response = http.post('http://localhost:8080/api/v1/auth/register', payLoad,{
        headers: 
            { 'Content-Type': 'application/json'}}
    );
    console.log('register status: ' + response.status);
    console.log('register body: ' + response.body);    
    check(response, {
    'status is 201': (r) => r.status === 201,
    'user was created': (r) => JSON.parse(r.body).data !== undefined,
    });
    sleep(1);
}