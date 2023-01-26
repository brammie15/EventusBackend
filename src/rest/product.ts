import Router from 'koa-router';
import { Context } from 'koa';
import * as productenService from '../service/product.service';
import { RequestContext } from '@mikro-orm/core';
import { DI } from '../data/data-index';
import { Winkel } from '../entities/Winkel.entity';
import { Product } from '../entities/Product.entity';
import { body } from 'koa-req-validation';

const getAll = async (ctx: Context) : Promise<void> => {
    try {
        ctx.body = await productenService.getAll();
    } catch (error) {
        console.log(error);
        return ctx.throw(400, {message : error.message})        
    }
}

const create = async (ctx: Context) : Promise<void> => {
    try {
        const product = await productenService.create(ctx.request.body);
        ctx.body = product;
    }
    catch (error) {
        console.log(error);
        return ctx.throw(400, {message : error.message})
    }
}
        


export function installProductRouter(app) : void{
    const productRouter : Router = new Router({
        prefix: '/product',

    });

    const createValidation = [
        body('naam').isLength({ min: 1 }).withMessage('Naam is required').build(),
        body('prijs').isFloat().isLength({ min: 1 }).withMessage('Prijs is required').build(),
        body('winkel').isLength({ min: 1 }).withMessage('Winkel is required').build(),
    ]

    productRouter.get('/', getAll);
    productRouter.post('/', create);

    app.use(productRouter.routes()).use(productRouter.allowedMethods());
}   
