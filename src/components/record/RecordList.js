import React from "react";
import PropTypes from 'prop-types'

function RecordList(props) {
  return (
      <ul>
        {props.records.map((record) => <li key={record.id}>{record.date}</li>)}
      </ul>
  )
}

RecordList.propTypes = {
  records: PropTypes.arrayOf(PropTypes.object).isRequired,
}

export default RecordList;
