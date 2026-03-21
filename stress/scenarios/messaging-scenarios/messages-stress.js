import http from 'k6/http';
import { check, sleep } from 'k6';
export const BASE_URL = 'http://localhost:8080/api/v1'; 

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
const tokens = {};
const conversationId  = {};
export default function () {

    if (!tokens[__VU]) {
        const loginResponse = http.post(
        `${BASE_URL}/auth/login`,
        JSON.stringify({
            identifier: 'listener4@example.com',
            password: 'Listener1234!',
        }),
        { headers: { 'Content-Type': 'application/json' } }
        );

        if (loginResponse.status !== 200) {
        console.error('Login failed: ' + loginResponse.status);
        sleep(1);
        return;
        }

        tokens[__VU] = JSON.parse(loginResponse.body).data.access_token;
    }
    // create a new conversation if we don't have one 
    if (!conversationId [__VU]) {
        const conversationResponse = http.post(
        `${BASE_URL}/messages/new`,
        JSON.stringify({
            recipient_id: 'c2000000-0000-0000-0000-000000000003', //TODO replace with real user ID
            body: 'Stress test message',
        }),
        {
            headers: {
            'Authorization': `Bearer ${tokens[__VU]}`,
            'Content-Type': 'application/json',
            },
        }
        );
        console.log('conversation status: ' + conversationResponse.status);
        console.log('conversation body: ' + conversationResponse.body);
        
        if (conversationResponse.status !== 200 && conversationResponse.status !== 201) {
        console.error('Conversation failed: ' + conversationResponse.status + ' ' + conversationResponse.body);
        sleep(1);
        return;
        }

        conversationId[__VU] = JSON.parse(conversationResponse.body).data?.message?.conversation_id;
    }
    const response = http.post(
        `${BASE_URL}/messages/conversations/${conversationId [__VU]}/messages`,
        JSON.stringify({
        body: `Stress test message ${__VU}_${__ITER}`,
        }),
        {
        headers: {
            'Authorization': `Bearer ${tokens[__VU]}`,
            'Content-Type': 'application/json',
        },
        }
    );
    console.log('message status: ' + response.status);
    console.log('message body: ' + response.body);
    check(response, {
        'status is 200 or 201': (r) => r.status === 200 || r.status === 201,
        'no 500 server error':  (r) => r.status !== 500,
        'message sent':         (r) => {
            try { return JSON.parse(r.body).data?.id !== undefined; }
            catch(e) { return false; }
        },
    });

    sleep(1);
}
