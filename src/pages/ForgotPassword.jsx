import { useState } from "react";

export default function ForgotPassword() {
  const [contactNumber, setContactNumber] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleGetOTP = () => {
    if (!contactNumber && !email) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSent(true);
    }, 1500);
  };

  return (
    <div style={styles.page}>
      {/* Header */}
      <div style={styles.header}>
        <h1 style={styles.logo}>WEDPLAN</h1>
      </div>

      {/* Card */}
      <div style={styles.cardWrapper}>
        <div style={styles.card}>
          <h2 style={styles.title}>Forgot Password</h2>

          {sent ? (
            <div style={styles.successBox}>
              <div style={styles.successIcon}>✓</div>
              <p style={styles.successText}>OTP sent successfully!</p>
              <p style={styles.successSub}>Please check your phone or email.</p>
            </div>
          ) : (
            <>
              {/* Contact Number */}
              <div style={styles.fieldGroup}>
                <label style={styles.label}>
                  Contact Number <span style={styles.required}>*</span>
                </label>
                <input
                  type="tel"
                  placeholder="Enter your contact number"
                  value={contactNumber}
                  onChange={(e) => setContactNumber(e.target.value)}
                  style={styles.input}
                  onFocus={(e) => (e.target.style.borderColor = "#4f46e5")}
                  onBlur={(e) => (e.target.style.borderColor = "transparent")}
                />
              </div>

              {/* OR Divider */}
              <div style={styles.divider}>
                <span style={styles.dividerLine} />
                <span style={styles.dividerText}>OR</span>
                <span style={styles.dividerLine} />
              </div>

              {/* Email */}
              <div style={styles.fieldGroup}>
                <label style={styles.label}>Email ID</label>
                <input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={styles.input}
                  onFocus={(e) => (e.target.style.borderColor = "#4f46e5")}
                  onBlur={(e) => (e.target.style.borderColor = "transparent")}
                />
              </div>

              {/* OTP Button */}
              <button
                onClick={handleGetOTP}
                disabled={loading || (!contactNumber && !email)}
                style={{
                  ...styles.otpButton,
                  opacity: !contactNumber && !email ? 0.6 : 1,
                  cursor: !contactNumber && !email ? "not-allowed" : "pointer",
                }}
              >
                {loading ? (
                  <span style={styles.spinner}>⟳</span>
                ) : (
                  "Get OTP"
                )}
              </button>
            </>
          )}

          {/* Back */}
          <button style={styles.backBtn} onClick={() => setSent(false)}>
            ← Back
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(160deg, #1e40af 0%, #3b82f6 50%, #f0f4ff 100%)",
    fontFamily: "'Segoe UI', sans-serif",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  header: {
    width: "100%",
    padding: "32px 0 24px",
    display: "flex",
    justifyContent: "center",
  },
  logo: {
    color: "#fff",
    fontSize: "2.5rem",
    fontWeight: "800",
    letterSpacing: "0.15em",
    margin: 0,
    textShadow: "0 2px 12px rgba(0,0,0,0.15)",
  },
  cardWrapper: {
    display: "flex",
    justifyContent: "center",
    width: "100%",
    padding: "0 16px",
  },
  card: {
    background: "#fff",
    borderRadius: "20px",
    padding: "40px 40px 32px",
    width: "100%",
    maxWidth: "460px",
    boxShadow: "0 20px 60px rgba(0,0,0,0.12)",
  },
  title: {
    fontSize: "1.6rem",
    fontWeight: "700",
    color: "#111827",
    marginBottom: "28px",
    textAlign: "center",
  },
  fieldGroup: {
    marginBottom: "16px",
  },
  label: {
    display: "block",
    fontSize: "0.875rem",
    fontWeight: "600",
    color: "#374151",
    marginBottom: "8px",
  },
  required: {
    color: "#ef4444",
  },
  input: {
    width: "100%",
    padding: "14px 16px",
    borderRadius: "12px",
    border: "2px solid transparent",
    background: "#f3f4f6",
    fontSize: "0.95rem",
    color: "#111827",
    outline: "none",
    boxSizing: "border-box",
    transition: "border-color 0.2s",
  },
  divider: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    margin: "20px 0",
  },
  dividerLine: {
    flex: 1,
    height: "1px",
    background: "#e5e7eb",
  },
  dividerText: {
    fontSize: "0.8rem",
    color: "#9ca3af",
    fontWeight: "500",
  },
  otpButton: {
    width: "100%",
    padding: "16px",
    background: "linear-gradient(135deg, #4f46e5, #6366f1)",
    color: "#fff",
    border: "none",
    borderRadius: "12px",
    fontSize: "1rem",
    fontWeight: "700",
    letterSpacing: "0.04em",
    marginTop: "8px",
    transition: "transform 0.1s, box-shadow 0.2s",
    boxShadow: "0 4px 20px rgba(79,70,229,0.4)",
  },
  backBtn: {
    display: "block",
    width: "100%",
    background: "none",
    border: "none",
    color: "#6b7280",
    fontSize: "0.9rem",
    marginTop: "20px",
    cursor: "pointer",
    textAlign: "center",
    fontWeight: "500",
  },
  successBox: {
    textAlign: "center",
    padding: "20px 0",
  },
  successIcon: {
    width: "60px",
    height: "60px",
    borderRadius: "50%",
    background: "linear-gradient(135deg, #4f46e5, #6366f1)",
    color: "#fff",
    fontSize: "1.8rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "0 auto 16px",
    boxShadow: "0 4px 20px rgba(79,70,229,0.3)",
  },
  successText: {
    fontSize: "1.1rem",
    fontWeight: "700",
    color: "#111827",
    margin: "0 0 6px",
  },
  successSub: {
    fontSize: "0.9rem",
    color: "#6b7280",
    margin: 0,
  },
  spinner: {
    display: "inline-block",
    animation: "spin 1s linear infinite",
    fontSize: "1.2rem",
  },
};
