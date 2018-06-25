import * as React from "react";
import {Component} from "react";
import * as moment from "moment";
import CalendarCell from "./CalendarCell";


export default class CalendarRow extends Component {

    constructor(props) {
        super(props);

        this.state = {
        }
    }

    renderCellData(calendarCellData) {
        return moment(calendarCellData).format("D")
    }

    render() {
        const {calendarRowData, renderRow} = this.props;
        return (
            <div style={{display: "flex", ...renderRow}}>
                { calendarRowData.map((calendarCell, index) => <CalendarCell calendarCellData={calendarCell} key={index} renderCellData={this.renderCellData}/> ) }
            </div>
        );
    }

}
