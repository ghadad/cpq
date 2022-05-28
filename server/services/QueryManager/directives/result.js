class Result {
    executer = true
    constructor(){

    }
    async execute(config) {
        return await config.result;
    }

    validate(config) {
        return Array.isArray(config) ;
    }
}

module.exports = new Result();