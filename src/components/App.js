import React, {useState, useEffect} from 'react';
import moment from 'moment';
import axios from 'axios';
import SmenaList from './smena/SmenaList';
import RecordList from './record/RecordList';
import DatePicker from './DatePicker';

import '../styles/App.css';

function App() {

  let [initRecords, setInitRecords] = useState([]);
  let [records, setRecords] = useState(initRecords);
  let [smenaList, setSmenaList] = useState([]);
  let [date, setDate] = useState(moment().format('YYYY-MM-DD'));

  // Обновляем данные, если изменилась дата запроса
  useEffect(() => {
    let url = 'http://192.168.71.111/api/journal/info';
    const requestData = {"date": date};
    axios.post(url, requestData)
      .then(res => {
        if (res.data) {
            setSmenaList(
              res.data.smena.map(smena => {
                smena.active = false;
                return smena
              })
            );
            setInitRecords(res.data.records);
            setRecords(res.data.records);
        }
      })
      .catch(function() {
       console.log('не удалось загрузить'); // Todo вывести сообщение
      });
  }, [date])

  // Фильтруем записи в зависимости от выбранной Смены
  function showRecords(
    startDate= moment().format('YYYY-MM-DD 00:00:00'),
    endDate= moment().format('YYYY-MM-DD hh:mm:ss')
  ) {
    if (endDate === null)  endDate= moment().format('YYYY-MM-DD hh:mm:ss');
    records = initRecords;
    setRecords(
      records.filter(record => moment(record.date).isBetween(startDate, endDate, undefined, '[]'))
    )
  }

  function updateDate(newDate) {
    setDate(moment(newDate).format('YYYY-MM-DD 00:00:00'));
  }

  function setActiveSmena(id) {
    setSmenaList(
      smenaList.map(smena => {
        smena.active = smena.id === id;
        return smena
      })
    )

  }

  return (
    <div className="journal">
      <div className="tool-panel">
        <DatePicker updateDate={updateDate}/>
      </div>
      <div className="smena">
        <SmenaList smenaList={smenaList} setSmenaRecords={showRecords} setActive={setActiveSmena} />
      </div>
      <div className="record-table">
        <RecordList records={records} />
      </div>
      <div className="pinned-records">
        <div>1</div>
        <div>2</div>
        <div>3</div>
      </div>
    </div>
  )
}

export default App;
