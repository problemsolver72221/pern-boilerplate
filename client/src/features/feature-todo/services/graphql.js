export default {
    getTodos: `
        query getTodos {
            todos {
                getTodos
            }
        }
    `,
    addTodo: `
        mutation addTodo ($description:String!) {
            todos {
                addTodo (description:$description)
            }
        }
    `,
    updateTodo: `
        mutation updateTodo ($todoId:Int!, $description:String!) {
            todos {
                updateTodo (todoId:$todoId, description:$description)
            }
        }
    `,
    deleteTodo: `
        mutation deleteTodo ($todoId:Int!) {
            todos {
                deleteTodo (todoId:$todoId)
            }
        }
    `,
}
