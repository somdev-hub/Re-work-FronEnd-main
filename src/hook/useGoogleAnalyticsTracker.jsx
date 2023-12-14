import React from 'react';
import ReactGA from 'react-ga';

const useGoogleAnalyticsTracker = (category = "Event Categoray") => {
    const EventTracker = (action = "Action", label = "Lable") => {
        ReactGA.event({ category, action, label })
    }
    return EventTracker;
}; 
 
export default useGoogleAnalyticsTracker;