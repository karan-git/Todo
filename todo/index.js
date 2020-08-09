module.exports = async (fastify, opt) => {
    let todolist = [];
    fastify.get('/', async (request, reply) => {
        return (
            reply.send({
                 todolist
            })
        )
    });

    const todoSchema = {
        body: {
            type: 'array',
            required: ['todoVar'],
            properties: {
                todoVar: {
                    type: 'string'
                }
            },
            additionalProperties: false
        },
        response: {
            200: {
              type: 'array',
              required: [ 'todoVar' ],
              properties: {
                todoVar: { type: 'string' }
              },
              additionalProperties: false
            }
          }
    };

    fastify.post('/',{schema: todoSchema}, async (request, reply) => {
        todolist = request.body
        return reply.send({todolist})
    });


    fastify.delete('/:id', async (request, reply) => {
        let deletedItem = todolist.splice(JSON.parse(request.params.id), 1)
        let newlist = todolist.filter(item => item !== deletedItem)
        todolist = newlist
        return reply.send({ success: "Succesfully deleted !!" })
    })
}