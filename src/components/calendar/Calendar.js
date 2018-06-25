import * as React from "react";
import {Component} from "react";
import * as moment from "moment";
import * as _ from "lodash";
import CalendarRow from "./CalendarRow";
import CalendarCell from "./CalendarCell";

export default class Calendar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showCalendar: false
        }
        var date = new Date(), y = date.getFullYear(), m = date.getMonth();
        this.firstDayOfMonth = new Date(y, m, 1);
        this.lastDayOfMonth = new Date(y, m + 1, 0);
    }

    openCloseCalendar() {
        this.setState({showCalendar: !this.state.showCalendar})
    }

    generateDays(startDate, endDate) {
        let dates = [];
        const start = moment(startDate).startOf('day');
        const end = moment(endDate).startOf('day');

        // Getting the dates between start and end including start and end
        while(start.add(1, 'days').diff(end) < 0) { dates.push(moment(start.clone().toDate())) }
        dates = [startDate, ...dates, endDate];

        // Getting the days before the start up until previous Sunday
        const dayInWeekStartDate = startDate.day();
        let daysOfPreviousMonth = [];
        for (let i = dayInWeekStartDate; i>0; i--) { daysOfPreviousMonth.push(moment(moment(startDate).subtract(i, "days").clone().toDate())) }
        dates = [...daysOfPreviousMonth, ...dates];

        // Getting the days after the end up until last saturday
        const numOfDaysLeftToFill = 42 - dates.length;
        let daysOfNextMonth = [];
        for (let i = 1; i <= numOfDaysLeftToFill; i++) { daysOfNextMonth.push(moment(moment(endDate).add(i, "days").clone().toDate())) }
        dates = [...dates, ...daysOfNextMonth];

        return dates;
    };

    render() {
        const {inputClassName, renderHeaderCell, style, headerStyle} = this.props;
        const {showCalendar} = this.state;
        const {firstDayOfMonth, lastDayOfMonth} = this;

        const days = this.generateDays(moment(firstDayOfMonth), moment(lastDayOfMonth));
        let calendarRows = _.chunk(days, 7);
        const weekDays = moment.weekdays().map((weekday) => weekday.substring(0,1).toUpperCase());

        return (
            <div style={{width: "210px", position: "relative", ...style}}>
                <input type="text" id="calendar_input" className={inputClassName} name="check" onClick={this.openCloseCalendar.bind(this)} />

                {
                    showCalendar &&
                    <div style={{width: "210px", border: "1px solid #c3c3c3", marginTop: "10px", padding: "5px", position: "absolute"}}>
                        <div style={{textAlign: "center", padding: "5px", height: "30px", boxSizing: "border-box"}}>{moment().format('MMMM')}</div>
                        <div style={{display: "flex"}}>{ weekDays.map((weekDay, index) => <CalendarCell calendarCellData={weekDay} key={index} renderCellData={renderHeaderCell} style={headerStyle}/> ) }</div>
                        { calendarRows.map((calendarRowData, index) => {
                            this.props.renderRow(calendarRowData, index);
                            return <CalendarRow calendarRowData={calendarRowData} key={index} renderRow={this.props.renderRow(calendarRowData, index)}/>
                        } ) }
                    </div>
                }
            </div>
        );
    }

}
