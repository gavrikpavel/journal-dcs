import React, {useEffect, useState} from "react";
import PropTypes from 'prop-types'
import RecordItem from "./RecordItem";
import '../../styles/Record.css';

function RecordTable(props) {
  let [records, setRecords] = useState(props.records);
  let [sort, setSort] = useState('asc');
  let [fieldRow, setFieldRow] = useState('');

  useEffect(() => {
    records = props.records.slice();
    records.sort(function (a,b) {
      if (a['date'] < b['date']) {return 1}
      if (a['date'] > b['date']) {return -1}
      return 0;
    })
    setRecords(records);
  }, [props.records]);

  function useSearchInput(field) {
    let [str, setStr] = useState('');
    function handleSearch(e) {
      setStr(e.target.value);
      const regPattern = new RegExp(`${e.target.value}`, 'gi');
      let sortRecords = props.records.slice();
      setRecords(
        sortRecords.filter(record => record[field].match(regPattern))
      );
    }
    return <input className="search-input"
      value={str}
      onChange={(e) => handleSearch(e)}
      type='text'
      placeholder="&#128269;"
    />;
  }

  function handleSortClick(field) {
    let sortRecords = records.slice();
    setSort(sort === 'asc' ? 'desc' : 'asc');
    setFieldRow(field);
    sortRecords.sort(function (a,b) {
      if (a[field] < b[field]) {
        return sort === 'asc' ? -1 : 1;
      }
      if (a[field] > b[field]) {
        return sort === 'asc' ? 1 : -1;
      }
      return 0;
    })
    viewSorting(field);
    setRecords(sortRecords);
  }

  function viewSorting(field) {
    if (field === fieldRow) {
      return sort === 'asc' ? '⬇' : '⬆'
    }
    return null
  }

  return (
    <table>
      <thead>
      <tr>
        <th onClick={() => handleSortClick('date')}>Дата {viewSorting('date')}</th>
        <th>Запись
          {useSearchInput('text')}
        </th>
        <th onClick={() => handleSortClick('comment')}>Примечание {viewSorting('comment')}</th>
        <th>Подпись</th>
        <th></th>
      </tr>
      </thead>
      <tbody>
        {records.map((record) => {
          return (
            <RecordItem
              key={record.id}
              id={record.id}
              date={record.date}
              text={record.text}
              comment={record.comment}
              signature={record.signature}
              pinned={record.pinned}
              pinRecord={props.pinRecord}
            />
          )}
        )}
      </tbody>
    </table>
  )
}

RecordTable.propTypes = {
  records:PropTypes.arrayOf(PropTypes.object).isRequired,
  pinRecord:PropTypes.func
}

export default RecordTable;
