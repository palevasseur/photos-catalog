import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

const apiUrl = 'http://localhost:3000/api';
const apiHelloUrl = apiUrl + '/helloworld';

class TestMongoDB extends React.Component {
    constructor(props) {
        super(props);
        this.state = { // state is specific React var, set state using setState()
            val: props.value,
            savMes: '',
            listMes: ''
        };

        // bind methods to make them working with events
        this.saveValue = this.saveValue.bind(this);
        this.inputChanged = this.inputChanged.bind(this);
        this.getList = this.getList.bind(this);
    }

    render() {
        return (
            <div>
                <h1>Test MongoDB</h1>
                <button onClick={this.getList}>Get list</button>
                <div>{this.state.listMes}</div>
                <br/>
                <input type="text" value={this.state.val} onChange={this.inputChanged}/>
                <button onClick={this.saveValue}>Create</button>
                <br/>
                <div>{this.state.savMes}</div>
            </div>);
    }

    getList(e) {
        axios.get(apiHelloUrl).then(res => {
            console.log(res);
            this.setState({listMes: res.data.message});
        });
    }

    inputChanged(e) {
        this.setState({val: e.nativeEvent.srcElement.value});
    }

    saveValue() {
        // todo: call api/save to save this.state.val in mongodb
        var mes = 'value ' + this.state.val + ' saved !';
        this.setState({savMes: mes});
    }
}

ReactDOM.render(
    <TestMongoDB value="test2db"/>,
    document.getElementById('root')
);
