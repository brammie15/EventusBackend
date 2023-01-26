import Router from 'koa-router';
import { Context } from 'koa';
import * as winkelService from '../service/winkel.service';
import { RequestContext } from '@mikro-orm/core';
import { DI } from '../data/data-index';
import { Winkel } from '../entities/Winkel.entity';
import { body, query, validationResults } from 'koa-req-validation';
import ValidationResult from 'koa-req-validation/dist/lib/ValidationResult';
import { IMappedValidationResults } from 'koa-req-validation/dist/lib/types';

const getAll = async (ctx: Context) : Promise<void> => {
    try {
        ctx.body = await winkelService.getAll();
    } catch (error) {
        console.log(error);
        return ctx.throw(400, {message : error.message})        
    }
}

type createWinkelRequest = {
    naam: string;
}

function RequestError(code: number, errors: any) {
    return {
        code: code,
        errors: errors
    }
}


const create = async (ctx: Context) : Promise<void> => {
    try {
        const errors : ValidationResult = validationResults(ctx);

        if(errors.hasErrors()){
            ctx.body = RequestError(400, errors.mapped());
            return;
        }
        const winkelReq : createWinkelRequest = <createWinkelRequest>ctx.request.body;

        // const newWinkel : Winkel = new Winkel(ctx.request.body);
        const winkel = await winkelService.create(winkelReq);
        ctx.body = winkel;
    }
    catch (error) {
        console.log(error);
        return ctx.throw(400, {message : error.message})
    }
}
        


export function installWinkelRoutes(app) : void{
    const winkelRouter : Router = new Router({
        prefix: '/winkel',

    });

    const createValidation = [ 
        body('naam').isLength({min: 1}).withMessage('Name is required').build(),
    ]

    winkelRouter.get('/', getAll);
    winkelRouter.post('/', ...createValidation, create);

    app.use(winkelRouter.routes()).use(winkelRouter.allowedMethods());
}   

