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

export function colorShades(col, amt) {

    var usePound = false;

    if (col[0] == "#") {
        col = col.slice(1);
        usePound = true;
    }

    var num = parseInt(col,16);

    var r = (num >> 16) + amt;

    if (r > 255) r = 255;
    else if  (r < 0) r = 0;

    var b = ((num >> 8) & 0x00FF) + amt;

    if (b > 255) b = 255;
    else if  (b < 0) b = 0;

    var g = (num & 0x0000FF) + amt;

    if (g > 255) g = 255;
    else if (g < 0) g = 0;

    return (usePound?"#":"") + (g | (b << 8) | (r << 16)).toString(16);

}