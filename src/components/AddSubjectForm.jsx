import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

export default function AddSubjectForm({ addSubject }) {
  const [subjectName, setSubjectName] = useState("");
  const [attended, setAttended] = useState(0);
  const [total, setTotal] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!subjectName.trim()) return;
    
    setIsSubmitting(true);
    
    // Simulate a brief delay for better UX feedback
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const newSubj = {
      id: uuidv4(),
      subjectName: subjectName.trim(),
      attendedClasses: Number(attended),
      totalClasses: Number(total),
    };
    addSubject(newSubj);
    setSubjectName("");
    setAttended(0);
    setTotal(0);
    setIsSubmitting(false);
  };

  const isFormValid = subjectName.trim() && Number(total) > 0;

  return (
    <form
      onSubmit={handleSubmit}
      className="add-subject-form"
    >
      <div className="form-group form-group-subject required">
        <label htmlFor="subject-name">Subject Name</label>
        <input
          id="subject-name"
          type="text"
          value={subjectName}
          onChange={(e) => setSubjectName(e.target.value)}
          placeholder="e.g., Mathematics, English Literature"
          required
          aria-required="true"
        />
      </div>

      <div className="form-grid-three">
        <div className="form-group">
          <label htmlFor="attended">Classes Attended</label>
          <input
            id="attended"
            type="number"
            min="0"
            value={attended}
            onChange={(e) => setAttended(e.target.value)}
            placeholder="0"
            aria-label="Number of classes attended"
          />
          <span className="form-hint">How many classes have you attended?</span>
        </div>
        <div className="form-group required">
          <label htmlFor="total">Total Classes</label>
          <input
            id="total"
            type="number"
            min="0"
            value={total}
            onChange={(e) => setTotal(e.target.value)}
            placeholder="0"
            required
            aria-required="true"
            aria-label="Total number of classes"
          />
          <span className="form-hint">Total number of classes scheduled</span>
        </div>
        <div className="form-group">
          <label>&nbsp;</label>
          <div className="attendance-preview">
            {total > 0 ? (
              <>
                {Number(attended) > 0 ? ((Number(attended) / Number(total)) * 100).toFixed(1) : '0'}%
              </>
            ) : (
              <span className="empty">Add total classes</span>
            )}
          </div>
          <span className="form-hint">Your attendance rate</span>
        </div>
      </div>

      <button
        type="submit"
        disabled={!isFormValid || isSubmitting}
        className="submit-btn"
        aria-busy={isSubmitting}
      >
        {isSubmitting ? (
          <>
            <span className="submit-btn-spinner">⏳</span>
            <span>Adding Subject...</span>
          </>
        ) : (
          <>
            <span className="submit-btn-icon">+</span>
            <span>Add Subject</span>
          </>
        )}
      </button>
    </form>
  );
}
