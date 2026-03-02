import { useState, useMemo } from "react";
import AddSubjectForm from "../components/AddSubjectForm";
import SubjectCard from "../components/SubjectCard";
import StatsOverview from "../components/StatsOverview";

export default function Dashboard() {
  const [subjects, setSubjects] = useState(() => {
    try {
      const stored = localStorage.getItem("subjects");
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const addSubject = (newSubject) => {
    setSubjects((prev) => {
      const next = [...prev, newSubject];
      localStorage.setItem("subjects", JSON.stringify(next));
      return next;
    });
  };

  const updateSubject = (id, data) => {
    setSubjects((prev) => {
      const next = prev.map((s) => (s.id === id ? { ...s, ...data } : s));
      localStorage.setItem("subjects", JSON.stringify(next));
      return next;
    });
  };

  const deleteSubject = (id) => {
    setSubjects((prev) => {
      const next = prev.filter((s) => s.id !== id);
      localStorage.setItem("subjects", JSON.stringify(next));
      return next;
    });
  };

  // overall stats calculations
  const { overallPercentage, counts } = useMemo(() => {
    let totalAttended = 0;
    let totalClasses = 0;
    let safe = 0,
      warning = 0,
      danger = 0;

    subjects.forEach((s) => {
      totalAttended += s.attendedClasses;
      totalClasses += s.totalClasses;
      const pct = s.totalClasses > 0 ? (s.attendedClasses / s.totalClasses) * 100 : 0;
      if (pct >= 80) safe += 1;
      else if (pct >= 75) warning += 1;
      else danger += 1;
    });

    const overallPct = totalClasses > 0 ? (totalAttended / totalClasses) * 100 : 0;

    return { overallPercentage: overallPct, counts: { safe, warning, danger } };
  }, [subjects]);

  return (
    <div className="dashboard-wrapper">
      <div className="dashboard-container">
        {/* Header */}
        <div className="dashboard-header">
          <h1>Attendance Dashboard</h1>
          <p>Track and manage your class attendance with ease</p>
        </div>

        {/* Stats Overview */}
        <div className="stats-section">
          <StatsOverview
            overallPercentage={overallPercentage}
            counts={counts}
          />
        </div>

        {/* Add Subject Form */}
        <div className="form-section">
          <div className="form-section-title">
            <h2>Add New Subject</h2>
            <p>Keep track of your attendance for each subject</p>
          </div>
          <AddSubjectForm addSubject={addSubject} />
        </div>

        {/* Subjects Grid */}
        <div className="subjects-section">
          {subjects.length > 0 ? (
            <>
              <h2>Your Subjects <span className="subject-counter">({subjects.length})</span></h2>
              <p>Click on any subject to update your attendance</p>
              <div className="subjects-grid">
                {subjects.map((subj) => (
                  <SubjectCard
                    key={subj.id}
                    subject={subj}
                    updateSubject={updateSubject}
                    deleteSubject={deleteSubject}
                  />
                ))}
              </div>
            </>
          ) : (
            <div className="card-base empty-state">
              <div className="empty-state-icon">📚</div>
              <h3>No Subjects Yet</h3>
              <p>Add your first subject above to get started tracking your attendance</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
