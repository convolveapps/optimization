import * as XLSX from "xlsx";

const ReadXlsx = async (setData, sheetNo) => {

    const dataFilePath = import.meta.env.VITE_DATA_FILE_PATH;

    await fetch(dataFilePath)
    .then(resp => resp.blob())
    .then(data => {
      const file = data;
      const reader = new FileReader();
  
      reader.onload = (evt) => {
        const bstr = evt.target.result;
        const wb = XLSX.read(bstr, { type: "binary" });
        for(let i=0;i<wb.SheetNames.length;i++){
          const wsname = wb.SheetNames[i];
          const ws = wb.Sheets[wsname];
          const jsondata = XLSX.utils.sheet_to_json(ws, { header: 1 });

          const xlData = [];

          const headers = jsondata[0];

          for(let i=1;i<jsondata.length;i++){
            let d = {};
            for(let j=0;j<headers.length;j++){
              d[headers[j]] = jsondata[i][j];
            }
            
            xlData.push(d);
          }

          const setDataFunction = setData[i];
          setDataFunction(xlData);
        }
      };
      reader.readAsBinaryString(file);
    });
  
    
}

export default ReadXlsx;