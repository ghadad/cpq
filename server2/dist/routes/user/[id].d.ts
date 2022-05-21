import { NowRequestHandler } from 'fastify-now';
export declare const GET: NowRequestHandler<{
    Params: {
        id: string;
    };
}>;
export declare const PUT: NowRequestHandler<{
    Params: {
        id: string;
    };
    Reply: {
        message: string;
    };
}>;
