import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { getTodos } from '../../features/feature-todo/services/todo.service'

import TodoListUI from './components/TodoListUI'

const mapState = ({ todos }) => ({
    list: todos.list,
})

const mapDispatch = (dispatch) => ({
    getTodos: () => dispatch(getTodos()),
    // openTodo: todoId => dispatch({
    //     type: '@open::todos::todo-page',
    //     todoId: todoId,
    // }),
})

class Home extends Component {
    async componentDidMount() {
        try {
            const { getTodos } = this.props
            this.setState({ isLoading: true })
            const dos = await getTodos()
            console.log(dos)
            this.setState({
                isLoading: false,
            })
        } catch (err) {
            this.setState({ isLoading: false })
        }
    }

    state = {
        isLoading: false,
    }

    render() {
        const { list } = this.props
        return (
            <div style={{ padding: 15 }}>
                <h2>Todo list</h2>
                <TodoListUI data={list} onOpen={() => console.log('hi')} />
            </div>
        )
    }
}

Home.propTypes = {
    list: PropTypes.array,
    getTodos: PropTypes.func.isRequired,
}

// export default Home
export default connect(mapState, mapDispatch)(Home)
