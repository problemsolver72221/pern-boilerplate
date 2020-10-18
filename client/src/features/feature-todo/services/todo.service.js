import { runQuery } from '@forrestjs/feature-network'
import queries from './graphql'

import { setList } from '../reducers/todo.reducer'

export const getTodos = () => async (dispatch) => {
    console.log('hi')
    const res = await dispatch(runQuery(queries.getTodos))
    console.log('res?', res)
    const todos = res.data.todos.getTodos
    dispatch(setList(todos))
}

// export const deleteTodo = (todoId) => async (dispatch, getState) => {
//     const { todos } = getState()
//
// }
