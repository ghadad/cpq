class Result {
    name = "result"
    executer = true
    constructor(fastify){
        this.fastify = fastify
    }
    
    async execute(config) {
        return await config.result;
    }

    static  validate(config) {
        return Array.isArray(config) ;
    }
}

module.exports = Result ;