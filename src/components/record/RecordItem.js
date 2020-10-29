import React from "react";
import PropTypes from 'prop-types'
import Popup from "reactjs-popup";

const contentStyle = {
  width: '100px'
};

const styles = {
  signatureTip: {
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '50px',
    height: '50px',
    display: 'block',
  },
  signatureImg: {
    cursor: 'pointer',
  },
};

function RecordItem(props) {
  let pin = props.pinned === 1 ? '★' : '☆';
  return (
    <tr>
      <td>
        {props.date}
      </td>
      <td>
        {props.text}
      </td>
      <td className="not-swap">
        {props.comment}
      </td>
      <td>
        <Popup
          trigger={open => (
            <div style={styles.signatureImg}>
              {props.signature
                ? <img src={props.signature} width="30px" height="20px"/>
                : null
              }
            </div>
          )}
          position="right center"
          closeOnDocumentClick
          {...{ contentStyle }}
        >
          <img src={props.signature} style={styles.signatureTip} />
        </Popup>

      </td>
      <td className="td-pinned">
        <button onClick={() => props.pinRecord(props.id)}>{pin}</button>
      </td>
    </tr>
  )
}

RecordItem.propTypes = {
  id: PropTypes.number.isRequired,
  date: PropTypes.string.isRequired,
  text: PropTypes.string,
  comment: PropTypes.string,
  signature: PropTypes.string,
  pinRecord: PropTypes.func,
  pinned: PropTypes.number,
}

export default RecordItem;
