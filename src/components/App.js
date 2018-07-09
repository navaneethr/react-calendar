import React, { Component } from 'react';
import logo from '../assets/logo.svg';
import '../stylesheets/App.css';
import Calendar from "./calendar/Calendar";
import HeatMap from "./heatmap/HeatMap";

class App extends Component {

    renderHeaderCell(data) {
        return <span style={{fontWeight: "bolder"}}>{data.substring(0,1).toUpperCase()}</span>
    }

    generateRowStyle(data, index) {
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
        const dateArr = [
            {date: "2018-01-27", count: 18},
            {date: "2018-02-28", count: 12},
            {date: "2018-02-23", count: 20},
            {date: "2018-03-24", count: 10},
            {date: "2018-03-25", count: 78},
            {date: "2018-12-26", count: 28},
            {date: "2018-07-23", count: 20},
            {date: "2018-07-23", count: 10},
            {date: "2018-07-25", count: 15},
            {date: "2018-07-26", count: 78},
            {date: "2018-07-27", count: 18},
            {date: "2018-07-28", count: 12},
            {date: "2018-01-23", count: 20},
            {date: "2018-02-24", count: 10},
            {date: "2018-10-26", count: 28},
            {date: "2018-09-27", count: 18},
            {date: "2018-12-28", count: 12},
            {date: "2019-12-28", count: 12},
            {date: "2018-05-23", count: 20},
            {date: "2018-05-24", count: 10},
            {date: "2018-08-26", count: 28},
            {date: "2018-09-27", count: 18},
            {date: "2018-11-28", count: 12},
            {date: "2019-11-28", count: 92}
        ]
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <span className="App-title">React Calendar</span>
                    <span className="title-description">A light weight calendar for your ReactJS web application</span>
                </header>
                <div style={{marginTop: "10px"}}>
                    <h2>Sticky Calendar</h2>
                    <Calendar
                        cellHoverStyle={{background: "#56b8f78a", color: "#000000"}}
                        cellStyle={this.generateCellStyle}
                        headerStyle={{background: "#ffcd00"}}
                        inputClassName="calendar-input"  //ClassName of the input field
                        monthHeaderStyle={{background: "#57baf9", color: "#FFFFFF"}}
                        onCellClick={this.onCellClick}
                        onHeaderCellClick={this.onHeaderCellClick}
                        renderHeaderCell={this.renderHeaderCell}  //Takes a function, has a parameter of "data" and should return a String
                        rowStyle={this.generateRowStyle}  //Takes a function, has a parameter of "data, index" and should return a style object
                        sticky={true}
                        style={{margin: "20px"}}
                    />
                </div>
                <div style={{marginTop: "10px"}}>
                    <h2>Regular Calendar</h2>
                    <Calendar
                        cellHoverStyle={{background: "#56b8f78a", color: "#000000"}}
                        cellStyle={this.generateCellStyle}
                        headerStyle={{background: "#ffcd00"}}
                        inputClassName="calendar-input"  //ClassName of the input field
                        monthHeaderStyle={{background: "#57baf9", color: "#FFFFFF"}}
                        onCellClick={this.onCellClick}
                        onHeaderCellClick={this.onHeaderCellClick}
                        renderHeaderCell={this.renderHeaderCell}  //Takes a function, has a parameter of "data" and should return a String
                        rowStyle={this.generateRowStyle}  //Takes a function, has a parameter of "data, index" and should return a style object
                        style={{margin: "20px"}}
                    />
                    <Calendar
                        cellHoverStyle={{background: "#56b8f78a", color: "#000000"}}
                        cellStyle={this.generateCellStyle}
                        headerStyle={{background: "#ffcd00"}}
                        inputClassName="calendar-input"  //ClassName of the input field
                        monthHeaderStyle={{background: "#57baf9", color: "#FFFFFF"}}
                        onCellClick={this.onCellClick}
                        onHeaderCellClick={this.onHeaderCellClick}
                        renderHeaderCell={this.renderHeaderCell}  //Takes a function, has a parameter of "data" and should return a String
                        rowStyle={this.generateRowStyle}  //Takes a function, has a parameter of "data, index" and should return a style object
                        style={{margin: "20px"}}
                    />
                </div>
                <div style={{marginTop: "10px"}}>
                    <h2>Heat Map Calendar</h2>
                        <HeatMap
                            dates={dateArr}
                            colorCode="#57baf9"
                            cellSize={20}
                        />
                </div>
            </div>
        );
    }
}

export default App;
