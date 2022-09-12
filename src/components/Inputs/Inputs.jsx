import React, {useState, useEffect} from 'react'



const Inputs = ({data, setRunOptimizer}) => {

  const [jobs, setJobs] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [machines, setMachines] = useState([]);

  useEffect(()=>{
    setJobs([...new Set(data.map(x => x.jobId))]);
    setTasks([...new Set(data.map(x => x.task))]);
    setMachines([...new Set(data.map(x => x.machine))]);
  },[data])

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

  return (
    <div className="input-container">
      <div className="input-table">
        <div className="card-heading">
          <h4>Task inputs</h4>
          <button className='btn btn-primary-outline' onClick={() => setRunOptimizer(true)}>Run optimizer</button>
        </div>
        <div className="card-detail tbl-responsive">
          <table className="tbl tbl-bordered tbl-hover tbl-alternate">
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
      <div className="agg-container">
        <div className="card-heading">
          <h4>Aggregated input data</h4>
        </div>
        <div className="jobs">
          <div className="total-jobs">
            <label>Total jobs</label>
            <h4>{jobs.length}</h4>
          </div>
        </div>
        <div className="task-machine">
          <div className="task">
            <label>Total tasks</label>
            <h4>{data.length}</h4>
          </div>
          <div className="machine">
            <label>Total machines</label>
            <h4>{machines.length}</h4>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Inputs