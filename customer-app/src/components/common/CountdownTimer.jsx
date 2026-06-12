import React, { useState, useEffect } from 'react';

const CountdownTimer = ({ endDate }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const end = new Date(endDate).getTime();
      const distance = end - now;

      if (distance < 0) {
        clearInterval(timer);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      } else {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [endDate]);

  return (
    <div className="flex gap-2">
      <div className="text-center">
        <div className="bg-gray-900 text-white rounded-lg px-3 py-2 min-w-[60px]">
          <span className="text-2xl font-bold">{String(timeLeft.days).padStart(2, '0')}</span>
          <span className="text-xs block">Days</span>
        </div>
      </div>
      <div className="text-center">
        <div className="bg-gray-900 text-white rounded-lg px-3 py-2 min-w-[60px]">
          <span className="text-2xl font-bold">{String(timeLeft.hours).padStart(2, '0')}</span>
          <span className="text-xs block">Hours</span>
        </div>
      </div>
      <div className="text-center">
        <div className="bg-gray-900 text-white rounded-lg px-3 py-2 min-w-[60px]">
          <span className="text-2xl font-bold">{String(timeLeft.minutes).padStart(2, '0')}</span>
          <span className="text-xs block">Mins</span>
        </div>
      </div>
      <div className="text-center">
        <div className="bg-gray-900 text-white rounded-lg px-3 py-2 min-w-[60px]">
          <span className="text-2xl font-bold">{String(timeLeft.seconds).padStart(2, '0')}</span>
          <span className="text-xs block">Secs</span>
        </div>
      </div>
    </div>
  );
};

export default CountdownTimer;