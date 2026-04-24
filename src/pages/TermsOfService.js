import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function TermsOfService() {
  const navigate = useNavigate();

  return (
    <div className="legal-page">
      <div className="legal-page__shell">
        <button className="legal-page__back" onClick={() => navigate('/')}>
          Back to Home
        </button>

        <div className="legal-page__card">
          <div className="legal-page__eyebrow">LibasTrack Legal</div>
          <h1 className="legal-page__title">Terms of Service</h1>
          <p className="legal-page__updated">Last updated: April 24, 2026</p>

          <section className="legal-page__section">
            <h2>Acceptance</h2>
            <p>
              By using LibasTrack, you agree to these Terms of Service. If you do
              not agree, please do not use the service.
            </p>
          </section>

          <section className="legal-page__section">
            <h2>Service Description</h2>
            <p>
              LibasTrack provides tools for managing fashion brand operations,
              including product tracking, orders, customers, suppliers, returns,
              storage setup, and spreadsheet synchronization.
            </p>
          </section>

          <section className="legal-page__section">
            <h2>Account Use</h2>
            <ul>
              <li>You are responsible for activity under your account</li>
              <li>You must use the service lawfully</li>
              <li>You must not misuse, disrupt, or attempt unauthorized access to the platform</li>
            </ul>
          </section>

          <section className="legal-page__section">
            <h2>Third-Party Services</h2>
            <p>
              Some features rely on third-party providers such as Google. Your use
              of those connected services may also be governed by their own terms
              and policies.
            </p>
          </section>

          <section className="legal-page__section">
            <h2>Availability</h2>
            <p>
              We may update, improve, suspend, or discontinue parts of the service
              from time to time. We do not guarantee uninterrupted availability.
            </p>
          </section>

          <section className="legal-page__section">
            <h2>Limitation of Liability</h2>
            <p>
              To the maximum extent permitted by law, LibasTrack is provided on an
              as-is basis without warranties of any kind, and we are not liable for
              indirect or consequential damages arising from use of the service.
            </p>
          </section>

          <section className="legal-page__section">
            <h2>Contact</h2>
            <p>
              For questions about these terms, contact{' '}
              <a href="mailto:support@libastrack.com">support@libastrack.com</a>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
