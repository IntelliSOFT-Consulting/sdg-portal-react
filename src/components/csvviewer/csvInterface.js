import React, { useState, useEffect } from "react";
import Papa from "papaparse";
import "react-table/react-table.css";
import ReactTable from "react-table";
import CsvInput from './csvInput.js';
import Spinner from '../../visualizations/spinner';

function Interface( {handleSetFileData} ) {
  const [data, setData] = useState([]);
  const [columns, setColumns] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
      console.log(loading);

    if (data.length && columns.length) setLoading(false);
  }, [data, columns]);

  const handleFileChange = file => {
    setLoading(true);
    Papa.parse(file, {
      header: true,
      dynamicTyping: true,
      complete: handleDataChange
    });
  };

  const makeColumns = rawColumns => {
    return rawColumns.map(column => {
      return { Header: column, accessor: column };
    });
  };

  const handleDataChange = file => {
    handleSetFileData(file.data);
    setData(file.data);
    setColumns(makeColumns(file.meta.fields));
  };

  return (
    <div>
      <CsvInput handleFileChange={handleFileChange} data={data} />
      { !loading && data.length && columns.length ? (
        <ReactTable
          data={data}
          columns={columns}
          defaultPageSize={10}
          className="-striped -highlight"
        />
      ) : loading ? (
        <Spinner></Spinner>
      ) :null
      }
    </div>
  );
}

export default Interface;