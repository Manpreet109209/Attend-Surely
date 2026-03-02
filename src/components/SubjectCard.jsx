import { useMemo } from "react";

export default function SubjectCard({ subject, updateSubject, deleteSubject }) {
  const { id, subjectName, attendedClasses, totalClasses } = subject;

  const { percentage, statusColor, statusLabel, skipCount, attendNeed } = useMemo(() => {
    const pct = totalClasses > 0 ? (attendedClasses / totalClasses) * 100 : 0;
    let status = "danger";
    let label = "Below Target";
    
    if (pct >= 80) {
      status = "safe";
      label = "On Track";
    } else if (pct >= 75) {
      status = "warning";
      label = "Safe";
    }

    let skip = null;
    let need = null;
    if (pct >= 75) {
      skip = Math.floor(attendedClasses / 0.75 - totalClasses);
      if (skip < 0) skip = 0;
    } else {
      need = Math.ceil((0.75 * totalClasses - attendedClasses) / 0.25);
      if (need < 0) need = 0;
    }

    return {
      percentage: pct.toFixed(1),
      statusColor: status,
      statusLabel: label,
      skipCount: skip,
      attendNeed: need,
    };
  }, [attendedClasses, totalClasses]);

  const handleChange = (field) => (e) => {
    const raw = e.target.value;
    const value = raw === "" ? 0 : Number(raw);
    updateSubject(id, { [field]: value });
  };

  return (
    <div className="subject-card">
      {/* Header */}
      <div className="subject-card-header">
        <div className="subject-card-title-section">
          <h3 className="subject-card-title">{subjectName}</h3>
          <span className={`subject-card-badge ${statusColor}`}>
            {statusLabel}
          </span>
        </div>
        <button
          onClick={() => deleteSubject(id)}
          className="subject-card-delete-btn"
          title="Delete subject"
          aria-label="Delete subject"
        >
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>

      {/* Percentage Display */}
      <div className="subject-card-percentage-section">
        <div className="subject-card-percentage-header">
          <span className="subject-card-percentage-label">Attendance Rate</span>
          <span className={`subject-card-percentage-value ${statusColor}`}>{percentage}%</span>
        </div>
        {/* Progress Bar */}
        <div className={`subject-card-progress progress-bar-${statusColor}`}>
          <div
            className={`subject-card-progress-fill ${statusColor}`}
            style={{ width: `${Math.min(percentage, 100)}%` }}
          />
        </div>
      </div>

      {/* Input Fields */}
      <div className="subject-card-inputs">
        <div className="subject-card-input-group">
          <label>Attended Classes</label>
          <input
            type="number"
            min="0"
            value={attendedClasses}
            onChange={handleChange("attendedClasses")}
            aria-label="Number of classes attended"
          />
        </div>
        <div className="subject-card-input-group">
          <label>Total Classes</label>
          <input
            type="number"
            min="0"
            value={totalClasses}
            onChange={handleChange("totalClasses")}
            aria-label="Total number of classes"
          />
        </div>
      </div>

      {/* Insight Message */}
      <div className={`subject-card-insight ${statusColor}`}>
        <p>
          {percentage >= 75 ? (
            <>
              <span className="subject-card-insight-label">Great job!</span> You can skip{" "}
              <span className="number">{skipCount}</span> classes and
              still maintain ≥ 75%
            </>
          ) : (
            <>
              <span className="subject-card-insight-label">Action needed:</span> Attend{" "}
              <span className="number">{attendNeed}</span> consecutive
              classes to reach 75%
            </>
          )}
        </p>
      </div>

      {/* Stats Footer */}
      <div className="subject-card-footer">
        <div className="subject-card-footer-stat">
          <div className="subject-card-footer-label">Attended</div>
          <div className="subject-card-footer-value">{attendedClasses}</div>
        </div>
        <div className="subject-card-footer-stat">
          <div className="subject-card-footer-label">Total</div>
          <div className="subject-card-footer-value">{totalClasses}</div>
        </div>
      </div>
    </div>
  );
}
