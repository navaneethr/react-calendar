import moment from "moment";

export function generateDays(startDate, endDate, days) {
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
    const numOfDaysLeftToFill = days - dates.length;
    let daysOfNextMonth = [];
    for (let i = 1; i <= numOfDaysLeftToFill; i++) { daysOfNextMonth.push(moment(moment(endDate).add(i, "days").clone().toDate())) }
    dates = [...dates, ...daysOfNextMonth];

    return dates;
}

export function colorShades(hex, lum) {

    // validate hex string
    hex = String(hex).replace(/[^0-9a-f]/gi, '');
    if (hex.length < 6) {
        hex = hex[0]+hex[0]+hex[1]+hex[1]+hex[2]+hex[2];
    }
    lum = lum || 0;

    // convert to decimal and change luminosity
    var rgb = "#", c, i;
    for (i = 0; i < 3; i++) {
        c = parseInt(hex.substr(i*2,2), 16);
        c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16);
        rgb += ("00"+c).substr(c.length);
    }

    return rgb;
}