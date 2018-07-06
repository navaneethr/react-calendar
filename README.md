# React Calendar

### Demo

- npm install
- npm start
### React Calendar

| Regualr Calendar                                                                                | Sticky Calendar                                                                                   |
|-------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------|
| ![React Calendar](https://github.com/navaneethr/react-calendar/blob/master/src/assets/demo.png) | ![React Calendar](https://github.com/navaneethr/react-calendar/blob/master/src/assets/sticky.png) |
   

### Props

| name              | type                                                     | description                                                                    |
|-------------------|----------------------------------------------------------|--------------------------------------------------------------------------------|
| cellHoverStyle    | `Object`                                                 | style of the cell when the user hovers on it                                   |
| cellStyle         | `(current: moment) => Object`                            | general cell style                                                             |
| headerStyle       | `Object`                                                 | style of all the week headers from Sunday to Monday                            |
| inputClassName    | `String`                                                 | css className for the input field                                              |
| monthHeaderStyle  | `Object`                                                 | style of the month header in the calendar                                      |
| onCellClick       | `(current: moment) => { ... }`                           | function called when the user clicks on the cell                               |
| onHeaderCellClick | `(day: String) => { ... }`                               | function called when the user clicks on the week header cells                  |
| renderHeaderCell  | `(day: String) => React.Node`                            | function to render the week header cell                                        |
| rowStyle          | `(rowData: Array[moment], index: number) => Object`      | function to render styles of each row in the calendar                          |
| sticky            | `Boolean`                                                | a sticky calendar instead of an input calendar, by default, it is set to false |
| style             | `Object`                                                 | style of the parent div of the component                                       |

### React Heat Map

![React Heat Map](https://github.com/navaneethr/react-calendar/blob/master/src/assets/heatmap.png) 

### Props

| name              | type                                                     | description                                                                    |
|-------------------|----------------------------------------------------------|--------------------------------------------------------------------------------|
| dates             | `{date: "YYYY-MM-DD", count:  number}[]`            | Array of Objects with date and count of the measure                            |
| colorCode         | `String`                                                 | Color Hexcode                                                                  |
| cellSize          | `Number`                                                 | The size of the cell, basically it is the width and height of the cell         |