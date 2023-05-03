import React, { useState } from 'react';

export const Slider: React.FC = () => {
  const [v, setV] = useState(0);
  return (
    <input type='range' value={v} onChange={(e) => setV(+e.target.value)} />
  );
};
