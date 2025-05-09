import React from 'react';
import { assets } from '../../assets/assets';
import './AppDownload.css';

const AppDownload = () => {
  return (
    <section className="app-download" id="app-download">
      <div className="app-download-container">
        <h2 className="app-download-heading">
          For the Best Food Experience<br />
          Download the <span className="highlight">Crave Cart</span> App
        </h2>
        <p className="cta-text">
          Join thousands of happy customers and get the app for easy meal ordering on the go!
        </p>
        <div className="app-download-platforms">
          <a href="#" aria-label="Download from Play Store">
            <img src={assets.play_store} alt="Play Store" className="platform-img" />
          </a>
          <a href="#" aria-label="Download from App Store">
            <img src={assets.app_store} alt="App Store" className="platform-img" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default AppDownload;
