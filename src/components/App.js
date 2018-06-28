import React, { Component } from 'react';
import logo from '../assets/logo.svg';
import '../stylesheets/App.css';
import Calendar from "./calendar/Calendar";
import * as moment from "moment";

class App extends Component {

    renderHeaderCell(data) {
        return <span style={{fontWeight: "bolder"}}>{data.substring(0,1).toUpperCase()}</span>
    }

    generateRowStyle(data, index) {
        console.log(data);
        const style = (index % 2 === 0) ? {} : {background: "white"}
        return style;
    }

    generateCellStyle(data) {
        return {};
    }

    onCellClick(data) {
        console.log(data);
    }

    onHeaderCellClick(data) {
        console.log(data)
    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <h4 className="App-title">React Calendar</h4>
                </header>
                <div style={{marginTop: "10px"}}>
                    <Calendar
                        cellHoverStyle={{background: "red", color: "#FFFFFF"}}
                        cellStyle={this.generateCellStyle}
                        headerStyle={{background: "#ffcd00"}}
                        inputClassName="calendar-input"  //ClassName of the input field
                        monthHeaderStyle={{background: "#5fe08f"}}
                        onCellClick={this.onCellClick}
                        onHeaderCellClick={this.onHeaderCellClick}
                        renderHeaderCell={this.renderHeaderCell}  //Takes a function, has a parameter of "data" and should return a String
                        rowStyle={this.generateRowStyle}  //Takes a function, has a parameter of "data, index" and should return a style object
                        style={{margin: "20px"}}
                    />
                    <Calendar
                        cellHoverStyle={{background: "red", color: "#FFFFFF"}}
                        cellStyle={this.generateCellStyle}
                        headerStyle={{background: "#ffcd00"}}
                        inputClassName="calendar-input"  //ClassName of the input field
                        monthHeaderStyle={{background: "#5fe08f"}}
                        onCellClick={this.onCellClick}
                        onHeaderCellClick={this.onHeaderCellClick}
                        renderHeaderCell={this.renderHeaderCell}  //Takes a function, has a parameter of "data" and should return a String
                        rowStyle={this.generateRowStyle}  //Takes a function, has a parameter of "data, index" and should return a style object
                        style={{margin: "20px"}}
                    />
                </div>
            </div>
        );
    }
}

export default App;
