import { query } from "koa-req-validation"
import { param } from "koa-req-validation"

export function RequestError(code: number, errors: any) {
    return {
        code: code,
        errors: errors
    }
}

export const getByIDValidation = [
    param('id').isInt().isLength({min: 1}).withMessage('ID is required').build(),
    
]