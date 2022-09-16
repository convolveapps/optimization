import React from 'react';

export const InputPopup = ({setShowInputPopup, setEditTasks,setShowData}) => {

  const setTasks = () => {
    setShowInputPopup(false)
    setEditTasks(true);
    setShowData(true);
  }

  return (
    <>
      <div className="pop-bg"></div>
      <div className="popup_input">
        <header className="input-tasks-header">
          <h4>Add Input task</h4>
        </header>
        <div className="input-tasks-content">
          <div className="input-group">
            <label>Job Id</label>
            <input type="text" defaultValue="812" disabled />
          </div>
          <div className="input-group">
            <label>Task</label>
            <select name="tasks">
              <option value="Boring">Boring</option>
              <option value="Turning">Turning</option>
              <option value="Drilling">Drilling</option>
              <option value="Saw Cutting">Saw Cutting</option>
            </select>
          </div>
          <div className="input-group">
            <label>Machine</label>
            <select name="machines">
              <option value="M01_Fermat">M01_Fermat</option>
              <option value="M03_Hacco">M03_Hacco</option>
              <option value="M05_Lathe">M05_Lathe</option>
              <option value="M06_Drilling">M06_Drilling</option>
              <option value="M07_Saw">M07_Saw</option>
              <option value="M05_Lathe2">M05_Lathe2</option>
              <option value="M01_Skoda">M01_Skoda</option>
            </select>
          </div>
          <div className="input-group">
            <label>Time</label>
            <input type="number" />
          </div>
          <div className="input-group">
            <label>Due date</label>
            <input type="datetime-local" />
          </div>
          <div className="input-data-action-container">
            <button className="btn btn-primary" onClick={setTasks}>Save</button>
            <button className="btn btn-primary-outline-nonhover" onClick={setTasks}>Cancel</button>
          </div>
        </div>
        
      </div>
    </>
  )
}
