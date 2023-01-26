import "reflect-metadata"

import Koa from 'koa';
import Router from 'koa-router';
import bodyParser from 'koa-bodyparser'
import logger from 'koa-logger'
import { DI, initData } from './data/data-index';
import { installRest } from './rest';

import { RequestContext } from '@mikro-orm/core';
import json from "koa-json";



type helloRequest = {
    name: string;
}

function RequestError(code: number, errors: any) {
    return {
        code: code,
        errors: errors
    }
}


async function main () {
    await initData();

    const app = new Koa();


    // router.get(
    //     '/',
        // query('name').isLength({ min: 1 }).withMessage('Name is required').build(),
    //     async (ctx : Router.RouterContext, next) => {
    //         const errors: ValidationResult = validationResults(ctx);

    //         if (errors.hasErrors()) {
    //             ctx.body = RequestError(400, errors.mapped());
    //             return;
    //         }

    //         const data: helloRequest = <helloRequest>ctx.request.body;
    //         ctx.body = "Hello " + data.name;            
        
    // });


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
