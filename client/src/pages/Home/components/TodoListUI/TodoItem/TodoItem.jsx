import React from 'react'
import PropTypes from 'prop-types'

import getStyles from './TodoItem.style'
const styles = getStyles()

const TodoItem = ({ todoId, description, onOpen }) => {
    console.log(todoId)
    return (
        <div style={styles.todoItem} onClick={() => onOpen(todoId)}>
            <p style={styles.todoItem}>{description}</p>
        </div>
    )
}

TodoItem.propTypes = {
    data: PropTypes.array,
    onOpen: PropTypes.func.isRequired,
}

TodoItem.defaultProps = {
    data: [],
}

export default TodoItem
