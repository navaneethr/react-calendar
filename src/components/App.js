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
        const style = (index % 2 === 0) ? {} : {background: "white"}
        return style;
    }

    generateCellStyle(data) {
        const style = moment(data).format("MMDDYY") === moment().format("MMDDYY") ? { cursor: "pointer"} : {cursor: "pointer"};
        return style
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
                    <h3 className="App-title">REACT CALENDAR</h3>
                </header>
                <div style={{width: "100%", height: "auto", marginTop: "20px", display: "flex"}}>
                    <Calendar
                        inputClassName="calendar-input"  //ClassName of the input field
                        renderHeaderCell={this.renderHeaderCell}  //Takes a function, has a parameter of "data" and should return a String
                        rowStyle={this.generateRowStyle}  //Takes a function, has a parameter of "data, index" and should return a style object
                        style={{margin: "auto"}}
                        cellStyle={this.generateCellStyle}
                        headerStyle={{background: "#ffcd00"}}
                        monthHeaderStyle={{background: "#5fe08f"}}
                        cellHoverStyle={{background: "red", color: "#FFFFFF"}}
                        onCellClick={this.onCellClick}
                        onHeaderCellClick={this.onHeaderCellClick}
                    />
                </div>
            </div>
        );
    }
}

export default App;
