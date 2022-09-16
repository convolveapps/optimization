import React from 'react';
import './headeractions.scss';

const HeaderActions = ({setRunOptimizer, setShowInputPopup}) => {

  const initializeInputTasksPopup = () => {
    setShowInputPopup(true);
  }

  return (
    <div className="header-actions bg-shadow">
      <div className="status">
        <button className="btn btn-primary" onClick={initializeInputTasksPopup}>Input task</button>
      </div>
      <div className="action-container">
        <button className="btn btn-primary-outline" onClick={()=>setRunOptimizer(true)}>Run optimizer</button>
      </div>
    </div>
  )
}

export default HeaderActions