import "reflect-metadata"

import Koa from 'koa';
import Router from 'koa-router';
import bodyParser from 'koa-bodyparser'
import logger from 'koa-logger'
import { DI, initData } from './data/data-index';
import { installRest } from './rest';

import { RequestContext } from '@mikro-orm/core';
import json from "koa-json";




async function main () {
    await initData();

    const app = new Koa();

    app.use(bodyParser());
    app.use(json())
    app.use(logger());
    app.use((ctx : Router.RouterContext, next) => RequestContext.createAsync(DI.orm.em, next));
    installRest(app);
    

    app.listen(3000, () => {
        console.log('Server running on port 3000');
    });
}

main();
