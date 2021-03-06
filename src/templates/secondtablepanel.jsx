import React from 'react';
import Dialog from 'mnmo-components/lib/themes/mnmo/dialog';
import Drawer from 'mnmo-components/lib/themes/mnmo/drawer';
import List from 'mnmo-components/lib/themes/mnmo/list';
import LI from 'mnmo-components/lib/themes/mnmo/li';
import Switch from 'mnmo-components/lib/themes/mnmo/switch';
import MultiPicker from 'mnmo-components/lib/themes/mnmo/multipicker';
import DayPicker from 'react-day-picker';
import moment from 'moment';

const fullScreenLimit = 400;
const localeCodes = ['','pt','es','en'];

let startHours =[],
    endHours = [],
    minutes = [];

for (let h = 0; h < 24; h++){
    startHours.push({label: h < 10 ? '0' + h : '' + h, value: h});
}
for (let h = 0; h < 24; h++){
    // let f = (h + 6) % 24;
    let f = h;
    endHours.push({label: f < 10 ? '0' + f : '' + f, value: f});
}
for (let m = 0; m < 60; m++){
    minutes.push({label: m < 10 ? '0' + m : '' + m, value: m});
}

export default (p, a) => {


    let autoUpdateSwitch = (
        <List>
            <LI>
                <Switch
                    id="secondaryAutoUpdateToggle"
                    onChange={a.autoUpdateChange}
                    isItem={true}
                    checked={p.rows.secondary.autoUpdate}
                >
                    {p.language.messages.settings.autoUpdate}
                </Switch>
            </LI>
        </List>
    );

    let varsPicker = (
        <MultiPicker
            title={p.language.messages.vars.title}
            cells={[
                {
                    label: p.language.messages.vars.input1,
                    value: p.user.newSecondaryRow.primaryVarLabel,
                    options: p.vars.primary,
                    onChange: a.firstVarChange
                },
                {
                    label: p.language.messages.vars.input2,
                    value: p.user.newSecondaryRow.secondaryVarLabel,
                    options: p.user.newSecondaryRow.secondaryVarOptions,
                    onChange: a.secondVarChange
                }
            ]}
        />
    );



    let selectedDay = p.user.newSecondaryRow.day;
    // let initialMonth = moment(selectedDay);
    let modifiers = {
        selected: (day) => (selectedDay === moment(day).format('YYYY-MM-DD')),
        disabled: (d) => {
            let result = false,
                day = moment(d),
                month = day.format('YYYYMM'),
                dayIndex = (day.date() - 1),
                storedMonth = p.calendar.months[month];
            if (day.startOf('day').isAfter(moment().startOf('day'))) {
                return true;
            }
            if (storedMonth && storedMonth[dayIndex]){
                result = (storedMonth[dayIndex] === '0');
            }
            return result;
        }
    };

    let datePicker = (p.rows.secondary.autoUpdate === true) ? null : (
        <List
            title={p.language.messages.rows.date}
        >
            <div style={{marginLeft:-10}}>
            <DayPicker
                localeUtils={p.language.localeUtils}
                locale={localeCodes[p.user.languageID]}
                modifiers={modifiers}
                onDayClick={a.calendarDayClick}
                onMonthChange={a.monthChange}
                enableOutsideDays={true}
            />
            </div>
        </List>
    );




    let startingHour = parseInt(p.user.newSecondaryRow.startTime.split(':')[0]);
    let startingMinute = parseInt(p.user.newSecondaryRow.startTime.split(':')[1]);
    let startingTime =  (
        <MultiPicker
            title={p.language.messages.rows.startingTime}
            cells={[
                {
                    label: p.language.messages.rows.hour,
                    value: startingHour,
                    options: startHours,
                    onChange: a.startHourChange
                },
                {
                    label: p.language.messages.rows.minute,
                    value: startingMinute,
                    options: minutes,
                    onChange: a.startMinuteChange
                }
            ]}
        />
    );
    let endingHour = parseInt(p.user.newSecondaryRow.endTime.split(':')[0]);
    let endingMinute = parseInt(p.user.newSecondaryRow.endTime.split(':')[1]);
    let endingTime = (p.rows.secondary.autoUpdate === true) ? null : (
        <MultiPicker
            title={p.language.messages.rows.endingTime}
            cells={[
                {
                    label: p.language.messages.rows.hour,
                    value: endingHour,
                    options: endHours,
                    onChange: a.endHourChange
                },
                {
                    label: p.language.messages.rows.minute,
                    value: endingMinute,
                    options: minutes,
                    onChange: a.endMinuteChange
                }
            ]}
        />
    );

    let isFullscreen = p.ui.screenWidth < fullScreenLimit;
    // let isFullscreen = true;
    return (
<Dialog align='center' fullscreen={isFullscreen}>
    <Drawer
        title={p.language.messages.rows.secondTable}
        closeLabel={p.language.messages.settings.close}
        onCloseClick={a.closePanel}
        saveLabel={p.language.messages.settings.save}
        onSaveClick={a.savePanel}
        fullHeight={true}
        fullscreen={isFullscreen}
    >
        <div style={{
            height: '90%',
            overflow: 'auto'
        }}>
            {autoUpdateSwitch}
            {varsPicker}
            {datePicker}
            {startingTime}
            {endingTime}
        </div>
    </Drawer>
</Dialog>
    );
}
