import React from 'react';
import {Table, Column} from 'fixed-data-table';

export default (p,a) => {

    // HACK: while fixed-data-table doesn't properly support touch devices
    // see: https://github.com/facebook/fixed-data-table/issues/84
    let overflowY = 'hidden';
    let overflowX = 'hidden';

    const smallColumnWidth = 53;
    const mediumColumnWidth = 106;
    const mobileBreakpointWidth = 599;
    const cellPadding = 8;
    const rowHeight = 60;
    
    let columnWidth = p.ui.screenWidth > mobileBreakpointWidth ? 
                                            mediumColumnWidth : smallColumnWidth;
    let headerHeight = smallColumnWidth;
    let iconWidth = smallColumnWidth - 2 * cellPadding;
    let tableHeight = p.ui.screenHeight - 56;
    let columnsCount = p.columns.enabled.length;
    let rowsCount = p.rows.data.length;
    let tableWidth = p.ui.screenWidth;
    
    let rowClassNameGetter = (index) => (
        (p.rows.headers[index] && p.rows.headers[index][2]) ? 
                                    'rowType' + p.rows.headers[index][2] : ''
    );

    let firstCell = (
        <button
            className='headerCell'
            style={{
                border: 'none', 
                width: '100%', 
                backgroundColor: 'inherit',
                color: '#767677',
                textTransform: 'uppercase'
            }}
            data-type={p.rows.type}
            onClick={a.firstHeaderButtonClick}
        >
            {( p.rows.type === 'list' ?
                p.language.messages.rows.mergeRows :
                p.language.messages.rows.unmergeRows
            )}
        </button>
    );

    let columnHeaderRenderer = (column) => ( (column.icons) ? 
        (
            <img 
                src={column.icons.table}
                width={iconWidth}
                height={iconWidth}
                alt={column.label}
                title={column.label}
            />
        ) : (
            <span>
                {column.label}
            </span>
        )
    );

    let draggableArea = (
        <div style={{
            height: (tableHeight - headerHeight - 20),
            width: (tableWidth - columnWidth),
            position: 'absolute',
            top: headerHeight,
            left: columnWidth,
            opacity: 0.5,
            overflow: 'auto'
        }}>
            <img 
                style={{
                    position: 'absolute',
                    width: columnsCount * columnWidth,
                    height: rowsCount * columnWidth,
                }}
                src="./img/bg01.jpg" 
            />
        </div>
    );


    return (
<div style={{
    position: 'relative'
}}>
    <Table
        width={tableWidth}
        height={tableHeight}
        rowsCount={rowsCount}
        rowHeight={rowHeight}
        headerHeight={headerHeight}
        rowGetter={(index) => (p.rows.data[index]) }
        rowClassNameGetter={rowClassNameGetter}
        overflowY={overflowY}
        overflowX={overflowX}
    >
        <Column
            fixed={true}
            dataKey={0}
            flexGrow={1}
            align='center'
            width={columnWidth}
            headerRenderer={() => (firstCell) }
            cellRenderer={(cellData, cellDataKey, rowData, rowIndex) => 
                                            (p.rows.headers[rowIndex][0]) }
        />
    {p.columns.enabled.map( (column, key) => (
        <Column
            key={key}
            dataKey={key}
            flexGrow={1}
            align='center'
            width={columnWidth}
            headerRenderer={() => columnHeaderRenderer(column) }
            cellRenderer={(cellData, cellDataKey, rowData, rowIndex) => 
                                            (p.rows.data[rowIndex][cellDataKey]) }
        />
    ))}
    </Table>
</div>
    );
}
