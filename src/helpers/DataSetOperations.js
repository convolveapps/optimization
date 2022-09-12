export const getInputData = (data) => {
  let finalData = [];
  for(let i = 0; i < data.length; i++){
    finalData.push({
      jobId: data[i]["Job Id"],
      task: data[i]["Activity"],
      machine: data[i]["Machine"],
      time: data[i]["Time"],
      dueDate: getFormattedDate(data[i]["Due Date"])
    });
  }

  return finalData;
}

export const getOutputData = (data) => {
  let finalData = [];
  for(let i = 0; i < data.length; i++){
    finalData.push({
      job: data[i]["Job"],
      machine: data[i]["Machine"],
      start: getFormattedDateTime(data[i]["Start"]),
      finish: getFormattedDateTime(data[i]["Finish"])
    });
  }

  return finalData;
}

const getFormattedDate = (value) => {
  const date = value ? new Date(value) : "";
  if(!date){
    return "";
  }
  const formattedDate = `${date.getFullYear()}-${parseInt(date.getMonth()+1)}-${date.getDate()}`;
  return formattedDate;
}

const getFormattedDateTime = (value) => {
  if(!value){
    return "";
  }
  let formattedDate = getFormattedDate(value);
  const date = new Date(value);
  const formattedDateTime = `${formattedDate} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
  return formattedDateTime;
}