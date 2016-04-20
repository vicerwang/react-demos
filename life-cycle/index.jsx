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
        this.setState({
            disabled: !this.state.disabled
        });
    }

    render() {
        return (
            <div>
                { this.state.exists ?
                    <div>
                        <LifeCycle disabled={this.state.disabled} />
                        <button type="button" onClick={::this.handleToggleDisabled}>Toggle Disabled</button>
                    </div> : null
                }
                <button type="button" onClick={::this.handleToggleExists}>Toggle Exists</button>
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
          <div>
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
