import http from 'k6/http';
import { check, sleep } from 'k6';

const BASE_URL = 'http://localhost:8080/api/v1';

export const options = {
    stages: [
        { duration: '1m', target: 50  },
        { duration: '3m', target: 100 },
        { duration: '1m', target: 150 },
        { duration: '2m', target: 0   },
    ],
    thresholds: {
        http_req_duration: ['p(95)<500'],
        http_req_failed:   ['rate<0.01'],
    },
};

const searchQueries = [
    'Quran Recitation',
    'Islamic Lecture',
    'Personal Development',
    'Business & Entrepreneurship',
    'Sports & Fitness',
    'Mental Health & Wellness',
    'Science & Technology',
    'True Crime & Society',
    'Daily 5-Minute Talks',
    'Motivation & Reminders'
];

export default function () {
    const query = searchQueries[__VU % searchQueries.length];

    const response = http.get(`${BASE_URL}/search?q=${encodeURIComponent(query)}`);

    console.log('search status: ' + response.status);
    console.log('search body: ' + response.body);

    check(response, {
        'status is 200':       (r) => r.status === 200,
        'has data':            (r) => { try { return JSON.parse(r.body).data !== undefined; } catch(e) { return false; } },
        'no 500 server error': (r) => r.status !== 500,
    });

    sleep(1);
}