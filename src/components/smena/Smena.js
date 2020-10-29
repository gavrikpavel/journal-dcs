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

  let sigCanvas = useRef({});

  const  clearSignature = () => {
    sigCanvas.current.clear();
    setImgSignUrl(null);
  }

  useEffect(() => {
    setRecord({
      date: moment(date).format('YYYY-MM-DD') + ' ' + time + ':00',
      text: text,
      comment: comment,
      signature: imgSignUrl,
      });
  }, [date, time, text, comment, imgSignUrl]);

  function checkTakeSmena() {
    return props.smena.find(oneSmena => oneSmena.isEnd === 0) === undefined;
  }

  function checkOnSmena(usersInSmena) {
    return usersInSmena.some((user) => user === props.regUser)
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
      // onOpen = {initSignature}
      trigger={<button className="button"> Сдать смену </button>} modal>
      {close => (
        <div className="modal">
          <div className="header"> Сдать смену </div>
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
              <div className="field-record">
                <Select />
              </div>
              <div className="field-record">
                <textarea
                  rows="10"
                  cols="40"
                  placeholder="Введите текст"
                  value={text}
                />
                <textarea
                  rows="10"
                  cols="40"
                  placeholder="Введите комментарий"
                  value={comment}
                />
              </div>
            </form>
          </div>
            <div className="field-record" onClick={updateCanvas}>
              <SignatureCanvas
                ref = {sigCanvas}
                penColor='#162c63'
                canvasProps={{
                  className: "field-signature"
                }} />
            </div>
          <div className="field-record">
            <button onClick={() => {handleAddRecord(); close()}}>Сохранить</button>
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
}

export default Smena;
