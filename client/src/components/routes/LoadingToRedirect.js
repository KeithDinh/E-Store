import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

const LoadingToRedirect = () => {
  const [count, setCount] = useState(5);
  let history = useHistory();

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((currentCount) => --currentCount);
    }, 1000);

    // redirect when time out
    count === 0 && history.push("/");

    // cleanup
    return () => clearInterval(interval);
  }, [count, history]);
  return (
    <div className="container p-5 text-center">
      <h2 className="text-warning">Redirecting in {count} second</h2>
    </div>
  );
};

export default LoadingToRedirect;
