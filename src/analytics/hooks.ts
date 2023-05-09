import { event } from 'react-ga';

export const useAnalyticsEventTracker = (category = 'Landing') => {
  const eventTracker = (action = 'test action', label = 'test label') => {
    event({ category, action, label });
  };
  return eventTracker;
};
