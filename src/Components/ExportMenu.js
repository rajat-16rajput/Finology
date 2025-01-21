import React from "react";

const ExportMenu = ({ convertToCSV, handleDownloadXLSX }) => {
  function exportToCSV() {
    console.log("Exporting to CSV...");
    convertToCSV();
  }
  function exportToXLSX() {
    // Corrected function name
    console.log("Exporting to XLSX...");
    handleDownloadXLSX();
  }
  return (
    <div className="export-menu">
      <ul className="export-list">
        <li
          onClick={() => {
            exportToCSV();
          }}
          className="exp-opt"
        >
          CSV
        </li>
        <hr></hr>
        <li
          onClick={() => {
            exportToXLSX(); // Corrected function call
          }}
          className="exp-opt"
        >
          XLSX
        </li>
      </ul>
    </div>
  );
};

export default ExportMenu;
