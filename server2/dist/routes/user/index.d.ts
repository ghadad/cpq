import { NowRequestHandler } from 'fastify-now';
export declare const POST: NowRequestHandler<{
    Body: {
        name: string;
    };
    Params: {
        id: string;
    };
}>;
