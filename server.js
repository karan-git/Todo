'use strict'

const path = require('path')

const fastify = require('fastify')({
    logger: true
})

fastify.register(require('fastify-cors'), {
  origin: '*',
  credentials: true
})

fastify.register(require('./todo'), { prefix: '/api/todo' })

fastify.register(require('fastify-static'), {
    root: path.join(__dirname, 'frontend', 'build'),
    prefix: '/'
})

const start = async () => {
  try {
    await fastify.listen(3000)
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start()