class Result {
    name = "result"
    executer = true
    constructor(fastify){
        this.fastify = fastify
    }
    
    async execute(config) {
        return await this.convert(config.result,config);

    }

    convert(data,config) { 
        
        let result  =data
            .reduce((prev,curr,index) => ({...prev,[config.picks[index]]:curr},{}))
  
            console.log("resukt:",result)
        return result;
    }
    static  validate(config) {
        return Array.isArray(config) ;
    }
}

module.exports = Result ;