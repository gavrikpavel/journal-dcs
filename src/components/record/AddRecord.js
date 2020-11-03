import React, {useEffect, useRef, useState} from "react";
import PropTypes from 'prop-types'
import Popup from "reactjs-popup";
import '../../styles/Modal.css';
import DatePicker from 'react-date-picker';
import TimeField from 'react-simple-timefield';
import moment from "moment";
import SignatureCanvas from 'react-signature-canvas'


function AddRecord(props) {
  let [date, setDate] = useState(new Date());
  let [time, setTime] = useState(moment().format('HH:mm'));
  let [record, setRecord] = useState('');
  let [text, setText] = useState('');
  let [comment, setComment] = useState('');
  let [imgSignUrl, setImgSignUrl] = useState(null);
  let [showSign, setShowSign] = useState(false);

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


  function handleTimeChange(e) {
    setTime(e.target.value)
  }
  function handleTextChange(e) {
    setText(e.target.value)
  }
  function handleCommentChange(e) {
    setComment(e.target.value)
  }

  function handleAddRecord() {
    showSign ? setImgSignUrl(sigCanvas.current.getTrimmedCanvas().toDataURL("image/png")) : null;
    props.addRecord(record);
    handleClearFields();
  }

  function updateCanvas() {
    setImgSignUrl(sigCanvas.current.getTrimmedCanvas().toDataURL("image/png"));
  }

  function initSignature() {
    setShowSign(false);
    //setImgSignUrl(null);
  }

  function handleClearFields() {
    setText('');
    setComment('');
    setDate(new Date());
    setTime(moment().format('HH:mm'));
    setShowSign(false);
    setImgSignUrl(null);
  }

  return(
    <Popup
      onOpen = {initSignature}
      trigger={<button className="j-btn add"> Создать запись </button>} modal>
      {close => (
        <div className="modal">
          <div className="header"> Создать запись в журнале </div>
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
                  onChange={handleTimeChange}
                  input={<input placeholder={time} />}
                />
              </div>
              <div className="field-record">
                <textarea
                  rows="10"
                  cols="40"
                  placeholder="Введите текст"
                  value={text}
                  onChange={handleTextChange}
                />
                <textarea
                  rows="10"
                  cols="40"
                  placeholder="Введите комментарий"
                  value={comment}
                  onChange={handleCommentChange}
                />
              </div>
            </form>
          </div>
          {showSign &&
            <div className="field-record" onClick={updateCanvas}>
              <SignatureCanvas
                ref = {sigCanvas}
                penColor='#162c63'
                canvasProps={{
                  className: "field-signature"
                }} />
            </div>
          }
          <div className="field-record">
            <button onClick={() => {handleAddRecord(); close()}}>Сохранить</button>
            <button onClick={() =>setShowSign(!showSign)} disabled={showSign}>Добавить подпись</button>
            <button onClick={clearSignature} disabled={!showSign}>Очистить подпись</button>
            <button onClick={() => {close(); handleClearFields()}}>Отмена</button>
          </div>
          <div className="result">
            <table className="result">
              <thead>
              <tr>
                <th>Дата</th>
                <th>Запись</th>
                <th>Примечание</th>
                <th>Подпись</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td className="result-date">
                  {record.date}
                </td>
                <td className="result-text">
                  {record.text}
                </td>
                <td className="result-text">
                  {record.comment}
                </td>
                <td className="result-text">
                  {imgSignUrl
                    ? <img className="sig-image" src={imgSignUrl} />
                    : null
                  }
                </td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </Popup>
  );
}

AddRecord.propTypes = {
  addRecord: PropTypes.func,
}

export default AddRecord;
