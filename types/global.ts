import { Request } from 'express'

class ISpecialRequestParams {
    id: number;
}

export interface ISpecialRequest extends Request {
    params: ISpecialRequestParams;
}