import React from 'react'
import PropTypes from 'prop-types'

import TodoItem from './TodoItem'

import getStyles from './TodoListUI.style'
const styles = getStyles()

const TodoListUI = ({ data, onOpen }) => {
    console.log(data)
    return (
        <div style={styles.wrapper}>
            {data.map((item, index) => (
                // <p
                //     key={index}
                //     onClick={() => onOpen(item.id)}
                //     style={styles.todoItem}
                // >
                //     {item.description}
                // </p>
                <TodoItem
                    key={index}
                    todoId={item.todo_id}
                    description={item.description}
                    onOpen={onOpen}
                />
            ))}
        </div>
    )
}

TodoListUI.propTypes = {
    data: PropTypes.array,
    onOpen: PropTypes.func.isRequired,
}

TodoListUI.defaultProps = {
    data: [],
}

export default TodoListUI
