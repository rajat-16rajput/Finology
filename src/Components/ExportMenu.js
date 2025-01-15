import React from "react";

const ExportMenu = ({ showExportMenu, setShowExportMenu }) => {
  function handleCancel() {
    setShowExportMenu(!showExportMenu);
  }
  return (
    <div className="export-menu">
      <h4>
        Please Select the format in which the table data should be exported
      </h4>

      <div className="exportMenu-option-buttons">
        <button className="exp-btn">CSV</button>

        <button className="exp-btn">XLSS</button>
        <button
          className="exp-btn"
          onClick={() => {
            handleCancel();
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default ExportMenu;
