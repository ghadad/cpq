class Result {
    executer = true
    constructor(fastify){
        this.fastify = fastify
    }
    
    async execute(config) {
        return await config.result;
    }

    validate(config) {
        return Array.isArray(config) ;
    }
}

module.exports = Result ;