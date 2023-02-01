import "reflect-metadata"

import Koa from 'koa';
import Router from 'koa-router';
import bodyParser from 'koa-bodyparser'
import { DI, initData } from './data/data-index';
import { installRest } from './rest';

import { RequestContext } from '@mikro-orm/core';
import json from "koa-json";
import { createLogger } from "winston";
import { getLogger, initializeLogger } from "./logging";
import cors from "@koa/cors";



async function main () {
    await initData();
    initializeLogger({
        level: 'debug',
        disabled: false,
        defaultMeta: {
            service: 'product-service'
        }
    })
    const logger = getLogger();
    
    const app = new Koa();

    app.use(async (ctx, next) => {
		const start = Date.now();
		await next();
		const ms = Date.now() - start;
		logger.info(`${ctx.method} ${ctx.url} - ${ms}ms`);
	});
    app.use(bodyParser());
    app.use(json())
    app.use(cors({
        origin: '*',
    }))
    // app.use(logger());
    app.use((ctx : Router.RouterContext, next) => RequestContext.createAsync(DI.orm.em, next));
    installRest(app);
    

    app.listen(3000, () => {
        logger.info('Server running on port 3000');
    });
}

main();
