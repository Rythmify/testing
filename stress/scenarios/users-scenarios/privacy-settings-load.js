import http from "k6/http";
import { check, sleep } from "k6";
const BASE_URL =
  "https://rythmify-backend-dev.livelypebble-6b7965ef.uaenorth.azurecontainerapps.io/api/v1";

export const options = {
  stages: [
    { duration: "2m", target: 30 },
    { duration: "10m", target: 30 },
    { duration: "2m", target: 0 },
  ],
  thresholds: {
    http_req_duration: ["p(95)<500"],
    http_req_failed: ["rate<0.01"],
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

  const response = http.get(`${BASE_URL}/users/me/privacy-settings`, {
    headers: {
      Authorization: `Bearer ${tokens[__VU]}`,
    },
  });

  console.log("privacy-settings status: " + response.status);
  console.log("privacy-settings body: " + response.body);

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
