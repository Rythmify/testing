// ! Backend API not fully implemented, so this test is expected to fail until the search endpoint is ready.
import http from 'k6/http';
import { check, sleep } from 'k6';
const BASE_URL = 'http://localhost:8080/api/v1'; 

export const options = {
    stages: [
        { duration: '1m', target: 50}, // ramp up to 50 users over 1 minute
        { duration: '3m', target: 100}, // stay at 100 users for 3 minutes
        { duration: '1m', target: 150}, // ramp up to 150 users over 1 minute
        { duration: '2m', target: 0} // ramp down to 0 users over 2 minutes
    ],
    thresholds: {
        http_req_duration: ['p(95)<500'], 
        http_req_failed: ['rate<0.01'],
    },
};
// A variety of search queries to simulate different user interests and ensure we test various code paths in the search functionality.

const searchQueries = ['Quran Recitation','Islamic Lecture','Personal Development','Business & Entrepreneurship','Sports & Fitness','Mental Health & Wellness','Science & Technology','True Crime & Society','Daily 5-Minute Talks','Motivation & Reminders'];

export default function () {
    const query = searchQueries[__VU % searchQueries.length];
    const response = http.get(`${BASE_URL}/search?q=${query}`);

    console.log('search status: ' + response.status);
    console.log('search body: ' + response.body);

    check(response, {
        'status is 200':       (r) => r.status === 200,
        'has data':            (r) => JSON.parse(r.body).data !== undefined,
        'no 500 server error': (r) => r.status !== 500,
    });

    sleep(1);
};


