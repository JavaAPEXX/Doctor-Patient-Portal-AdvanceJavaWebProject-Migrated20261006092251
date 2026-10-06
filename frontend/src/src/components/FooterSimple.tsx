import React from 'react';
import './FooterSimple.css'; // Ensure the modern CSS design tokens are imported

/**
 * FooterSimple – migrated from `footersimple.jsp`.
 * Preserves the original markup and text while applying the modern design system:
 *   • Wrapped in `.modern-container` and `.modern-card`
 *   • Retains original color and spacing utilities
 */
const FooterSimple: React.FC = () => (
  <footer className="modern-container modern-card p-1 my-bg-color text-center text-white mt-3">
    <p className="fs-4 text-center">&copy; md.talal.wasim</p>
  </footer>
);

export default FooterSimple;