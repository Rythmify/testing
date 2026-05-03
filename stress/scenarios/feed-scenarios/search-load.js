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

const searchQueries = [
    //Playlists
    'Quran',                
    'Spacetoon',
    //Tracks 
    'Surah_Elmudsar',       
    'سورة النجم',
    'أناوأخي',             
    //Profiles
    'Yomna',  
    'Alyaa',              
    //not in db
    'Quran Recitation',     
    'Islamic Lecture',
    'Personal Development',
];

export default function () {
    const query = searchQueries[__VU % searchQueries.length];

    const response = http.get(`${BASE_URL}/search?q=${encodeURIComponent(query)}`);

    console.log('search status: ' + response.status);
    console.log('search body: ' + response.body);

    check(response, {
        'status is 200':            (r) => r.status === 200,
        'no 400 validation error':  (r)=>r.status !==400,
        'no 429 to many requests':  (r) => r.status !== 429,
        'no 500 server error':      (r) => r.status !== 500,
        'has data':                 (r) => { 
            try { return JSON.parse(r.body).data !== undefined; } 
            catch(e) { return false; }
        },
        
    });

    sleep(1);
}