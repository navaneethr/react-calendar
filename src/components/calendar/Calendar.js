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
            currentDate: moment(),
            selectedDate: moment()
        }
    }

    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside.bind(this));
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside.bind(this));
    }

    setCalendarWrapperRef(node) {
        this.calendarWrapperRef = node;
    }

    handleClickOutside(event) {
        if (this.calendarWrapperRef && !this.calendarWrapperRef.contains(event.target)) {
            this.setState({showCalendar: false})
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
        this.setState({ currentDate: moment(this.state.currentDate).subtract(1, 'months') })
    }

    nextBtnClick() {
        this.setState({ currentDate: moment(this.state.currentDate).add(1, 'months') })
    }

    setSelectedDate(data) {
        this.setState({ selectedDate: data, showCalendar: false });
        this.props.onCellClick(data)
    }

    componentDidUpdate(prevProps, prevState) {
        if(prevState.selectedDate.month() !== moment(this.state.selectedDate).month()) {
            this.setState({ currentDate: moment(this.state.selectedDate) })
        }
    }

    render() {
        const {inputClassName, renderHeaderCell, rowStyle, style, headerStyle, cellStyle, monthHeaderStyle, cellHoverStyle, onHeaderCellClick, sticky} = this.props;
        const {showCalendar, currentDate, selectedDate} = this.state;
        const {startDate, endDate} = this.getStartEndDatesOfMonth(currentDate);

        const days = this.generateDays(startDate,endDate);
        let calendarRows = _.chunk(days, 7);
        const weekDays = moment.weekdays().map((weekday) => weekday);
        const showCalendarBool = sticky ? sticky : showCalendar;
        const stickyClassName = sticky ? "calendar-parent-div sticky-calendar" : "calendar-parent-div"

        return (
            <div style={{height: "auto", display: "flex", width: "auto", position: "relative", display: "inline-block", ...style}} ref={this.setCalendarWrapperRef.bind(this)}>
                {
                    !sticky && <input type="text" id="calendar_input" className={inputClassName} name="check" value={selectedDate.format("MM/DD/YYYY")} onClick={this.openCloseCalendar.bind(this)} onChange={() => {}}/>
                }
                {
                    showCalendarBool &&
                    <div className={stickyClassName}>
                        <div className="header-parent" style={{...monthHeaderStyle}}>
                            <div className="back-next-icon-div" onClick={this.backBtnClick.bind(this)}><img className="margin-auto" src={backIcon} width={15} alt="back"/></div>
                            <span className="margin-auto">{moment(currentDate).format('MMMM YYYY').toUpperCase()}</span>
                            <div className="back-next-icon-div" onClick={this.nextBtnClick.bind(this)}><img className="margin-auto"src={nextIcon} width={15} alt="next"/></div>
                        </div>
                        <div className="week-header-cell">{ weekDays.map((weekDay, index) => <CalendarCell calendarCellData={weekDay} key={index} renderCellData={renderHeaderCell} style={headerStyle} onCellClick={(data) => { onHeaderCellClick(data) }}/> ) }</div>
                        {
                            calendarRows.map((calendarRowData, index) => {
                            return <CalendarRow calendarRowData={calendarRowData} key={index} style={rowStyle(calendarRowData, index)} cellStyle={cellStyle} cellHoverStyle={cellHoverStyle} onCellClick={this.setSelectedDate.bind(this)} currentDateState={currentDate} selectedDate={selectedDate}/>
                            } )
                        }
                    </div>
                }
            </div>
        );
    }

}
