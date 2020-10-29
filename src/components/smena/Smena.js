import React, {useEffect, useRef, useState} from "react";
import PropTypes from 'prop-types'
import Popup from "reactjs-popup";
import '../../styles/Modal.css';
import DatePicker from 'react-date-picker';
import TimeField from 'react-simple-timefield';
import moment from "moment";
import SignatureCanvas from 'react-signature-canvas';
import Select from "react-select";

function Smena(props) {
  let [date, setDate] = useState(new Date());
  let [time, setTime] = useState(moment().format('HH:mm'));
  let [record, setRecord] = useState('');
  let [text, setText] = useState('');
  let [comment, setComment] = useState('');
  let [imgSignUrl, setImgSignUrl] = useState(null);
  let [selectedUsers, setSelectedUsers] = useState([]);
  let [allowSmena, setAllowSmena] = useState(true);

  let sigCanvas = useRef({});

  const  clearSignature = () => {
    sigCanvas.current.clear();
    setImgSignUrl(null);
  }

  useEffect(() => {
    setAllowSmena(
      {
        onSmena: !selectedUsers.some((user) => user.value === props.regUser) && selectedUsers,
        takeSmena: props.smena.find(oneSmena => oneSmena.isEnd === 0) !== undefined
      });
    setText(
      () => {
        let str = selectedUsers.reduce((str, user) => str + ', ' + user.label, '') + ' принял(и) смену';
        return str.slice(2);
      });
  }, [selectedUsers, props.smena]);

  useEffect(() => {
    setRecord({
      date: moment(date).format('YYYY-MM-DD') + ' ' + time + ':00',
      text: text,
      comment: comment === '' ? 'Прием/Сдача смены' : comment,
      signature: imgSignUrl,
    });
  }, [date, time, text, comment, imgSignUrl]);

  function handleCommentChange(e) {
    setComment(e.target.value)
  }

  function handleAddRecord() {
    setImgSignUrl(sigCanvas.current.getTrimmedCanvas().toDataURL("image/png"));
    props.addRecord(record);
    handleClearFields();
  }

  function updateCanvas() {
    setImgSignUrl(sigCanvas.current.getTrimmedCanvas().toDataURL("image/png"));
  }

  function handleClearFields() {
    setText('');
    setComment('');
    setDate(new Date());
    setTime(moment().format('HH:mm'));
    setImgSignUrl(null);
  }

  return(
    <Popup
      //onOpen = {}
      trigger={<button
        className="button"
        //disabled={allowSmena.takeSmena}
      > Сдать смену </button>} modal>
      {close => (
        <div className="modal">
          <div className="header"> Смена </div>
          <div className="content">
            <form>
              <div className="field-record">
                <DatePicker
                  clearIcon={null}
                  onChange={setDate}
                  value={date}
                />
                <TimeField
                  value={time}
                  input={<input placeholder={time} />}
                />
              </div>
              <Select
                name="selectUsers"
                className="basic-multi-select"
                classNamePrefix="select"
                placeholder="Выберите персонал в смене"
                isMulti
                isClearable={false}
                onChange={setSelectedUsers}
                options={props.users}
              />
              <br/>
              <div className="field-record">
                <textarea className="comment-smena"
                  rows="10"
                  cols="40"
                  placeholder="Введите комментарий"
                  value={comment}
                  onChange={handleCommentChange}
                />
              </div>
            </form>
          </div>
          <span>Подпись</span>
            <div className="field-record" onClick={updateCanvas}>
              <SignatureCanvas
                ref = {sigCanvas}
                penColor='#162c63'
                canvasProps={{
                  className: "field-signature"
                }} />
            </div>
          <div className="field-record">
            <button
              //disabled={allowSmena.onSmena}
              onClick={() => {handleAddRecord(); close()}}>
              Сохранить</button>
            <button onClick={clearSignature}>Очистить подпись</button>
            <button onClick={() => {close(); handleClearFields()}}>Отмена</button>
          </div>
        </div>
      )}
    </Popup>
  );
}

Smena.propTypes = {
  addRecord: PropTypes.func,
  regUser: PropTypes.number.isRequired,
  users: PropTypes.array.isRequired,
  smena: PropTypes.array.isRequired,
}

export default Smena;
