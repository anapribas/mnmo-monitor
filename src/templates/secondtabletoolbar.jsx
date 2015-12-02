export default (p, a) =>
<div
    id={'secondTableToolbar'}
    style={{
        width: '100%',
        backgroundColor: 'rgba(255,255,255,0.2)',
        height: 50,
        lineHeight: '50px',
        overflow: 'hidden',
        display: 'table'
    }}
>
    <div
        id={'secondTableToolbarLeft'}
        style={{
            display: 'table-cell',
            width: '20%'
        }}
    >
        <span
            id={'secondTabtleToolbarTitle'}
            style={{
                color: '#389D97',
                marginLeft: 10
            }}
        >
            {p.language.messages.rows.secondTable}
        </span>
    </div>
    <div
        id={'secondTableToolbarCenter'}
        style={{
            display: 'table-cell',
            width: '50%',
            fontSize: 12,
            textAlign: 'center'
        }}
    >
        <label
            htmlFor={'secondTableVarsCombo'}
            style={{
                marginRight: 10
            }}
        >
            {p.language.messages.vars.title}
        </label>
        <select
            id={'secondTableVarsCombo'}
            onChange={a.onVarChange}
            onBlur={a.onVarChange}
            value={p.user.newSecondaryRow.variableComboID}
        >
            { p.vars.rawCombos.map( (item, key) => (
                <option
                    key={key}
                    value={item.id}
                >
                    {item.label}
                </option>
            ))}
        </select>
        <label
            htmlFor={'secondTableRangeDateCombo'}
            style={{
                marginLeft: 10,
                marginRight: 10
            }}
        >
            {p.language.messages.rows.range}
        </label>
        <input
            type={'text'}
            id={'secondTableRangeDateCombo'}
            placeholder={'DD/MM/YYYY'}
            style={{
                width: 80
            }}
            value={p.user.newSecondaryRow.day}
            onChange={a.onDayChange}
            onBlur={a.onDayChange}
        >
        </input>
        <input
            type={'text'}
            id={'secondTableBeginHour'}
            placeholder={'HH:MM'}
            style={{
                width: 40
            }}
            value={p.user.newSecondaryRow.startTime}
            onChange={a.onStartTimeChange}
            onBlur={a.onStartTimeChange}
        >
        </input>
        <input
            type={'text'}
            id={'secondTableEndHour'}
            placeholder={'HH:MM'}
            style={{
                width: 40
            }}
            value={p.user.newSecondaryRow.endTime}
            onChange={a.onEndTimeChange}
            onBlur={a.onEndTimeChange}
        >
        </input>
        <div
            className={'addRowButton'}
            style={{
                marginLeft: 10,
                border: '2px solid white',
                color: 'white',
                backgroundColor: 'black',
                borderRadius: 20,
                width:  20,
                height: 20,
                fontSize: 20,
                lineHeight: '20px',
                cursor: 'pointer',
                textAlign: 'center',
                display: 'inline-block'
            }}
            onClick={a.onAddClicked}
        >
            +
        </div>
    </div>
    <div
        id={'secondTableToolbarRight'}
        style={{
            display: 'table-cell',
            fontSize: 12,
            textAlign: 'center',
            cursor: 'pointer',
            width: '15%'
        }}
    >
        <div
            style={{
                cursor: 'pointer'
            }}
            onClick={a.onAutoUpdateClicked}
        >
            {p.language.messages.settings.autoUpdateStatus}
            <div
                style={{
                    width: 10,
                    height: 10,
                    borderRadius: 10,
                    display: 'inline-block',
                    backgroundColor: p.user.newSecondaryRow.autoUpdate === true ?
                                                    '#389D97':
                                                    'rgba(255, 255, 255, 0.5)',
                    marginLeft: 10
                }}
            >
            </div>
        </div>
    </div>
</div>;
