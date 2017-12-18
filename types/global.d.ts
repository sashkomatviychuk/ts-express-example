import { Request } from 'express'

declare namespace Application {
    
    interface IList<T> {
        length: number;
        items: T[];
        get(): T[];
        add(element: T): void;
    }

    interface ISpecialRequestParams {
        id: number;
    }

    interface ISpecialRequest extends Request {
        params: ISpecialRequestParams;
    }
}