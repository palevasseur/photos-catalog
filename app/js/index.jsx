import React from 'react';
import ReactDOM from 'react-dom';

class TestMongoDB extends React.Component {
    constructor(props) {
        super(props);
        this.state = { // state is specific React var, set state using setState()
            val: props.value,
            message: ''
        };

        this.saveValue = this.saveValue.bind(this); // bind to make saveValue work with onCLick
        this.inputChanged = this.inputChanged.bind(this)
    }

    render() {
        return (
            <div>
                <h1>Test MongoDB</h1>
                <button onClick={this.getList}>Get list</button>
                <div>todo: display list here</div>
                <br/>
                <input type="text" value={this.state.val} onChange={this.inputChanged}/>
                <button onClick={this.saveValue}>Create</button>
                <br/>
                <div>{this.state.message}</div>
            </div>);
    }

    getList(e) {
        // todo: call api/get to get list of value from mongodb
    }

    inputChanged(e) {
        this.setState({val: e.nativeEvent.srcElement.value});
    }

    saveValue() {
        // todo: call api/save to save this.state.val in mongodb
        var mes = 'value ' + this.state.val + ' saved !';
        this.setState({message: mes});
    }
}

ReactDOM.render(
    <TestMongoDB value="test2db"/>,
    document.getElementById('root')
);
