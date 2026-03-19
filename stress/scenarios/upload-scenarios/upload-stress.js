// ! There is bug , When this bug fixed this test will pass 
import http from 'k6/http';
import { check, sleep } from 'k6';

const BASE_URL = 'http://localhost:8080/api/v1';

export const options = {
    stages: [
        { duration: '1m', target: 20  },
        { duration: '3m', target: 50  },
        { duration: '1m', target: 100 },
        { duration: '2m', target: 0   },
    ],
    thresholds: {
        http_req_duration: ['p(95)<3000'],
        http_req_failed:   ['rate<0.01'],
    },
};

const tokens = {};  // store token per VU so login happens only once

export default function () {

  // login only on first iteration of each VU
    if (!tokens[__VU]) {
        const loginRes = http.post(
        `${BASE_URL}/auth/login`,
        JSON.stringify({
            identifier: 'layla_mindset@example.com',
            password: 'Artist1234!',
        }),
        { headers: { 'Content-Type': 'application/json' } }
        );

        if (loginRes.status !== 200) {
            console.error('Login failed: ' + loginRes.status);
            sleep(1);
            return;
        }
    tokens[__VU] = JSON.parse(loginRes.body).data.access_token;
    }

  // use stored token for all subsequent iterations
    const fakeAudio = http.file(
        new Uint8Array(1024).buffer,
        'test-track.mp3',
        'audio/mpeg'
    );

    const response = http.post(
        `${BASE_URL}/tracks`,
        {
            audio_file:   fakeAudio,
            title:       `Stress Test Track ${__VU}_${__ITER}`,
            genre:       'Islamic Lecture',
            description: 'Stress test upload',
            tags:        'stress,test',
            visibility:  'private',
        },
        {
        headers: {
            'Authorization': `Bearer ${tokens[__VU]}`,
        },
        }
    );

    console.log('upload status: ' + response.status);
    console.log('upload body: '   + response.body);

    check(response, {
        'status is 201':       (r) => r.status === 201,
        'track was created':   (r) => JSON.parse(r.body).data?.track_id !== undefined,
        'no 500 server error': (r) => r.status !== 500,
        'no 403 forbidden':    (r) => r.status !== 403,
    });

    sleep(1);
}