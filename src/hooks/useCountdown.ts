import { useEffect, useState } from 'react';

const useCountdown = (targetDate: string) => {
  const countDownDate = new Date(targetDate).getTime();

  const [countDown, setCountDown] = useState(
    countDownDate - new Date().getTime()
  );

  useEffect(() => {
    const interval = setInterval(() => {
      const newCountDown = countDownDate - new Date().getTime();
      if (newCountDown <= 0) {
        clearInterval(interval);
        setCountDown(0); // Ensure it doesn't go negative if component is still mounted
      } else {
        setCountDown(newCountDown);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [countDownDate]);

  if (countDown <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isFinished: true };
  }

  const days = Math.floor(countDown / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (countDown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((countDown % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((countDown % (1000 * 60)) / 1000);

  return { days, hours, minutes, seconds, isFinished: false };
};

export default useCountdown;