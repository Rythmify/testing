// ! Backend API not fully implemented, so this test is expected to fail until the feed endpoint is ready.
import http from 'k6/http';
import { check, sleep } from 'k6';
const BASE_URL = 'https://rythmify-backend-dev.livelypebble-6b7965ef.uaenorth.azurecontainerapps.io/api/v1'; 

export const options = {
	stages: [
		{ duration: '2m', target: 30 },
		{ duration: '10m', target: 30 },
		{ duration: '2m', target: 0 },
	],
	thresholds: {
		http_req_duration: ['p(95)<1000'],
		http_req_failed: ['rate<0.01'],
	},
};
const tokens = {};

export default function () {

    if (!tokens[__VU]) {
        const response = http.post(
        `${BASE_URL}/auth/login`,
        JSON.stringify({
            identifier: 'yoeweida@gmail.com', 
            password: 'Yomna1234',
        }),
        { headers: { 'Content-Type': 'application/json' } }
        );

        if (response.status !== 200) {
        console.error('Login failed: ' + response.status);
        sleep(1);
        return;
        }
        console.log('login status: ' + response.status);
        console.log('login body: ' + response.body);

        tokens[__VU] = JSON.parse(response.body).data.access_token;
    }


    const response = http.get(`${BASE_URL}/feed`, {
        headers: {
        'Authorization': `Bearer ${tokens[__VU]}`,
        },
    });
    console.log('feed status: ' + response.status);
    console.log('feed body: ' + response.body); 
    check(response, {
        'status is 200':                (r) => r.status === 200,
        'no 401 unauthorized':          (r) => r.status !== 401,
        'no 429 to many requests':      (r)=> r.status !== 429,
        'no 500 server error':          (r) => r.status !== 500,
        'has data':                     (r) => { 
            try { return JSON.parse(r.body).data !== undefined; } 
            catch(e) { return false; } },

    });

    sleep(1);
}
