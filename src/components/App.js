import React, {useState, useEffect} from 'react';
import moment from 'moment';
import axios from 'axios';
import swal from 'sweetalert';
import SmenaList from './smena/SmenaList';
import PinnedList from "./pinned/PinnedList";
import RecordTable from './record/RecordTable';
import '../styles/App.css';

import AddRecord from "./record/AddRecord";
import 'reactjs-popup/dist/index.css';
import DatePicker from 'react-date-picker';
import Smena from "./smena/Smena";

function App() {

  let [initRecords, setInitRecords] = useState([]);
  let [records, setRecords] = useState(initRecords);
  let [pinnedRecords, setPinnedRecords] = useState([]);
  let [smenaList, setSmenaList] = useState([]);
  let [date, setDate] = useState(new Date());
  const ipUrl = 'http://192.168.71.111/api/journal/';
  const [users, setUsers] = useState([]);
  const [regUser, setRegUser] = useState(1);

  /**
   * Получение данных
   */
  // Запрос Records и Smena
  useEffect(() => {
    const url = ipUrl +  'info';
    const requestData = {"date": moment(date).format('YYYY-MM-DD 00:00:00')};
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
            setUsers(res.data.users);
            setRegUser(res.data.regUser);
        }
      })
      .catch(function() {
        swal("Ошибка!", "Нет связи с сервером!", "error");
      });
  }, [date])

  // Запрос pinnedRecords
  useEffect(() => {
    const url = ipUrl + 'pinned-records';
    axios.get(url)
      .then(res => {
        if (res.data) {
          setPinnedRecords(res.data);
        }
      })
      .catch(function() {
        swal("Ошибка!", "Нет связи с сервером!", "error");
      });
  }, []);

  /**
   * Отображение данных
   */
  // Фильтруем записи в зависимости от выбранной Смены
  function showRecords(
    startDate= moment().format('YYYY-MM-DD 00:00:00'),
    endDate= moment().format('YYYY-MM-DD hh:mm:ss')
  ) {
    if (endDate === null)  endDate= moment().format('YYYY-MM-DD hh:mm:ss');
    records = initRecords.slice();
    setRecords(
      records.filter(record => moment(record.date).isBetween(startDate, endDate, undefined, '[]'))
    )
  }

  function setActiveSmena(id) {
    setSmenaList(
      smenaList.map(smena => {
        smena.active = smena.id === id;
        return smena
      })
    );
  }

  /**
   * Операции с данными
   */
  function pinRecord(id) {
   let pinned = 0;

   // id есть в records
    if (records.find(record => record.id === id) !== undefined) {
      const record = records.find(record => record.id === id);
      pinned = record.pinned === 0 ? 1 : 0;

      setRecords(
        records.map(record => {
          if (record.id === id) {
            record.pinned = pinned;
          }
          return record
        })
      );
    }
    else {
      let pinnedRecord = pinnedRecords.find(record => record.id === id);
      pinned = pinnedRecord.pinned === 0 ? 1 : 0;
    }

    const requestData = {
      "id" : id,
      "pinned" : pinned
    };

    const url = ipUrl + 'pinned';
    axios.post(url, requestData)
      .then(res => {
        setPinnedRecords(res.data);
        })
      .catch(function() {
        swal("Ошибка!", "Нет связи с сервером!", "error");
      });
  }

  function addRecord(record) {
    const url = ipUrl + 'save-record'; //?XDEBUG_SESSION_START=PHPSTORM
    axios.post(url, record)
      .then(res => {
        if (res.data) {
          setRecords(
            records.concat([res.data])
          );
        }
      })
      .catch(function() {
        swal("Ошибка!", "Нет связи с сервером!", "error");
      });
  }

  function setSmena(smena) {
    const urlSmena  = smena.takeSmena ? 'take-smena' : 'give-smena'
    const url = ipUrl + urlSmena; //?XDEBUG_SESSION_START=PHPSTORM
    axios.post(url, smena.users)
      .then(res => {
        if (res.data) {
          setSmenaList(res.data);
          addRecord(smena.record);
        }
      })
      .catch(function() {
        swal("Ошибка!", "Нет связи с сервером!", "error");
      });
  }

  function logout() {
    const url = 'http://192.168.71.111/auth/logout/'; //?XDEBUG_SESSION_START=PHPSTORM
    axios.defaults.headers.common['X-CSRF-TOKEN'] = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
    axios.post(url)
      .then(res => {
        swal("выход", "info");
      })
      .catch(function() {
        swal("Ошибка!", "Нет связи с сервером!", "error");
      });
  }

  return (
    <div className="journal">
      <div className="tool-panel">
        <DatePicker
          clearIcon={null}
          onChange={setDate}
          value={date}
        />
        <AddRecord addRecord={addRecord} />
        <Smena
          users={users}
          regUser={regUser}
          smena={smenaList}
          setSmena={setSmena}
          header="Принять смену"
          nameButton="Принять"
          disableSelect={false}
          take={true}
        />
        <Smena
          users={users}
          regUser={regUser}
          smena={smenaList}
          setSmena={setSmena}
          header="Сдать смену"
          nameButton="Сдать"
          disableSelect={true}
          take={false}
        />
      </div>
      <div className="smena">
        <SmenaList
          smenaList={smenaList}
          setSmenaRecords={showRecords}
          setActive={setActiveSmena}
        />
      </div>
      <div className="record-table">
        <RecordTable
          records={records}
          pinRecord={pinRecord}
        />
      </div>
      <div className="pinned-records">
        <PinnedList
          records={pinnedRecords}
          pinRecord={pinRecord}
        />
      </div>
    </div>
  )
}

export default App;
