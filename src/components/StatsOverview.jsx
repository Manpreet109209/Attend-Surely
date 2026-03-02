export default function StatsOverview({ overallPercentage, counts }) {
  const { safe, warning, danger } = counts;

  const stats = [
    {
      label: 'Overall Attendance',
      value: `${overallPercentage.toFixed(1)}%`,
      colorClass: 'safe',
      bgClass: 'card-blue-bg',
      icon: '📊',
    },
    {
      label: 'Safe',
      value: safe,
      colorClass: 'safe',
      bgClass: 'card-emerald-bg',
      icon: '✅',
    },
    {
      label: 'Warning',
      value: warning,
      colorClass: 'warning',
      bgClass: 'card-amber-bg',
      icon: '⚠️',
    },
    {
      label: 'Danger',
      value: danger,
      colorClass: 'danger',
      bgClass: 'card-red-bg',
      icon: '🚨',
    },
  ];

  return (
    <div className="stats-grid">
      {stats.map((stat, idx) => (
        <div
          key={idx}
          className={`card-base stat-card ${stat.bgClass}`}
        >
          <div>
            <div className="stat-card-label">{stat.label}</div>
            <div className={`stat-card-value ${stat.colorClass}`}>
              {stat.value}
            </div>
          </div>
          <div className="stat-card-icon">{stat.icon}</div>
        </div>
      ))}
    </div>
  );
}
