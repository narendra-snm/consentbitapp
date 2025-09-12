
const ExportDataModal = ({ onClose }: { onClose: () => void }) => {
  return (
    <div className="export-data-overlay">
      <div className="export-data-modal">
        
        {/* Header */}
        <div className="export-data-header">
          <h2>Advanced CSV Export</h2>
          <img
            src="https://67c7218243770a3d2c39fb20.webflow-ext.com/68b0e5583769195ccc356001/5d99d39912ef8778242e.png"
            alt="Close"
            className="close-icon"
            onClick={onClose}
          />
        </div>

        {/* Content */}
        <div className="export-data-content">

          {/* Month-Year Selector */}
          <div className="month-year-selector">
            <div className="select-group">
              <label>Month:</label>
              <select className="month-select">
                <option value="0">January</option>
                <option value="1">February</option>
                <option value="2">March</option>
                <option value="3">April</option>
                <option value="4">May</option>
                <option value="5">June</option>
                <option value="6">July</option>
                <option value="7">August</option>
                <option value="8">September</option>
                <option value="9">October</option>
                <option value="10">November</option>
                <option value="11">December</option>
              </select>
            </div>

            <div className="select-group">
              <label>Year:</label>
              <select className="year-select">
                <option value="2025">2025</option>
                <option value="2024">2024</option>
                <option value="2023">2023</option>
                <option value="2022">2022</option>
                <option value="2021">2021</option>
                <option value="2020">2020</option>
              </select>
            </div>
          </div>

          {/* Action Button */}
          <div className="action-buttons">
            <button className="action-btn primary">Generate CSV Report</button>
          </div>

          {/* No Data / Empty State */}
          <div className="visitor-data-section">
            <div className="no-data">
              <div className="empty-state">
                <img
                  src="https://67c7218243770a3d2c39fb20.webflow-ext.com/68b0e5583769195ccc356001/709fa5a2a6e86ff92047.svg"
                  alt="Empty"
                  className="empty-icon"
                />
                <div className="empty-message">
                  No visitor data available for the selected period.
                </div>
                <div className="empty-subtitle">
                  Try selecting a different month or year, or check back later
                  for new consent data.
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default ExportDataModal;
