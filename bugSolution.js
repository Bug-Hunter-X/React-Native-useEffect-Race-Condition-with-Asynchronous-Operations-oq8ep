import React, { useState, useEffect, useRef } from 'react';

const MyComponent = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const isMountedRef = useRef(true);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    
    const fetchData = async () => {
      try {
        const response = await fetch('https://api.example.com/data', { signal });
        const json = await response.json();
        if (isMountedRef.current) {
          setData(json);
        }
      } catch (err) {
        if (isMountedRef.current) {
          setError(err);
        }
      }
    };

    fetchData();

    return () => {
      isMountedRef.current = false;
      controller.abort();
    };
  }, []);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      {data ? JSON.stringify(data) : 'Loading...'}
    </div>
  );
};

export default MyComponent;