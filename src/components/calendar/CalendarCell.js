import * as React from "react";
import {Component} from "react";
import * as moment from "moment";

export default class CalendarCell extends Component {

    constructor(props) {
        super(props);

        this.state = {
            selectedDate: null
        }
    }

    onCellClick(calendarCellData) {
        console.log(moment(calendarCellData).format())
        this.setState({
            selectedDate: moment(calendarCellData)
        })
    }

    render() {

        const {calendarCellData, renderCellData, style} = this.props;
        const cellStyle = (style !== undefined) ? style : ( (moment(calendarCellData).month() === moment().month()) ? {} :{background: "#c3c3c3"} );
        return (
            <label onClick={this.onCellClick.bind(this, calendarCellData)} style={{display: "flex", width: "30px", height: "30px", flexDirection: "column", ...cellStyle}}>
                <span style={{margin: "auto"}}>{renderCellData(calendarCellData)}</span>
            </label>
        );
    }

}
