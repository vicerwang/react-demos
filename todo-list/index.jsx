import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class TodoList extends Component {
    static defaultProps = {
        todos: []
    };

    static propTypes = {
        todos: React.PropTypes.array
    };

    state = {
        todos: this.props.todos,
        todo: ''
    };

    addTodo(e) {
        e.preventDefault();
        const todo = e.target.querySelector('input').value.trim();
        if (todo) {
            this.setState({
                todos: this.state.todos.concat(todo),
                todo: ''
            });
        }
    }

    removeTodo(index) {
        const todos = this.state.todos;
        todos.splice(index, 1);
        this.setState({
            todos
        });
    }

    handleTodoChange(e) {
        this.setState({
            todo: e.target.value.trim()
        });
    }

    render() {
        const todoItems = this.state.todos.map((todo, index) =>
            <li key={index}>
                <label>{todo}</label>
                <button type="button" className="destroy"
                    onClick={this.removeTodo.bind(this, index)} />
            </li>
        );

        return (
            <div className="todoapp">
                <h1>todos</h1>
                <form action="javascript" onSubmit={::this.addTodo}>
                    <input type="text" className="new-todo" placeholder="What needs to be done?"
                        value={this.state.todo} onChange={::this.handleTodoChange} />
                </form>
                <div className="main">
                    <ul className="todo-list">
                        {todoItems}
                    </ul>
                </div>
                <div className="footer">
                    <span className="todo-count">{this.state.todos.length}</span>
                </div>
            </div>
        );
    }
}

const todos = [ '和后端对接口', '发周报' ];

ReactDOM.render(
    <TodoList todos={todos} />,
    document.getElementById('example')
);
