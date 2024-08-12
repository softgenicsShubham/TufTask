import React, { useState, useEffect, useCallback, useRef } from 'react';
import { DateTime, Duration } from 'luxon';
import { BannerData } from '../types/BannerData';
import { getBannerDetails } from '../apis/banner';
import '../css/Banner.css';
import { formatTimeDifference } from '../utils/formatTimeDifference';
import { Link } from 'react-router-dom';

const Banner: React.FC = () => {
  const [banner, setBanner] = useState<BannerData | null>(null);
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const fetchBannerDetails = useCallback(async () => {
    try {
      const response = await getBannerDetails(1);

      const validTill = new Date(response.payload.ValidTill).getTime();

      const validTillTime = DateTime.fromMillis(validTill, { zone: 'utc' });

      const currentTime = DateTime.now()

      const timeDifferenceInSeconds = Math.max(validTillTime.diff(currentTime, 'seconds').seconds, 0);

      setBanner(response.payload);
      setTimeLeft(timeDifferenceInSeconds);
    } catch (error) {
      console.error('Error fetching banner data:', error);
    }
  }, []);

  useEffect(() => {
    fetchBannerDetails();
    intervalRef.current = setInterval(() => {
      setTimeLeft(prev => (prev !== null && prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [fetchBannerDetails]);

  useEffect(() => {
    // Clear the interval if timeLeft is 0
    if (timeLeft != null && timeLeft <= 0 && intervalRef.current) {
      clearInterval(intervalRef.current);
    }

  }, [timeLeft]);



  return (
    <div className="app">

      {timeLeft != null && timeLeft > 0 ? (
        <div
          className="banner"
          onClick={() => window.open(banner?.Link, '_blank', 'noopener,noreferrer')}
        >
          <h1>Special Announcement</h1>
          <p>{banner?.Description}</p>
          <p className="time-left">Time left: {formatTimeDifference(timeLeft)}</p>
        </div>
      ) : (
        <div className="no-banner-content">
          <p>The special announcement banner is no longer available.</p>
          <p>Check out our other updates below:</p>
        </div>
      )}


      <div className='content'>
        <h2 style={{ color: 'red' }}>
          <Link to="/dashboard" style={{ textDecoration: 'none', color: 'inherit' }}>
            Click for dashboard
          </Link>
        </h2>
      </div>

      <div className="content">
        <section className="info-section">
          <h2>Website Layout:</h2>
          <p>
            Design a simple, clean one-page website that can optionally display a banner. The banner's visibility should be controllable.
          </p>
          <p>
            Frontend Countdown Display: Implement a countdown timer on the banner, displayed as a reverse clock, that shows the remaining time before the banner disappears.
          </p>
        </section>


      </div>
    </div>
  );
};


export default Banner;
