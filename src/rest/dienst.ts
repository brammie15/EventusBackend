import Router from 'koa-router';
import { Context } from 'koa';
import * as dienstenService from '../service/dienst.service';
import { RequestContext } from '@mikro-orm/core';
import { DI } from '../data/data-index';
import { Winkel } from '../entities/Winkel.entity';
import { Product } from '../entities/Product.entity';
import { body } from 'koa-req-validation';

const getAll = async (ctx: Context) : Promise<void> => {
    try {
        ctx.body = await dienstenService.getAll();
    } catch (error) {
        console.log(error);
        return ctx.throw(400, {message : error.message})        
    }
}

const create = async (ctx: Context) : Promise<void> => {
    try {
        const product = await dienstenService.create(ctx.request.body);
        ctx.body = product;
    }
    catch (error) {
        console.log(error);
        return ctx.throw(400, {message : error.message})
    }
}
        


export function installDientRouter(app) : void{
    const productRouter : Router = new Router({
        prefix: '/dienst',

    });

    const createValidation = [
        body('naam').isLength({min: 1}).withMessage('Name is required').build(),
        body('prijs').isNumeric().withMessage('Price is required').build(),
    ]

    productRouter.get('/', getAll);
    productRouter.post('/', ...createValidation,  create);

    app.use(productRouter.routes()).use(productRouter.allowedMethods());
}   
