import React from "react";
import PropTypes from 'prop-types'
import PinnedItem from "../pinned/PinnedItem";
import '../../styles/Record.css';

function PinnedList(props) {
  return (
    props.records.map((record) => {
      return (
        <PinnedItem
          key={record.id}
          id={record.id}
          date={record.date}
          text={record.text}
          comment={record.comment}
          pinRecord={props.pinRecord}
        />
      )}
    )
  )
}

PinnedList.propTypes = {
  records:PropTypes.arrayOf(PropTypes.object).isRequired,
  pinRecord:PropTypes.func,
}

export default PinnedList;
