import React, { useEffect, useState } from 'react';
import styles from './TimeSidebar.module.css';

/**
 * TimeSidebar component
 * Single Responsibility: Display the date, time stamp, and rhetorical editorial copy
 * in the left grid margin.
 */
export const TimeSidebar: React.FC = () => {
  const [timeStr, setTimeStr] = useState('1:42 PM');
  const [dateStr, setDateStr] = useState('THU, 11 SEP');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // Format time as H:MM AM/PM
      const formattedTime = now.toLocaleTimeString([], {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
      });
      // Format date as DAY, DD MMM
      const formattedDate = now
        .toLocaleDateString([], {
          weekday: 'short',
          day: 'numeric',
          month: 'short',
        })
        .toUpperCase();

      setTimeStr(formattedTime);
      setDateStr(formattedDate);
    };

    updateTime();
    const timer = setInterval(updateTime, 1000 * 30);
    return () => clearInterval(timer);
  }, []);

  return (
    <aside className={styles.sidebar} aria-label="Current schedule context">
      <div className={styles.timeGroup}>
        <span className={styles.date}>{dateStr}</span>
        <span className={styles.time}>{timeStr}</span>
      </div>

      <span className={styles.dash} aria-hidden="true">—</span>

      <div className={styles.editorialText}>
        <span>ANOTHER</span>
        <span>CLASS?</span>
        <span>REALLY?</span>
      </div>
    </aside>
  );
};
