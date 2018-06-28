# React Calendar

### Demo

- npm install
- npm start

![React Calendar](https://github.com/navaneethr/react-calendar/blob/master/src/assets/demo.png) 

### Props

| name              | type                                                     | description                                                   |
|-------------------|----------------------------------------------------------|---------------------------------------------------------------|
| cellHoverStyle    | `Object`                                                 | style of the cell when the user hovers on it                  |
| cellStyle         | `(current:moment) => Object`                             | general cell style                                            |
| headerStyle       | `Object`                                                 | style of all the week headers from Sunday to Monday           |
| inputClassName    | `String`                                                 | css className for the input field                             |
| monthHeaderStyle  | `Object`                                                 | style of the month header in the calendar                     |
| onCellClick       | `(current:moment) => { ... }`                            | function called when the user clicks on the cell              |
| onHeaderCellClick | `(current:moment) => { ... }`                            | function called when the user clicks on the week header cells |
| renderHeaderCell  | `(day: string) => React.Node`                            | function to render the week header cell                       |
| rowStyle          | `(rowData:Array[moment], index: number) => Object`       | function to render styles of each row in the calendar         |
| style             | `Object`                                                 | style of the parent div of the component                      |