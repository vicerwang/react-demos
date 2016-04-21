# React开发培训

## React是什么
React是一个Facebook和Instagram用来创建用户界面的JavaScript 库，它既不是像jquery一样封装dom操作并提供一些工具方法的库，也不是像Angular一样大而全的MVC框架，它只专注于view层的渲染，并且基本上不需要操作dom，带来了与以往截然不同的web前端编程体验。

说了这么多，那react开发起来到底什么样呢，以下是从Open API工厂项目中选取的一段代码：

SearchBox.jsx

``` javascript
import './index.less';

import React, { Component } from 'react';
import { Input, Button } from 'antd'

export default ({ handleSearch, placeholder }) => (
  <form className="af-search-box"
    action="javascript:;"
    onSubmit={handleSearch}>
    <Input className="af-search-text" placeholder={placeholder} />
    <Button className="af-search-btn" type="primary" htmlType="submit">查找</Button>
  </form>
);
```

这段代码构建了一个我们常用的搜索框组件，可能这段代码的一些语法大家并不认识，那是因为它们是ECMAScript 6甚至ECMAScript 7的一些提案语法，不过暂时不必在意这些细节，我们会发现这种写法，好像就是把html写进了js中一样，但是又和真正的html有一些不一样，事实上准确的说这是一个看起来很像XML的JavaScript语法扩展，就像这个文件的后缀名所表示的jsx。从这里就能看出React开发的一些优势：1.类似于html一样良好的编程体验 2.得益于良好的封装性，让构建，复用以及组合组件的变得更加容易

当然了，浏览器是不认识这种语法的，所以需要事先将它们编译成浏览器能够解析执行的js文件，这个过程其实也类似于我们编写写的java源文件要首先编译成计算机可执行的二进制文件。我们可以看下编译后的代码

``` javascript
exports.default = function (_ref) {
  var handleSearch = _ref.handleSearch;
  var placeholder = _ref.placeholder;
  return _react2.default.createElement(
    'form',
    { className: 'af-search-box',
      action: 'javascript:;',
      onSubmit: handleSearch },
    _react2.default.createElement(_antd.Input, { className: 'af-search-text', placeholder: placeholder }),
    _react2.default.createElement(
      _antd.Button,
      { className: 'af-search-btn', type: 'primary', htmlType: 'submit' },
      '查找'
    )
  );
};
```
事实上，你也当然可以直接采取上面这种jsx编译后代码的语法来编写代码，但是显然jsx具有更好的可读性，更加直观，这也是React官方最推荐的编写方式。

## 为什么要用React，它相比以往的开发方式有什么优势？
其实刚才已经谈到了React的一些优点，现在让我们看看以往的以jquery/jquery插件/bootstrap/前端模版为代表的开发方式有哪些问题

* 繁琐的dom操作
* 复杂的状态同步
* 依赖于拼接html字符串或前端模版的组件开发方式很不方便
* 业务复杂后，难于维护的代码

那React有没有什么问题呢？

* 浏览器兼容性，完全不支持ie8-，支持ie8需要引入大量的shim/polyfill，并且官方已经宣布不再维护兼容ie8部分的代码
* 一般没有办法直接用于浏览器环境，需要事先编译，增加了学习成本
* 核心文件react.js react-dom.js size较大，而同时由于它只专注于View层的渲染，真正开发时往往还需要自己编写或引入一些库，比如非常常用的ajax的封装

## 从Hello World讲起
编译react的jsx文件依赖于node环境以及一些node模块，首先需要安装[node](https://nodejs.org/en/)。我已经在github上上传了一个[demo的集合](https://github.com/vicerwang/react-demos)，我们先从最简单的hello world开始。

### ReactDOM.render

``` javascript
ReactDOM.render(
    <h1>Hello World!</h1>,
    document.getElementById('example')
);
```

ReactDOM方用于将ReactElement渲染到dom树上，方法接受两个参数，第一个是jsx语法编写的ReactElement，第二个是挂载到的实际dom节点。这里要注意的是第一个参数必须存在根节点，否则react报错。

``` javascript
ReactDOM.render(
    <h1>Hello World!</h1>
    <h2>222</h2>,
    document.getElementById('example')
);
```

### 自定义组件

React强大之处不只在于他能将html标签写在js中，还在于它能自定义标签，同时添加相关的交互逻辑，从而形成完整的组件。

``` javascript
var HelloWorld = React.createClass({
    render: function() {
        return <h1>Hello World!</h1>;
    }
});

ReactDOM.render(
    <HelloWorld></HelloWorld>,
    document.getElementById('example')
);
```

jsx中标签也可以像html标签那样有属性，有子节点，但是也还有一些区别：

1. jsx中自定义标签首字母大写，html标签和在html中一样小写
2. 标签必须闭合(`<HelloWorld />`自闭合也行)
3. 另外组件的render方法返回的html结构和`ReactDOM.render`方法的第一个参数相同，必须被根节点包裹
4. jsx中标签的值可以是javascript变量或表达式，但是需要用双引号扩起来，不要用双引号引起来

	``` javascript
	var person = <Person name={window.isLoggedIn ? window.name : ''} />;
	```
5. 同样地，jsx中JavaScript表达式还可用于描述子结点

	``` javascript
	var content = <Container>{window.isLoggedIn ? <Nav /> : <Login />}</Container>;
	```
6. jsx中html标签的属性要么是存在于html规范的属性，要么是以`data-`/`aria-`开头的自定义属性或者支持无障碍阅读的属性，其他属性并不会真正出现在生成的HTML中

### ES6 Class

React从v0.13后开始支持通过es6 class语法编写组件，上面的例子可以改写成如下：

``` javascript
class HelloWorld extends React.Component {
    render() {
        return (
            <h1>Hello World!</h1>
        );
    }
}

ReactDOM.render(
    <HelloWorld></HelloWorld>,
    document.getElementById('example')
);
```

ES6的Class其实就是js传统构造函数的语法糖，使用起来更加方便，具体可以参考阮一峰[《ECMAScript 6 入门》相关内容](http://es6.ruanyifeng.com/#docs/class)。接下来的例子也都会以ES6 Class语法来书写。

## 将它改写成一个Todo List

### 完成基本的html结构

先更新下html，添加css文件的引用，再在index.jsx中添加相应的html结构。

index.jsx

``` javascript
class TodoList extends React.Component {
    render() {
        return (
            <div className="todoapp">
                <h1>todos</h1>
                <input className="new-todo" placeholder="What needs to be done?" />
                <div className="main">
                    <ul className="todo-list">
                        <li>
                            <label>some tips</label>
                            <button className="destroy"></button>
                        </li>
                    </ul>
                </div>
                <div className="footer">
                    <span className="todo-count">0</span>
                </div>
            </div>
        );
    }
}


ReactDOM.render(
    <TodoList></TodoList>,
    document.getElementById('example')
);
```

由于`class`是javascript的关键字，因此标签的`class`属性改为`className`，这样同时又与dom的api形成了统一，与此类似的还有`label`标签的`for`属性，相应的改为`htmlFor`。

### 初始化待办事项列表
像velocity模版的片段和jquery插件一样，如果想实现灵活的复用，一定要向外暴露接口，使调用者在调用时能够传递参数并产相应的变化，在React中则是通过传递props实现的。

我们假设一进入页面，就已经存在一组待办事项，我们需要将他们展示在输入框下方的列表中。

``` javascript
class TodoList extends React.Component {
    static defaultProps = {
        todos: []
    };
    
    render() {
        let todoItems = null;
        if (this.props.todos) {
            todoItems = this.props.todos.map((todo, index) => (
                <li key={index}>
                    <label>{todo}</label>
                    <button className="destroy"></button>
                </li>
            ));
        }

        return (
            <div className="todoapp">
                <h1>todos</h1>
                <input className="new-todo" placeholder="What needs to be done?" />
                <div className="main">
                    <ul className="todo-list">
                        {todoItems}
                    </ul>
                </div>
                <div className="footer">
                    <span className="todo-count">0</span>
                </div>
            </div>
        );
    }
}

const todos = [ '和后端对接口', '发周报' ];

ReactDOM.render(
    <TodoList todos={todos}></TodoList>,
    document.getElementById('example')
);
```

1. `const`/`let`是ES6新增的声明变量的关键字，作用类似于以前的`var`，区别在于被这两个关键字声明的变量，只在代码块（也就是大块号内生效），这两者的区别在于，前者赋值后不可变。待办
2. `() => {}`箭头函数是ES6中新增的定义函数的方式，第一个括号内为参数，如果只有一个参数，括号可以省略，箭头后的大括号为函数体，如果只有一行语句，可省略大括号，同时默认返回语句执行后的值，它相比过去函数的优势是，书写更加简单，不改变this指向。
3. 如果没有`<li key={index}></li>`中`key={index}`，我们会发现控制台出现一个warning：`react.js:18798 Warning: Each child in an array or iterator should have a unique "key" prop. Check the render method of TodoList. See https://fb.me/react-warning-keys for more information.`，这个是由于React为了防止渲染出现问题，要为一组ReactElement的每一个设置唯一标识的key
4. `static defaultProps = {};`是ES7`Class`静态属性的一个提案，React用它来表示默认的props，默认的props是所有组件对象都具有的属性，所以是组件的静态属性。
5. `static propTypes = {};`则规定了React组件接受props的类型，如果传入的不对，虽然React组件并不会停止运行，但是会在console中给出相应的warning

### 增加新的待办事项
以上介绍的还都是首次渲染生成的界面，那么产生交互后的页面该如何渲染呢？这里面先介绍下React渲染原理。

React把用户界面当作简单状态机，不同的状态会渲染出不同的界面，这样就可以轻松让用户界面和数据保持一致。因此我们不再需要手动的操作dom更新界面，而只需要更新组件的状态，那么接下来React就会自动刷新组件的界面，你可能会担心也许我只是改了一个span的文本，但React确要整个刷新组件，会不会带来性能方面的问题，React在底层使用虚拟DOM技术，也就是在内存中生成一个和界面的dom树对应的数据结构，每次状态更新，要重绘界面时，React内部会通过diff dom的算法，来自动进行最小的dom改动。

现在我们基于上面的原理来实现生成新的待办事项：

``` javascript
class TodoList extends React.Component {
    state = {
        todos: this.props.todos
    };

    render() {
        const todoItems = this.state.todos.map(todo =>
                <li>
                    <label>{todo}</label>
                    <button className="destroy"></button>
                </li>
            );
        }

        return (
            <div className="todoapp">
                <h1>todos</h1>
                <input className="new-todo" placeholder="What needs to be done?" />
                <div className="main">
                    <ul className="todo-list">
                        {todoItems}
                    </ul>
                </div>
                <div className="footer">
                    <span className="todo-count">0</span>
                </div>
            </div>
        );
    }
}

const todos = [ '和后端对接口', '发周报' ];

ReactDOM.render(
    <TodoList todos={todos}></TodoList>,
    document.getElementById('example')
);
```

1. `state = {};`是ES7 Class属性的一个提案，也可以在构造函数中初始化state

	``` javascript
	constructor(props) {
	    super(props);
	    this.state = {
	        todos: this.props.todos
	    };
	}
	```
2. 可以通过props来初始化state

当在文本框输入一定内容回车时，待办事项的列表就应该多添加一项，此时我们只需要更新state中的todos。

``` javascript
class TodoList extends React.Component {
    state = {
        todos: this.props.todos
    };

    addTodo(e) {
        e.preventDefault();
        const todo = e.target.querySelector('input').value.trim();
        if (todo) {
            this.setState({
                todos: this.state.todos.concat(todo)
            });
        }
    }

    render() {
        const todoItems = this.state.todos.map((todo, index) =>
            <li key={index}>
                <label>{todo}</label>
                <button className="destroy"></button>
            </li>
        );

        return (
            <div className="todoapp">
                <h1>todos</h1>
                <form action="javascript" onSubmit={::this.addTodo}>
                    <input type="text" className="new-todo" placeholder="What needs to be done?" />
                </form>
                <div className="main">
                    <ul className="todo-list">
                        {todoItems}
                    </ul>
                </div>
                <div className="footer">
                    <span className="todo-count">0</span>
                </div>
            </div>
        );
    }
}

const todos = [ '和后端对接口', '发周报' ];

ReactDOM.render(
    <TodoList todos={todos}></TodoList>,
    document.getElementById('example')
);
```

1. 由于是回车时增加待办事项，所以我选择在input外面包一层form，同时监听form的submit事件，当然也可以对input监听它的keydown事件，这里面要注意的一点是标签中事件的名称都采用驼峰表示法，值得一提的是`input[type=text]`的`onChange`事件不同于w3c规范，后者只有在焦点离开时才会触发，但是React中只要value发生改变，就会触发，其他事件系统不同处可参考[React官方文档](http://reactjs.cn/react/docs/events.html)。
2. `::this.addTodo`，由于在`addTodo`方法中需要访问组件设置状态的`this.setState`方法，所以需要将`addTodo`代码执行时的this指针绑定到组件本身（也就是this）上，在ES5中可以使用`this.addTodo.bind(this)`，但是ES6中有了更加简单的方式`::this.addTodo`
3. 设置组件状态，只能使用`this.setState({})`，不可以直接对`this.state`或其属性进行赋值，但是可以通过`this.state.xxx`读取值

同理，我们可以添加删除待办事项的逻辑

``` javascript
class TodoList extends React.Component {
    state = {
        todos: this.props.todos || []
    };

    addTodo(e) {
        e.preventDefault();
        const todo = e.target.querySelector('input').value.trim();
        if (todo) {
            this.setState({
                todos: this.state.todos.concat(todo)
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

    render() {
        const todoItems = this.state.todos.map((todo, index) =>
            <li key={index}>
                <label>{todo}</label>
                <button type="button" className="destroy" onClick={this.removeTodo.bind(this, index)}></button>
            </li>
        );

        return (
            <div className="todoapp">
                <h1>todos</h1>
                <form action="javascript" onSubmit={::this.addTodo}>
                    <input type="text" className="new-todo" placeholder="What needs to be done?" />
                </form>
                <div className="main">
                    <ul className="todo-list">
                        {todoItems}
                    </ul>
                </div>
                <div className="footer">
                    <span className="todo-count">0</span>
                </div>
            </div>
        );
    }
}
```

### 增加待办事项后清空输入框
``` javascript
class TodoList extends React.Component {
    state = {
        todo: '',
        todos: this.props.todos || []
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
        })
    }

    render() {
        const todoItems = this.state.todos.map((todo, index) =>
            <li key={index}>
                <label>{todo}</label>
                <button type="button" className="destroy" onClick={this.removeTodo.bind(this, index)}></button>
            </li>
        );

        return (
            <div className="todoapp">
                <h1>todos</h1>
                <form action="javascript" onSubmit={::this.addTodo}>
                    <input type="text" className="new-todo" placeholder="What needs to be done?" value={this.state.todo} onChange={::this.handleTodoChange} />
                </form>
                <div className="main">
                    <ul className="todo-list">
                        {todoItems}
                    </ul>
                </div>
                <div className="footer">
                    <span className="todo-count">0</span>
                </div>
            </div>
        );
    }
}

const todos = [ '和后端对接口', '发周报' ];

ReactDOM.render(
    <TodoList todos={todos}></TodoList>,
    document.getElementById('example')
);
```
在state中增加`todo`属性，通过它来渲染`input`标签的`value`，在增加待办事项的`addTodo`方法中设置`todos`的同时将`todo`更新为空字符串，我们发现此时的输入框无法输入任何值，这是由于React中如果对表单控件设置了value值，那么它就会变成一个受限控件，每次只会渲染value被设置的值，我们这里就是`this.state.todo`的初始值空字符串，解决的办法是监听表单组件的`onChange`事件，实时更新`this.state.todo`的值。

### 设置待办事项的总数
你可能想到的是，再在state中增加一个`todosLength`的属性就好了，但是事实上这会变得非常麻烦，每次在更新`todos`的同时我们都需要更新`todosLength`以保持数据的同步，本质上`todosLength`是依赖于`todo`的，因此我们只在state中保留`todo`，用`this.state.todos.length`来渲染待办事项总数的文本即可。

``` javascript
<span className="todo-count">{this.state.todos.length}</span>
```

除了这种计算可得的数据不要放在state中外，像React组件以及`this.props`中已经存在的数据也不要放在state中。

## React组件的生命周期
``` javascript
import React, { Component } from 'react';
import ReactDOM from 'react-dom';


class APP extends React.Component {
    state = {
        exists: true,
        disabled: false
    };

    handleToggleExists() {
        this.setState({
            exists: !this.state.exists
        });
    }

    handleToggleDisabled() {
        if (this.state.exists) {
            this.setState({
                disabled: !this.state.disabled
            });
        }
    }

    render() {
        return (
            <div>
                {
                    this.state.exists ?
                        <div>
                            <LifeCycle disabled={this.state.disabled} />
                        </div> : null
                }
                <button type="button" onClick={::this.handleToggleDisabled}>
                    Toggle Disabled
                </button>
                <button type="button" onClick={::this.handleToggleExists}>
                    Toggle Exists
                </button>
            </div>
        );
    }
}

class LifeCycle extends React.Component {
    static defaultProps = {
        value: 'input some',
        disabled: false
    };

    static propTypes = {
        value: React.PropTypes.string,
        disabled: React.PropTypes.bool
    }

    state = {
        value: this.props.value
    };

    componentWillMount() {
        // 在初始化渲染之前调用，只会被调用一次
        // 可以用来初始化或更新state
        console.log('componentWillMount');
    }

    componentDidMount() {
        // 在初始化渲染之后调用，只会被调用一次
        // 一般用来绑定事件，设置定时器以及ajax请求数据
        console.log('componentDidMount');
    }

    componentWillReceiveProps(nextProps) {
        // 在组件接收到新的props的时候调用，在初始化渲染的时候不会被调用
        // 是在组件调用render方法前最后更新state的机会
        console.log('componentWillReceiveProps, nextProps.disabled: ' + nextProps.disabled);
    }

    componentWillUpdate(nextProps, nextState) {
        // 在接收到新的props或者state之前立刻调用，在初始化渲染的时候该不会被调用
        // 使用该方法做一些更新之前的准备工作
        console.log('componentWillUpdate');
    }

    componentDidUpdate(prevProps, prevState) {
        // 在组件的更新已经同步到DOM中之后立刻被调用，在初始化渲染的时候该不会被调用
        // 一般用来手动更新DOM
        console.log('componentDidUpdate');
    }

    componentWillUnmount() {
        // 在组件从DOM中移除的时候立刻调用
        // 一般用来做解除绑定事件，清空定时器等资源清理工作
        console.log('componentWillUnmount');
    }

    handleChange(e) {
        this.setState({
            value: e.target.value
        });
    }

    render() {
        console.log('render');

        return (
          <div style={{width:200,border:'1px solid #ccc',marginBottom:50}}>
            <input type="text"
                value={this.state.value}
                disabled={this.props.disabled}
                onChange={::this.handleChange} />
            <br />
            <span>{this.state.value}</span>
          </div>
        );
    }
}

ReactDOM.render(
  <APP />,
  document.getElementById('example')
);
```

