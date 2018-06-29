import * as React from "react";
import {Component} from "react";
import * as moment from "moment";
import "../../stylesheets/heatmap.css";
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
        const firstDayOfYear = moment({ year }).startOf('year');
        const lastDayOfYear = moment({ year }).endOf('year');
        const allDaysOfTheYear = generateDays(firstDayOfYear, lastDayOfYear, DAYS_TO_DISPLAY_YEAR);
        let heatMapWeeks = _.chunk(allDaysOfTheYear, 7);
        return (
            <div>
                <div className="header-parent">
                    <div className="back-next-icon-div" onClick={this.backBtnClick.bind(this)}><img
                        className="margin-auto" src={backIcon} width={15} alt="back"/></div>
                    <span className="margin-auto"></span>
                    <div className="back-next-icon-div" onClick={this.nextBtnClick.bind(this)}><img
                        className="margin-auto" src={nextIcon} width={15} alt="next"/></div>
                </div>
                <div>
                    {
                        heatMapWeeks.map((week, weekIdx) => {
                            return (
                                <div key={weekIdx} style={{display: "inline-block"}}>
                                    {
                                        week.map((day, dayIdx) => {
                                            return (
                                                <div key={dayIdx} className="heat-map-cell" style={{background: colorShades("56b8f7", parseInt(day.format("MM")) * parseInt(day.format("DD"))/100)}}>
                                                    {
                                                        <span className="heat-map-cell-content"></span>
                                                    }
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        )
    }

}
