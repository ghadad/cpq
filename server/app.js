'use strict'

const path = require('path')
const AutoLoad = require('@fastify/autoload')
require('dotenv').config()
const Config = require('config');

console.log(Config);
module.exports = async function (fastify, opts) {
  fastify.register(require('@fastify/cors'), { 
    // put your options here
  })
  // Place here your custom code!

  // Do not touch the following lines

  // This loads all plugins defined in plugins
  // those should be support plugins that are reused
  // through your application
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'plugins'),
    options: Object.assign({}, opts,Config)
  })

  // This loads all plugins defined in routes
  // define your routes in one of these
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'routes'),
    options: Object.assign({}, opts,Config)
  })

  
}
