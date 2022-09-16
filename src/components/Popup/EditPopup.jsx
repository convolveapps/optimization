import React, {useState, useEffect} from 'react';
import './popup.scss';

const EditPopup = ({data, setShowEditPopup}) => {

  const [tasks, setTasks] = useState([]);
  const [machines, setMachines] = useState([]);

  useEffect(()=>{
    setTasks([...new Set(data.map(x => x.task))]);
    setMachines([...new Set(data.map(x => x.machine))]);
  },[data]);

  const getTaskSelection = (optionVal) => {
    return (
      <select>
        {
          tasks.map((o, index) => <option key={index} value={o} disabled={o === optionVal ? false : true}>{o}</option>)
        }
      </select>
    )
  }

  const getMachineSelection = (optionVal) => {
    return (
      <select>
        {
          machines.map((o, index) => <option key={index} value={o} disabled={o === optionVal ? false : true}>{o}</option>)
        }
      </select>
    )
  }

  const saveInputTasks = () => {
    setShowEditPopup(false);
  }

  return (
    <>
      <div className="pop-bg"></div>
      <div className="popup_edit">
        <header className="input-tasks-header">
          <h4>Edit tasks</h4>
        </header>
        <div className="input-tasks-content">
          <div className="input-data-table tbl-responsive">
            <table className="tbl tbl-sm tbl-bordered tbl-hover tbl-alternate">
              <thead>
                <tr>
                  <th>Job Id</th>
                  <th>Task</th>
                  <th>Machine</th>
                  <th>Time</th>
                  <th>Due date</th>
                </tr>
              </thead>
              <tbody>
                { data.map((d, index) => 
                    <tr key={index}>
                      <td>
                        {d.jobId}
                      </td>
                      <td>
                        {getTaskSelection(d.task)}
                      </td>
                      <td>
                        {getMachineSelection(d.machine)}
                      </td>
                      <td>
                        {d.time}
                      </td>
                      <td>
                        {d.dueDate}
                      </td>
                    </tr>
                  )
                }
              </tbody>
            </table>
          </div>
        </div>
        <div className="input-data-action-container">
          <button className="btn btn-primary" onClick={saveInputTasks}>Save</button>
          <button className="btn btn-primary-outline-nonhover" onClick={() => setShowEditPopup(false)}>Cancel</button>
        </div>
      </div>
    </>
  )
}

export default EditPopup