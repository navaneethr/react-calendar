import * as React from "react";
import {Component} from "react";
import * as moment from "moment";
import "../../stylesheets/calendar.css";

export default class CalendarCell extends Component {

    constructor(props) {
        super(props);

        this.state = {
            selectedDate: null,
            hover: false
        }
    }

    onMouseEnterLeave(e) {
        this.setState({
            hover: !this.state.hover
        })
    }

    render() {
        const {calendarCellData, renderCellData, style, cellStyle, cellHoverStyle, onCellClick, currentDateState} = this.props;
        const styles = (style !== undefined) ? style : ( (moment(calendarCellData).month() === moment(currentDateState).month()) ? {} :{background: "#e8e8e8"} );
        const selectedCellStyle = (moment(calendarCellData).format("YYMMDD") === moment(this.props.selectedDate).format("YYMMDD")) ? {background: "#56b8f7", color: "#FFFFFF"} : {};
        const cellStyles = (cellStyle !== undefined) ? cellStyle(calendarCellData) : {};
        const hoverStyle = this.state.hover ? (cellHoverStyle ? cellHoverStyle : {}) : {};

        return (
            <div onClick={() => { onCellClick(calendarCellData) }} onMouseEnter={this.onMouseEnterLeave.bind(this)} onMouseLeave={this.onMouseEnterLeave.bind(this)} className="individual-date-cell" style={{...styles, ...cellStyles, ...selectedCellStyle, ...hoverStyle}}>
                <span style={{margin: "auto"}}>{renderCellData(calendarCellData)}</span>
            </div>
        );
    }

}
