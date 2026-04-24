import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function PrivacyPolicy() {
  const navigate = useNavigate();

  return (
    <div className="legal-page">
      <div className="legal-page__shell">
        <button className="legal-page__back" onClick={() => navigate('/')}>
          Back to Home
        </button>

        <div className="legal-page__card">
          <div className="legal-page__eyebrow">LibasTrack Legal</div>
          <h1 className="legal-page__title">Privacy Policy</h1>
          <p className="legal-page__updated">Last updated: April 24, 2026</p>

          <section className="legal-page__section">
            <h2>Overview</h2>
            <p>
              LibasTrack helps fashion brands manage products, orders, customers,
              suppliers, returns, and operational data. This Privacy Policy explains
              what information we collect, how we use it, and how we protect it.
            </p>
          </section>

          <section className="legal-page__section">
            <h2>Information We Collect</h2>
            <p>When you sign in with Google, we may collect the following:</p>
            <ul>
              <li>Your name, email address, and profile image</li>
              <li>Google account identifier needed to authenticate your account</li>
              <li>Access and refresh tokens required to connect your Google services</li>
              <li>Business data you choose to create or sync inside LibasTrack</li>
            </ul>
          </section>

          <section className="legal-page__section">
            <h2>How We Use Information</h2>
            <ul>
              <li>To sign you in securely and maintain your session</li>
              <li>To create and manage your LibasTrack workspace</li>
              <li>To sync spreadsheets and related files when you enable Google Drive or Google Sheets features</li>
              <li>To improve product reliability, security, and support</li>
            </ul>
          </section>

          <section className="legal-page__section">
            <h2>Google User Data</h2>
            <p>
              If you connect Google services, LibasTrack only uses Google user data
              to provide requested product functionality such as authentication,
              spreadsheet sync, and storage setup. We do not sell Google user data
              to third parties.
            </p>
          </section>

          <section className="legal-page__section">
            <h2>Data Sharing</h2>
            <p>
              We do not sell your personal information. We may share data only with
              service providers and infrastructure partners required to operate the
              app, or when required by law.
            </p>
          </section>

          <section className="legal-page__section">
            <h2>Data Security</h2>
            <p>
              We use reasonable technical and organizational safeguards to protect
              your information. No online service can guarantee absolute security,
              but we work to minimize risk and protect access to your account.
            </p>
          </section>

          <section className="legal-page__section">
            <h2>Your Choices</h2>
            <ul>
              <li>You can stop using the service at any time</li>
              <li>You can revoke Google access from your Google account settings</li>
              <li>You can contact us to request account-related assistance</li>
            </ul>
          </section>

          <section className="legal-page__section">
            <h2>Contact</h2>
            <p>
              If you have privacy questions, contact us at{' '}
              <a href="mailto:support@libastrack.com">support@libastrack.com</a>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
