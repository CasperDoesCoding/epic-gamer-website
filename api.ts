import * as http from 'http';
import { IncomingMessage, ServerResponse } from 'http';
import { randomUUID } from 'crypto';

const hostname = 'localhost';
const port = 3000;

type Account = {
    name: string,
    region: string
}

type Accounts = {
    [id: string]: Account
}

enum AvailableLeagueRegions {
    EUW = 'EUW',
    EUNE = 'EUNE',
    NA = 'NA',
    RU = 'RU',
    TR = 'TR',
    BR = 'BR',
    LAN = 'LAN',
    LAS = 'LAS',
    OCE = 'OCE',
    KR = 'KR',
    JP = 'JP',
    PBE = 'PBE'
}

enum AvailableEndpoints {
    GET_ACCOUNTS = '/FETCH_ACCOUNTS',
    FETCH_ACCOUNT_BY_ID = '/FETCH_ACCOUNT_BY_ID',
    FETCH_ACCOUNT_BY_NAME = '/FETCH_ACCOUNT_BY_NAME',
}

const accounts: Accounts = {}

function addAccount(name: string, region: AvailableLeagueRegions): void {
    // generate guid for account
    const account_id = randomUUID();

    accounts[account_id] = {
        name,
        region
    };

    console.log(accounts);
}

function handleApiRequest(req: IncomingMessage, res: ServerResponse): void {
    const { url, method } = req;

    console.log(url, method);

    if (url === AvailableEndpoints.GET_ACCOUNTS && method === 'GET') {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(accounts));
    } else if (url === AvailableEndpoints.FETCH_ACCOUNT_BY_ID && method === 'GET') {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(accounts));
    } else if (url === AvailableEndpoints.FETCH_ACCOUNT_BY_NAME && method === 'GET') {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(accounts));
    } else if (url === AvailableEndpoints.GET_ACCOUNTS && method === 'POST') {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(accounts));
    } else {
        res.statusCode = 404;
        res.end();
    }
}

const server: http.Server = http.createServer((req: IncomingMessage, res: ServerResponse) => {
    handleApiRequest(req, res);
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});