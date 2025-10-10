import { FC, useState, useEffect } from "react";

interface VisitorData {
  visitorId: string;
  timestamp: string;
  status: string;
  pdfUrl: string;
}

interface ExportDataModalProps {
  onClose: () => void;
  siteId: string;
}

const ExportDataModal: FC<ExportDataModalProps> = ({ onClose, siteId }) => {
  // States for month and year selectors
  const [month, setMonth] = useState<number>(0); // 0-based index for January
  const [year, setYear] = useState<number>(2025);

  const [visitorData, setVisitorData] = useState<VisitorData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>("");

  // Helper to fetch visitor data filtered by month/year
  const fetchVisitorData = async (
    siteId: string,
    month: number,
    year: number
  ) => {
    setIsLoading(true);
    setError("");
    try {
      const res = await fetch(
        `https://framer-consentbit.web-8fb.workers.dev/consent/${encodeURIComponent(
          siteId
        )}`
      );
      if (!res.ok) {
        throw new Error(`Failed to fetch: ${res.status} ${res.statusText}`);
      }
      const data = await res.json();

      const filteredData = (data || []).filter((entry: any) => {
        if (!entry.timestamp) return false;
        const date = new Date(entry.timestamp);
        return (
          date.getUTCFullYear() === year && date.getUTCMonth() === month // month is zero-based
        );
      });

      const visitorArr = filteredData.map((entry: any) => ({
        visitorId: entry.visitorId,
        timestamp: entry.timestamp,
        status: entry.preferences?.action || "Unknown",
        pdfUrl: `https://framer-consentbit.web-8fb.workers.dev/visitor-report/${siteId}/${entry.visitorId}?format=pdf`,
      }));

      setVisitorData(visitorArr);
    } catch (e: any) {
      setError(e.message || "Unknown error");
      setVisitorData([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch data on month or year change or siteId change
  useEffect(() => {
    if (siteId) {
      fetchVisitorData(siteId, month, year);
    }
  }, [month, year, siteId]);

  // Download PDF handler
  const handleDownloadPDF = (url: string) => {
    window.open(url, "_blank");
  };

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
              <select
                className="month-select"
                value={month}
                onChange={(e) => setMonth(parseInt(e.target.value, 10))}
              >
                {[
                  "January",
                  "February",
                  "March",
                  "April",
                  "May",
                  "June",
                  "July",
                  "August",
                  "September",
                  "October",
                  "November",
                  "December",
                ].map((monthName, idx) => (
                  <option value={idx} key={monthName}>
                    {monthName}
                  </option>
                ))}
              </select>
            </div>
            <div className="select-group">
              <label>Year:</label>
              <select
                className="year-select"
                value={year}
                onChange={(e) => setYear(parseInt(e.target.value, 10))}
              >
                {[2025, 2024, 2023, 2022, 2021, 2020].map((yearOption) => (
                  <option value={yearOption} key={yearOption}>
                    {yearOption}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Action Button */}
          <div className="action-buttons">
            <button
              className="action-btn primary"
              onClick={() => fetchVisitorData(siteId, month, year)}
              disabled={isLoading}
            >
              {isLoading ? "Loading..." : "Refresh Report"}
            </button>
          </div>

          {/* Display error if any */}
          {error && <div className="error-message">{error}</div>}

          {/* Visitor Data Table or Empty State */}
          {visitorData.length > 0 ? (
            <div className="visitor-data-section">
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                {" "}
                <h3>Available Consent Reports</h3>{" "}
                <button
                  className="action-btn primary"
                  onClick={() =>
                    handleDownloadPDF(
                      `https://framer-consentbit.web-8fb.workers.dev/consent-report?siteId=${siteId}&month=${month+1}&year=${year}`
                    )
                  }
                >
                  download csv
                </button>
              </div>
              <div className="visitor-data-table">
                <div className="table-header">
                  <div className="header-cell">Visitor ID</div>
                  <div className="header-cell">Timestamp</div>
                  <div className="header-cell">Consent Status</div>
                  <div className="header-cell">Actions</div>
                </div>
                <div className="table-body">
                  {visitorData.map((visitor) => {
                    let formattedDate = visitor.timestamp;
                    try {
                      const date = new Date(visitor.timestamp);
                      if (!isNaN(date.getTime())) {
                        formattedDate = date.toLocaleString();
                      }
                    } catch {}

                    return (
                      <div key={visitor.visitorId} className="table-row">
                        <div className="table-cell">{visitor.visitorId}</div>
                        <div className="table-cell">{formattedDate}</div>
                        <div className="table-cell">
                          <span
                            className={`status-badge ${visitor.status.toLowerCase()}`}
                          >
                            {visitor.status}
                          </span>
                        </div>
                        <div className="table-cell">
                          <a
                            className="download-pdf-btn"
                            onClick={() => handleDownloadPDF(visitor.pdfUrl)}
                            style={{ cursor: "pointer" }}
                          >
                            Download PDF
                          </a>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ) : (
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
          )}
        </div>
      </div>
    </div>
  );
};

export default ExportDataModal;
