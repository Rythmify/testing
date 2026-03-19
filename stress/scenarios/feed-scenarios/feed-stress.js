// ! Backend API not fully implemented, so this test is expected to fail until the feed endpoint is ready.
import http from 'k6/http';
import { check, sleep } from 'k6';
const BASE_URL = 'http://localhost:8080/api/v1'; 