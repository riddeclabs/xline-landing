import ReactGA from 'react-ga4';
import { UaEventOptions } from 'react-ga4/types/ga4';

export const useAnalyticsEventTracker = (category = 'Landing') => {
  const eventTracker = (options: Partial<UaEventOptions>) => {
    ReactGA.event({ category, action: 'test_action', ...options });
  };
  return eventTracker;
};
