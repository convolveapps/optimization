import React, {useState, useEffect} from 'react'
import ReadXlsx from '../../helpers/ReadXlsx';
import Inputs from '../Inputs/Inputs';
import Outputs from '../Outputs/Outputs';
import PageHeader from '../PageHeader/PageHeader'
import { getInputData, getOutputData } from '../../helpers/DataSetOperations';

import './dashboard.scss';


const Dashboard = () => {
  const [pageName, setPageName] = useState("Optimization based scheduling");
  const [pageSummary, setPageSummary] = useState();

  const [inputData, setInputData] = useState([]);
  const [inputTableData, setInputTableDate] = useState([]);

  const [runOptimizer, setRunOptimizer] = useState(false);
  const [outputData, setOutputData] = useState([]);
  const [outputTableData, setOutputTableData] = useState([]);

  useEffect(()=>{
    ReadXlsx([setInputData,setOutputData], 0);
  },[]);

  useEffect(() => {
    setInputTableDate([...getInputData(inputData)]);
  },[inputData])

  useEffect(()=>{
    setOutputTableData([...getOutputData(outputData)]);
  },[outputData])

  return (
    <div className='page-details'>
      <PageHeader pageName={pageName} pageSummary={pageSummary}/>
      <Inputs data={inputTableData} setRunOptimizer={setRunOptimizer} />
      {
        runOptimizer
        ?
        <Outputs data={outputTableData} />
        :
        <></>
      }
    </div>
  )
}

export default Dashboard