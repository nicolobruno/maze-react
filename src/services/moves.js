import { create } from 'apisauce';

const baseURL = 'http://www.mocky.io/';

const api = create({
  baseURL,
  timeout: 40000
});

export const notifyMoves = async moves => {
  return api.post(`v2/5df38f523100006d00b58560`, moves);
};
