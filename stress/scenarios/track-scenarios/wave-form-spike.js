import http from "k6/http";
import { check, sleep } from "k6";
const BASE_URL =
  "https://rythmify-backend-dev.livelypebble-6b7965ef.uaenorth.azurecontainerapps.io/api/v1";
const trackId = "c054bfec-7f27-4dc4-8e18-9753b19b7822";
export const options = {
  stages: [
    { duration: "10s", target: 0 },
    { duration: "30s", target: 500 },
    { duration: "1m", target: 500 },
    { duration: "30s", target: 0 },
  ],
  thresholds: {
    http_req_duration: ["p(95)<2000"],
    http_req_failed: ["rate<0.05"],
  },
};

export default function () {
  const response = http.get(`${BASE_URL}/tracks/${trackId}/waveform`);
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
