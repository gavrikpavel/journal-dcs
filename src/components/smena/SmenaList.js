import React from "react";
import PropTypes from 'prop-types'
import SmenaItem from "./SmenaItem";

function SmenaList(props) {
    return (
    props.smenaList.map((smena) => {
      return (
        <SmenaItem
          key={smena.id}
          id={smena.id}
          dateIn={smena.dateIn}
          dateOut={smena.dateOut}
          users={smena.users}
          isActive={smena.active}
          setSmenaRecords={props.setSmenaRecords}
          setActive={props.setActive}
        />
      )}
    )
  )
}

SmenaList.propTypes = {
  smenaList:PropTypes.arrayOf(PropTypes.object).isRequired,
  setSmenaRecords:PropTypes.func,
  setActive:PropTypes.func,
}

export default SmenaList;