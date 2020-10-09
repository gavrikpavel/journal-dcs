import React from 'react';
import PropTypes from 'prop-types'

import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';

import MomentLocaleUtils, {
  formatDate,
  parseDate,
} from 'react-day-picker/moment';

import 'moment/locale/ru';
import SmenaList from "./smena/SmenaList";

function DatePicker(props) {
  return (
    <div>
      <DayPickerInput onDayChange={day => props.updateDate(day)}
        formatDate={formatDate}
        parseDate={parseDate}
        format="LL"
        /* eslint-disable-next-line react/prop-types */
        placeholder={`${formatDate(new Date(), 'LL', 'ru')}`}
        dayPickerProps={{
          locale: 'ru',
          localeUtils: MomentLocaleUtils,
        }}
      />
    </div>
  );
}

DatePicker.propTypes = {
  updateDate:PropTypes.func,
}

export default DatePicker;
