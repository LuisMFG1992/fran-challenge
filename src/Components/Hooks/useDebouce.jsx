import React, { useEffect, useState } from "react";

const useDebouce = (value, delay = 100) => {
  const [deboucedValue, setDeboucedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDeboucedValue(value);
    }, delay);

    return clearTimeout(timer);
  }, [value, delay]);

  return deboucedValue;
};

export default useDebouce;
