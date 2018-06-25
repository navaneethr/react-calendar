import React, { Component } from 'react';
import logo from '../assets/logo.svg';
import '../stylesheets/App.css';
import Calendar from "./calendar/Calendar";

class App extends Component {

    renderHeaderCell(data) {
        return <span style={{fontWeight: "bolder"}}>{data}</span>
    }

    generateRowStyle(data, index) {
        const style = (index % 2 === 0) ? {} : {background: "white"}
        return style;
    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <h3 className="App-title">react-calendar</h3>
                </header>
                <div style={{width: "100%", height: "1000px", display: "flex"}}>
                    <Calendar
                        inputClassName="calendar-input"  //ClassName of the input field
                        renderHeaderCell={this.renderHeaderCell}  //Takes a function, has a parameter of "data" and should return a String
                        renderRow={this.generateRowStyle}  //Takes a function, has a parameter of "data, index" and should return a style object
                        style={{margin: "auto"}}
                        headerStyle={{background: "#FFFFFF"}}
                    />
                </div>
            </div>
        );
    }
}

export default App;
