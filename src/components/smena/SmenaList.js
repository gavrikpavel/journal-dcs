import React from "react";
import PropTypes from 'prop-types'
import SmenaItem from "./SmenaItem";

function SmenaList(props) {
  return (
    props.smenaList.map((smena) => {
      return (
        <SmenaItem
          dateIn={smena.dateIn}
          dateOut={smena.dateOut}
          users={smena.users}
          key={smena.id}
          setSmenaRecords={props.setSmenaRecords}
        />
      )}
    )
  )
}

SmenaList.propTypes = {
  smenaList:PropTypes.arrayOf(PropTypes.object).isRequired,
  setSmenaRecords:PropTypes.func,
}

export default SmenaList;