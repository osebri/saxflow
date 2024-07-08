import React from 'react';
import { useLocation } from 'react-router-dom';
import CircleRectangleAnimation from './CircleRectangleAnimation';

const CircleRectangleAnimationWrapper = () => {
  const location = useLocation();
  const { tutorial } = location.state || { tutorial: {} };

  return <CircleRectangleAnimation tutorial={tutorial} />;
};

export default CircleRectangleAnimationWrapper;
