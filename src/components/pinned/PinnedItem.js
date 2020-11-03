import React from "react";
import PropTypes from 'prop-types'

function PinnedItem(props) {
  const styles = {
    main: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      border: '1px solid #e0e0e0',
      boxShadow: '0 1px 5px rgba(0,0,0,0.25), 0 1px 1px rgba(0,0,0,0.22)',
      background: '#fffde7',
      padding: '0',
      margin: '5px 0 5px 0',
    },
    data: {
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
    },
    elem: {
      display: 'flex',
      flexDirection: 'column',
      margin: '1px',
    },
    button: {
      display: 'flex',
      flexDirection: 'column',
      margin: '1px',
      cursor: 'pointer',
    },
    date: {
      display: 'flex',
      flexDirection: 'column',
      margin: '1px',
      alignItems: 'flex-end',
      fontSize: 'smaller',
    }
  }

  return (
    <div style={styles.main}>
      <button
        style={styles.button}
        onClick={() => props.pinRecord(props.id)}
      >★</button>
      <div style={styles.data}>
        <p style={styles.elem}>{props.text}</p>
        <p style={styles.elem}>{props.comment}</p>
        <p style={styles.date}>{props.date}</p>
      </div>
    </div>
  )
}

PinnedItem.propTypes = {
  id: PropTypes.number.isRequired,
  date: PropTypes.string.isRequired,
  text: PropTypes.string,
  comment: PropTypes.string,
  pinRecord: PropTypes.func,
}

export default PinnedItem;
