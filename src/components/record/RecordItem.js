import React from "react";
import PropTypes from 'prop-types'

function RecordItem(props) {
  return (
    <tr>
      <td>
        {props.date}
      </td>
      <td>
        {props.text}
      </td>
      <td>
        {props.comment}
      </td>
      <td>
        {props.pinned}
      </td>
      <td>
        {props.signature}
      </td>
    </tr>
  )
}

RecordItem.propTypes = {
  date: PropTypes.string.isRequired,
  text: PropTypes.string,
  comment: PropTypes.string,
  pinned: PropTypes.number.isRequired,
  signature: PropTypes.string,
}

export default RecordItem;
