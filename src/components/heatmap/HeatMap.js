import * as React from "react";
import {Component} from "react";
import * as moment from "moment";
import Tooltip from 'rc-tooltip';
import "../../stylesheets/heatmap.css";
import "rc-tooltip/assets/bootstrap_white.css";
import backIcon from "../../assets/back.svg";
import nextIcon from "../../assets/next.svg";
import {colorShades, generateDays} from "../../utils/utilFunctions/utilities";
import {DAYS_TO_DISPLAY_YEAR} from "../../constants/calendarContants";
import * as _ from "lodash";

export default class HeatMap extends Component {

    constructor(props) {
        super(props);

        this.state = {
            today: moment(),
            year: moment().year()
        }
    }

    backBtnClick() {
        this.setState({
            year: this.state.year - 1
        })
    }

    nextBtnClick() {
        this.setState({
            year: this.state.year + 1
        })
    }

    render() {
        const {today, year} = this.state;
        const { dates, colorCode, cellSize } = this.props;
        const months = moment.monthsShort();
        const weekDays = moment.weekdays().map((weekday) => weekday.substring(0,1));
        let obj = {};
        obj = dates.reduce((accumulator, currentvalue) => ({...accumulator, [currentvalue.date] : currentvalue.count}), {});
        const firstDayOfYear = moment({ year }).startOf('year');
        const lastDayOfYear = moment({ year }).endOf('year');
        const allDaysOfTheYear = generateDays(firstDayOfYear, lastDayOfYear, DAYS_TO_DISPLAY_YEAR);
        let heatMapWeeks = _.chunk(allDaysOfTheYear, 7);
        return (
            <div style={{overflowX: "auto"}}>
                <div style={{width: 54*cellSize + 2, margin: "auto"}}>
                    <div className="header-parent" style={{width: 53*cellSize, marginLeft: cellSize}}>
                        <div className="back-next-icon-div" onClick={this.backBtnClick.bind(this)}><img
                            className="margin-auto" src={backIcon} width={15} alt="back"/></div>
                        <span className="margin-auto">{year}</span>
                        <div className="back-next-icon-div" onClick={this.nextBtnClick.bind(this)}><img
                            className="margin-auto" src={nextIcon} width={15} alt="next"/></div>
                    </div>
                    <div>
                        <div style={{width: (53 * cellSize) + 2, marginLeft: cellSize}} className="month-cell-container">
                            {
                                months.map((month, index) => {
                                    return <div key={index} className="heatmap-month-cell" style={{display: "inline-block", width: 4.45 * cellSize}}>{month}</div>
                                })
                            }
                        </div>
                        <div style={{display: "inline-block", verticalAlign: "bottom", marginRight: "2px"}}>
                            {
                                weekDays.map((day, index) => {
                                    return <label key={index} className="heat-map-cell" style={{fontSize: "10px", height: cellSize, width: cellSize, display: "flex", fontWeight: "bold"}}><span style={{margin: "auto"}}>{day}</span></label>
                                })
                            }
                        </div>
                        {
                            heatMapWeeks.map((week, weekIdx) => {
                                return (
                                    <div key={weekIdx} style={{display: "inline-block"}}>
                                        {
                                            week.map((day, dayIdx) => {
                                                let colorShade = (typeof obj[day.format("YYYY-MM-DD")] !== 'undefined') ? colorShades(colorCode, 50 - obj[day.format("YYYY-MM-DD")])  : "#e8ecf2" ;
                                                return (
                                                    <Tooltip
                                                        overlay={<div><h3>Date: {day.format("YYYY-MM-DD")}</h3><h3>Count: {obj[day.format("YYYY-MM-DD")] ? obj[day.format("YYYY-MM-DD")] : 0}</h3></div>}
                                                        placement="top"
                                                        trigger={['click']}
                                                        mouseEnterDelay={0}
                                                        mouseLeaveDelay={0}
                                                        destroyTooltipOnHide={true}
                                                        overlayStyle={{width: "200px", borderRadius: "10px"}}
                                                    >
                                                        <label key={dayIdx} className="heat-map-cell" style={{background: colorShade, height: cellSize, width: cellSize}}>
                                                            { <span className="heat-map-cell-content"></span> }
                                                        </label>
                                                    </Tooltip>
                                                )
                                            })
                                        }
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        )
    }

}
