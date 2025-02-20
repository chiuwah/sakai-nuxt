import httpService from './HttpService.js';
export async function login(data) {
  return httpService.post('/auth/login', data);
}