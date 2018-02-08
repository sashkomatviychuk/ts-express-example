import { Request } from 'express'

interface ISpecialRequestParams {
    id: number;
}

export interface ISpecialRequest extends Request {
    params: ISpecialRequestParams;
}