import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <main className="landing-main">
      <div className="landing-container">
        {/* Hero Section */}
        <div className="text-center">
          {/* Badge */}
          <div className="landing-badge">
            <span className="landing-badge-text">📊 Track Your Attendance</span>
          </div>

          {/* Main Heading */}
          <div className="landing-hero">
            <h1>
              Never Miss an <span className="highlight">Attendance Goal</span> Again
            </h1>
          </div>

          {/* Subheading */}
          <p className="landing-description">
            AttendSure helps you track your class attendance effortlessly and stay on top of your academic goals with intelligent insights.
          </p>

          {/* CTA Buttons */}
          <div className="landing-cta">
            <Link
              to="/dashboard"
              className="btn-primary"
            >
              <span>Get Started Now</span>
              <span>→</span>
            </Link>
            <button
              className="landing-cta-secondary"
              onClick={() => {
                const element = document.getElementById('features');
                element?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Learn More
            </button>
          </div>
        </div>

        {/* Features Section */}
        <div id="features" className="landing-features">
          <h2>Why Choose AttendSure?</h2>
          <div className="features-grid">
            {[
              {
                icon: '📝',
                title: 'Easy Tracking',
                description: 'Log your attendance in seconds with our intuitive interface',
              },
              {
                icon: '📊',
                title: 'Smart Analytics',
                description: 'Get insights on your attendance patterns and predictions',
              },
              {
                icon: '⚡',
                title: 'Quick Actions',
                description: 'Add subjects, update attendance, and see results instantly',
              },
              {
                icon: '💾',
                title: 'Auto-Save',
                description: 'Your data is automatically saved in your browser',
              },
            ].map((feature, idx) => (
              <div
                key={idx}
                className="card-base feature-card"
              >
                <div className="feature-card-icon">{feature.icon}</div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
