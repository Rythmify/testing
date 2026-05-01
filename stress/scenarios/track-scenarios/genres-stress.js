import http from "k6/http";
import { check, sleep } from "k6";
const BASE_URL =
  "https://rythmify-backend-dev.livelypebble-6b7965ef.uaenorth.azurecontainerapps.io/api/v1";

export const options = {
  stages: [
    { duration: "1m", target: 50 }, // ramp up to 50 users over 1 minute
    { duration: "3m", target: 100 }, // stay at 100 users for 3 minutes
    { duration: "1m", target: 150 }, // ramp up to 150 users over 1 minute
    { duration: "2m", target: 0 }, // ramp down to 0 users over 2 minutes
  ],
  thresholds: {
    http_req_duration: ["p(95)<500"],
    http_req_failed: ["rate<0.01"],
  },
};

export default function () {
  const response = http.get(`${BASE_URL}/genres`);
  console.log("status: " + response.status);
  console.log("body: " + response.body);
  check(response, {
    "status is 200": (r) => r.status === 200,
    "has data": (r) => {
      try {
        return JSON.parse(r.body).data !== undefined;
      } catch (e) {
        return false;
      }
    },
    "no 500 server error": (r) => r.status !== 500,
    "no 403 forbidden": (r) => r.status !== 403,
  });

  sleep(1);
}
