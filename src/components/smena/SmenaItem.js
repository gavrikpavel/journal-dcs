import React from "react";
import PropTypes from 'prop-types'

function SmenaItem(props) {
  const styles = {
    div: {
      border: '1px solid black',
      cursor: 'pointer',
      background: props.isActive ? '#4dd0e1' : '#f8f8f8',
      boxShadow: '0 1px 5px rgba(0,0,0,0.25), 0 1px 1px rgba(0,0,0,0.22)',
      padding: '0',
      margin: '5px 0 5px 0',
    }
  }
  return (
    <div style={styles.div} onClick={() => { {props.setSmenaRecords(props.dateIn, props.dateOut); props.setActive(props.id)} }}>
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
  id: PropTypes.number.isRequired,
  dateOut: PropTypes.string,
  users: PropTypes.array.isRequired,
  isActive: PropTypes.bool,
  setSmenaRecords: PropTypes.func,
  setActive: PropTypes.func,
}

export default SmenaItem;
