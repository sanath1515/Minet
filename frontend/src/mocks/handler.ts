import { rest } from 'msw';
import { MOCK_CRYPTO_LIST, TOKEN, TRANSACTION_DATA, USER_DATA, WALLET_DATA } from '../utils/constants';

const URL = 'https://bc136be.bootcamp64.tk';

export const handlers = [

    rest.get(`${URL}/users`, (req, res, ctx) => {
        return res(ctx.status(200), ctx.json([USER_DATA]));
    }),

    rest.get(`${URL}/users/1`, (req, res, ctx) => {
        return res(ctx.status(200), ctx.json(USER_DATA));
    }),

    rest.get(`${URL}/users/:email`, (req, res, ctx) => {
        return res(ctx.status(200), ctx.json(USER_DATA));
    }),

    rest.post(`${URL}/users`, (req, res, ctx) => {
        return res(ctx.status(200), ctx.json(USER_DATA));
    }),

    rest.put(`${URL}/users/1`, (req, res, ctx) => {
        return res(ctx.status(200), ctx.json({}));
    }),

    rest.get(`${URL}/transactions/1`, (req, res, ctx) => {
            return res(ctx.status(200), ctx.json(TRANSACTION_DATA));
    }),

    rest.post(`${URL}/transactions`, (req, res, ctx) => {
            return res(ctx.status(200), ctx.json({}));
    }),

    rest.get(`${URL}/crypto-currencies`, (req, res, ctx) => {
            return res(ctx.status(200), ctx.json(MOCK_CRYPTO_LIST));
    }),

    rest.get(`${URL}/crypto-currencies/1`, (req, res, ctx) => {
            return res(ctx.status(200), ctx.json(MOCK_CRYPTO_LIST[0]));
    }),

    rest.get(`${URL}/crypto-currencies/watchList/1`, (req, res, ctx) => {
            return res(ctx.status(200), ctx.json(MOCK_CRYPTO_LIST));
    }),
 
    rest.post(`${URL}/crypto-currencies/watchList`, (req, res, ctx) => {
        return res(ctx.status(200), ctx.json({}));
    }),

    rest.post(`${URL}/users/login`, (req, res, ctx) => {
        return res(ctx.status(200), ctx.json(TOKEN));
    }),

    rest.get(`${URL}/wallet/1`, (req, res, ctx) => {
        return res(ctx.status(200), ctx.json(WALLET_DATA));
}),
  
];
