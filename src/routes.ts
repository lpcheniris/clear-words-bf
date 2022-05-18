import { Application, Router } from 'express';

import { IndexController } from "./controllers/IndexController";
import { QueryController } from './controllers/QueryController';


const _routes: [string, Router][] = [
    ['/', IndexController],
    ['/query', QueryController]
];

export const routes = (app: Application) => {
    _routes.forEach((route) => {
        const [url, controller] = route;
        app.use(url, controller);
    });
};