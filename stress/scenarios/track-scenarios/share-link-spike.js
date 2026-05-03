import http from "k6/http";
import { check, sleep } from "k6";
const BASE_URL =
  "https://rythmify-backend-dev.livelypebble-6b7965ef.uaenorth.azurecontainerapps.io/api/v1";
const trackId = "8887e9c4-dd25-4eab-8990-c7e3e9182624";
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
const tokens = {};

export default function () {
  if (!tokens[__VU]) {
    const loginResponse = http.post(
      `${BASE_URL}/auth/login`,
      JSON.stringify({
        identifier: "ahmedattay8@gmail.com",
        password: "Ahmedattay66",
      }),
      { headers: { "Content-Type": "application/json" } },
    );

    if (loginResponse.status !== 200) {
      console.error("Login failed: " + loginResponse.status);
      sleep(1);
      return;
    }
    console.log("login status: " + loginResponse.status);
    console.log("login body: " + loginResponse.body);

    tokens[__VU] = JSON.parse(loginResponse.body).data.access_token;
  }

  const response = http.get(`${BASE_URL}/tracks/${trackId}/share-link`, {
    headers: {
      Authorization: `Bearer ${tokens[__VU]}`,
    },
  });

  console.log("tracks status: " + response.status);
  console.log("tracks body: " + response.body);

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
    "no 404 not found": (r) => r.status !== 404,
  });

  sleep(1);
}
