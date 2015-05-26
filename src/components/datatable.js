import template from '../templates/datatable.jsx';
import merge from 'lodash/object/merge';

const smallColumnWidth = 60;
const mediumColumnWidth = 106;
const mobileBreakpointWidth = 599;
const cellPadding = 8;
const rowHeight = 60;
const appHeaderHeight = 55;
const chartHeight = 264;

class DataTable {
    render() {
        const rowsActions = this.props.flux.getActions('rows');
        let actions = {
            firstHeaderButtonClick: (event) => 
                rowsActions.rowsTypeSwitchClicked(
                    event.target.getAttribute('data-type')
                )
        };
        let p = merge({}, this.props),
            isMobile = (p.ui.screenWidth <= mobileBreakpointWidth),
            columnWidth = isMobile ? smallColumnWidth : mediumColumnWidth,
            iconWidth = smallColumnWidth - 2 * cellPadding;
        p.tableWidth = p.ui.screenWidth;
        p.tableContentWidth = p.columns.enabled.length * columnWidth;
        p.tableHeight = p.ui.screenHeight - 
                            appHeaderHeight - 
                            (isMobile ? 0 : chartHeight);
        p.columnWidth = columnWidth;
        p.rowHeight = rowHeight;
        p.iconWidth = iconWidth;
        p.cellPadding = cellPadding;
        return template(p, actions);
    }
}

export default DataTable;
