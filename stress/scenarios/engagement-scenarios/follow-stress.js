import http from "k6/http";
import { check, sleep } from "k6";

const BASE_URL =
  "https://rythmify-backend-dev.livelypebble-6b7965ef.uaenorth.azurecontainerapps.io/api/v1";

// Users to follow — must be different from the logged-in user
const TARGET_USER_IDS = [
  "00000002-0000-0000-0000-000000000000", // DJ Karim
  "00000004-0000-0000-0000-000000000000", // Omar Farouk
  "00000006-0000-0000-0000-000000000000", // SynthLord
  "00000008-0000-0000-0000-000000000000", // Sara Ali
  "00000013-0000-0000-0000-000000000000", // Kareem Saad
];

const USERS = [{ identifier: "yoeweida@gmail.com", password: "Yomna1234" }];

export const options = {
  stages: [
    { duration: "1m", target: 50 },
    { duration: "3m", target: 100 },
    { duration: "1m", target: 150 },
    { duration: "2m", target: 0 },
  ],
  thresholds: {
    http_req_duration: ["p(95)<1000"],
    http_req_failed: ["rate<0.01"],
  },
};

const tokens = {};

export default function () {
  if (!tokens[__VU]) {
    const user = USERS[__VU % USERS.length];
    const loginRes = http.post(
      `${BASE_URL}/auth/login`,
      JSON.stringify({ identifier: user.identifier, password: user.password }),
      { headers: { "Content-Type": "application/json" } },
    );

    console.log("login status: " + loginRes.status);

    if (loginRes.status !== 200) {
      sleep(1);
      return;
    }
    tokens[__VU] = JSON.parse(loginRes.body).data.access_token;
  }

  const targetUserId = TARGET_USER_IDS[(__VU - 1) % TARGET_USER_IDS.length];

  // Follow
  const followRes = http.post(
    `${BASE_URL}/users/${targetUserId}/follow`,
    null,
    { headers: { Authorization: `Bearer ${tokens[__VU]}` } },
  );

  console.log("follow status: " + followRes.status);
  console.log("follow body: " + followRes.body);

  check(followRes, {
    "followed or already following": (r) =>
      r.status === 200 || r.status === 201,
    "no 401 unauthorized": (r) => r.status !== 401,
    "no 403 blocked": (r) => r.status !== 403,
    "no 404 not found": (r) => r.status !== 404,
    "no 500 server error": (r) => r.status !== 500,
    "has message": (r) => {
      try {
        return JSON.parse(r.body).message !== undefined;
      } catch (e) {
        return false;
      }
    },
  });

  sleep(1);

  // Unfollow — keeps DB clean between iterations
  const unfollowRes = http.del(
    `${BASE_URL}/users/${targetUserId}/follow`,
    null,
    { headers: { Authorization: `Bearer ${tokens[__VU]}` } },
  );

  console.log("unfollow status: " + unfollowRes.status);

  sleep(1);
}
