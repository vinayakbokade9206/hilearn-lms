import { useEffect, useState } from "react";

const useCountUp = (end, duration = 1000) => {
  const safeEnd = Number(end) || 0;   // 🔥 MAIN FIX
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const increment = safeEnd / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start >= safeEnd) {
        setCount(safeEnd);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [safeEnd, duration]);

  return count;
};

export default useCountUp;
