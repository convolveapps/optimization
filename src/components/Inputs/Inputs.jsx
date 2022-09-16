import React, {useState, useEffect} from 'react'



const Inputs = ({data, outputData, setShowEditPopup, runOptimizer}) => {

  const [jobs, setJobs] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [machines, setMachines] = useState([]);

  const [outputDataArranged, setOutputDataArranged] = useState([]);
  const [selectedMachine, setSelectedMachine] = useState();
  const [selectedMachineData, setSelectedMachineData] = useState([]);

  useEffect(()=>{
    setJobs([...new Set(data.map(x => x.jobId))]);
    setTasks([...new Set(data.map(x => x.task))]);
    setMachines([...new Set(data.map(x => x.machine))]);
  },[data]);

  useEffect(() => {
    let outputDataArrangedValue = [];
    if(outputData.length > 0){
      for(let i = 0; i < machines.length; i++){
        const machineFilteredData = outputData.filter(x => x.machine === machines[i]);
        outputDataArrangedValue.push({
          machine: machines[i],
          data: machineFilteredData
        });
      }

      setOutputDataArranged([...outputDataArrangedValue]);
      setSelectedMachine(machines[0]);
      setSelectedMachineData([...outputDataArrangedValue.filter(x => x.machine === machines[0])]);
    }
  },[machines, outputData]);

  const changeMachine = (e) => {
    setSelectedMachine(e.target.value);
    const selectedValue = e.target.value;
    if(selectedValue === "All"){
      setSelectedMachineData([...outputDataArranged]);
    }
    else{
      setSelectedMachineData([...outputDataArranged.filter(x => x.machine === selectedValue)]);
    }
  }

  return (
    <div className="input-container">
      <div className="input-table">
        <div className="card-heading">
          <h4>Task inputs</h4>
          <button className="btn btn-primary-outline" onClick={() => setShowEditPopup(true)}>Edit</button>
        </div>
        <div className="card-detail tbl-responsive">
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
                      {d.task}
                    </td>
                    <td>
                      {d.machine}
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
      <div className="output-table">
        <div className="card-heading">
          <h4>Optimized schedule</h4>
          {
            runOptimizer
            ?
            <select value={selectedMachine} onChange={changeMachine}>
              <option value="All">All</option>
              {
                machines.map((d, index) => 
                  <option key={index} value={d}>{d}</option>
                )
              }
            </select>
            :
            <></>
          }
        </div>
        {
          runOptimizer
          ?
          <div className="card-detail tbl-responsive">
            {
              selectedMachineData.length>0
              ?
              selectedMachineData.map((d, index) => 
                <table key={index} className="tbl tbl-sm tbl-bordered tbl-hover tbl-alternate">
                  <thead>
                    <tr>
                      <th>Job</th>
                      <th>Machine</th>
                      <th>Start</th>
                      <th>Finish</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      d.data.map((d1,index1) => 
                        <tr key={index1}>
                          <td>{d1.job}</td>
                          <td>{d1.machine}</td>
                          <td>{d1.start}</td>
                          <td>{d1.finish}</td>
                        </tr>
                      )
                    }
                  </tbody>
                </table>
              )
              :
              <></>
            }
          </div>
          :
          <></>
        }
      </div>
    </div>
  )
}

export default Inputs