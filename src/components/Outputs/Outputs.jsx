import React, {useState, useEffect} from 'react'
import {Chart} from 'react-google-charts'

function durationToMilliseconds(start, finish) {
  const startDateTime = new Date(start);
  const finishDateTime = new Date(finish);

  return (finishDateTime.getTime() - startDateTime.getTime());
}

const Outputs = ({data}) => {

  const [columns, setColumns] = useState([
    {type: "string", label: "JobId"},
    {type: "string", label: "Job"},
    {type: "string", label: "Machine"},
    {type: "date", label: "Start"},
    {type: "date", label: "Finish"},
    {type: "number", label: "Duration"},
    {type: "number", label: "Percent Complete"},
    {type: "string", label: "Dependencies"}
  ]);

  const [rows, setRows] = useState([]);
  const [chartData, setChartData] = useState([]);

  const [showChartLabel, setShowChartLabel] = useState(false);

  useEffect(() => {
    const rowData = data.map(x => [ x.job, x.job, x.machine, new Date(x.start), new Date(x.finish), durationToMilliseconds(x.start, x.finish), 0, null]);
    setRows(rowData);
  },[data]);

  useEffect(() => {
    setChartData([columns, ...rows]);
  },[rows])

  useEffect(() => {
    if(chartData && chartData.length>0){
      setTimeout(()=>{
        setShowChartLabel(true);
      },100)
    }
  },[chartData])

  const options = {
    gantt: {
      defaultStartDateMillis: new Date(2022, 8, 30, 22, 57, 32),
      trackHeight: 30,
      percentEnabled: false
    },
    hAxis: {
      format: 'date'
    }
  };

  return (
    <div className="output-container">
      <div className="output-table">
        <div className="card-heading">
          <h4>Optimized schedule</h4>
        </div>
        <div className="card-detail tbl-responsive">
          <table className="tbl tbl-bordered tbl-hover tbl-alternate">
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
                data.map((d,index) => 
                  <tr key={index}>
                    <td>{d.job}</td>
                    <td>{d.machine}</td>
                    <td>{d.start}</td>
                    <td>{d.finish}</td>
                  </tr>
                )
              }
            </tbody>
          </table>
        </div>
      </div>
      <div className="output-chart">
        {
          chartData && chartData.length > 0
          ?
          <>
            <Chart chartType="Gantt" width="100%" height="100%" data={chartData} options={options} />
            {
              showChartLabel
              ?
              <div className="chart-labels">
                <div className="chartLabel">
                  <div className="square M01_Fermat"></div>
                  <label>M01_Fermat</label>
                </div>
                <div className="chartLabel">
                  <div className="square M01_Skoda"></div>
                  <label>M01_Skoda</label>
                </div>
                <div className="chartLabel">
                  <div className="square M03_Hacco"></div>
                  <label>M03_Hacco</label>
                </div>
                <div className="chartLabel">
                  <div className="square M05_Lathe"></div>
                  <label>M05_Lathe</label>
                </div>
                <div className="chartLabel">
                  <div className="square M05_Lathe2"></div>
                  <label>M05_Lathe2</label>
                </div>
                <div className="chartLabel">
                  <div className="square M06_Drilling"></div>
                  <label>M06_Drilling</label>
                </div>
                <div className="chartLabel">
                  <div className="square M07_Saw"></div>
                  <label>M07_Saw</label>
                </div>
              </div>
              :
              <></>
            }
          </>
          :
          <></>
        }
      </div>
    </div>
  )
}

export default Outputs