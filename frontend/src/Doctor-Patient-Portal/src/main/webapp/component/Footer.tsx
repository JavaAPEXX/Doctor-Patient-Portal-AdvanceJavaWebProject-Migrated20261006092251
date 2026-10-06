import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="modern-footer my-bg-color text-center text-white mt-5">
      {/* Grid container */}
      <div className="modern-container p-4 pb-0">
        {/* Section: Social media */}
        <section className="mb-4">
          {/* Facebook */}
          <a
            className="btn btn-outline-light btn-floating m-1"
            href="#!"
            role="button"
          >
            <i className="fab fa-facebook-f"></i>
          </a>

          {/* Twitter */}
          <a
            className="btn btn-outline-light btn-floating m-1"
            href="#!"
            role="button"
          >
            <i className="fab fa-twitter"></i>
          </a>

          {/* Google */}
          <a
            className="btn btn-outline-light btn-floating m-1"
            href="#!"
            role="button"
          >
            <i className="fab fa-google"></i>
          </a>

          {/* Instagram */}
          <a
            className="btn btn-outline-light btn-floating m-1"
            href="#!"
            role="button"
          >
            <i className="fab fa-instagram"></i>
          </a>

          {/* Linkedin */}
          <a
            className="btn btn-outline-light btn-floating m-1"
            href="#!"
            role="button"
          >
            <i className="fab fa-linkedin-in"></i>
          </a>

          {/* Github */}
          <a
            className="btn btn-outline-light btn-floating m-1"
            href="#!"
            role="button"
          >
            <i className="fab fa-github"></i>
          </a>
        </section>
        {/* End Section: Social media */}
      </div>
      {/* End Grid container */}

      {/* Copyright */}
      <div
        className="text-center p-3"
        style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}
      >
        © 2022 Copyright:
        <a className="text-white" href="https://github.com/mdtalalwasim">
          Md.Talal Wasim
        </a>{' '}
        (Developer)
      </div>
      {/* End Copyright */}
    </footer>
  );
};

export default Footer;