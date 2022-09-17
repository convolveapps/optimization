import React, {useState, useEffect} from 'react'
import ReadXlsx from '../../helpers/ReadXlsx';
import Inputs from '../Inputs/Inputs';
import Outputs from '../Outputs/Outputs';
import PageHeader from '../PageHeader/PageHeader';
import HeaderActions from '../HeaderActions/HeaderActions';
import { getInputData, getOutputData } from '../../helpers/DataSetOperations';

import './dashboard.scss';
import EditPopup from '../Popup/EditPopup';
import { InputPopup } from '../Popup/InputPopup';


const Dashboard = () => {
  const [pageName, setPageName] = useState("Optimization based scheduling");
  const [pageSummary, setPageSummary] = useState();

  const [showData, setShowData] = useState(true);
  const [showInputPopup, setShowInputPopup] = useState(false);
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [editTasks, setEditTasks] = useState(false);

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
      <HeaderActions setRunOptimizer={setRunOptimizer} setShowInputPopup={setShowInputPopup} />
      {
        showInputPopup
        ?
        <InputPopup setShowInputPopup={setShowInputPopup} setEditTasks={setEditTasks} setShowData={setShowData} />
        :
        <></>
      }
      {
        showEditPopup
        ?
        <EditPopup data={inputTableData} setEditTasks={setEditTasks} setShowEditPopup={setShowEditPopup} />
        :
        <></>
      }
      {
        showData
        ?
        <>
          <Inputs data={inputTableData} outputData={outputTableData} setShowEditPopup={setShowEditPopup} runOptimizer={runOptimizer} />
          <Outputs data={outputTableData} runOptimizer={runOptimizer} />
        </>
        :
        <></>
      }
      
    </div>
  )
}

export default Dashboard