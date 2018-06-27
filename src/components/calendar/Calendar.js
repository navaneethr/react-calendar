import * as React from "react";
import {Component} from "react";
import * as moment from "moment";
import * as _ from "lodash";
import CalendarRow from "./CalendarRow";
import CalendarCell from "./CalendarCell";
import backIcon from "../../assets/back.svg";
import nextIcon from "../../assets/next.svg";
import "../../stylesheets/calendar.css";

export default class Calendar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showCalendar: false,
            currentDate: moment(), //For the current month
            selectedDate: moment()
        }
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

    getStartEndDatesOfMonth(currentDate) {
        // month in moment is 0 based, so 9 is actually october, subtract 1 to compensate
        // array is 'year', 'month', 'day', etc
        const year = currentDate.year();
        const month = currentDate.month();
        const startDate = moment([year, month]);
        const endDate = moment(startDate).endOf('month');

        return { startDate, endDate }
    }

    backBtnClick() {
        this.setState({
            currentDate: moment(this.state.currentDate).subtract(1, 'months')
        })
    }

    nextBtnClick() {
        this.setState({
            currentDate: moment(this.state.currentDate).add(1, 'months')
        })
    }

    setSelectedDate(data) {
        this.setState({ selectedDate: data, showCalendar: false });
        this.props.onCellClick(data)
    }

    componentDidUpdate(prevProps, prevState) {
        if(prevState.selectedDate.month() !== moment(this.state.selectedDate).month()) {
            this.setState({
                currentDate: moment(this.state.selectedDate)
            })
        }
    }

    render() {
        const {inputClassName, renderHeaderCell, rowStyle, style, headerStyle, cellStyle, monthHeaderStyle, cellHoverStyle, onHeaderCellClick} = this.props;
        const {showCalendar, currentDate, selectedDate} = this.state;
        const {startDate, endDate} = this.getStartEndDatesOfMonth(currentDate);

        const days = this.generateDays(startDate,endDate);
        let calendarRows = _.chunk(days, 7);
        const weekDays = moment.weekdays().map((weekday) => weekday);

        return (
            <div style={{width: "auto", position: "relative", ...style}}>
                <input type="text" id="calendar_input" className={inputClassName} name="check" value={selectedDate.format("MM/DD/YYYY")} onClick={this.openCloseCalendar.bind(this)} onChange={() => {}}/>

                {
                    showCalendar &&
                    <div style={{width: "auto", border: "1px solid #c3c3c3", marginTop: "10px", padding: "5px", position: "absolute", borderRadius: "5px", boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"}}>
                        <div style={{textAlign: "center", padding: "5px 2px 2px 2px", height: "40px", boxSizing: "border-box", display: "flex", borderRadius: "5px", fontWeight: "bold",  ...monthHeaderStyle}}>
                            <div style={{display: "flex", width: "35px"}} onClick={this.backBtnClick.bind(this)}><img style={{margin: "auto"}} src={backIcon} width={15} alt="back"/></div>
                            <span style={{margin: "auto"}}>{moment(currentDate).format('MMMM YYYY').toUpperCase()}</span>
                            <div style={{display: "flex", width: "35px"}} onClick={this.nextBtnClick.bind(this)}><img style={{margin: "auto"}} src={nextIcon} width={15} alt="next"/></div>
                        </div>
                        <div style={{display: "flex", margin: "2px"}}>{ weekDays.map((weekDay, index) => <CalendarCell calendarCellData={weekDay} key={index} renderCellData={renderHeaderCell} style={headerStyle} onCellClick={(data) => { onHeaderCellClick(data) }}/> ) }</div>
                        { calendarRows.map((calendarRowData, index) => {
                            return <CalendarRow calendarRowData={calendarRowData} key={index} style={rowStyle(calendarRowData, index)} cellStyle={cellStyle} cellHoverStyle={cellHoverStyle} onCellClick={this.setSelectedDate.bind(this)} currentDateState={currentDate} selectedDate={selectedDate}/>
                        } ) }
                    </div>
                }
            </div>
        );
    }

}
