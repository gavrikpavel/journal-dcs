import React from "react";
import PropTypes from 'prop-types'

const styles = {
  div: {
    border: '1px solid black',
    cursor: 'pointer'
  }
}
function SmenaItem(props) {
  return (
    <div style={styles.div} onClick={() => props.setSmenaRecords(props.dateIn, props.dateOut)}>
      <p>{props.dateIn}</p>
      <p>{props.dateOut}</p>
      <ul>
        {props.users.map((user, index) => <li key={index}>{user}</li>)}
      </ul>
    </div>
  )
}

SmenaItem.propTypes = {
  dateIn: PropTypes.string.isRequired,
  dateOut: PropTypes.string,
 users: PropTypes.array.isRequired,
  setSmenaRecords: PropTypes.func,
}

export default SmenaItem;
