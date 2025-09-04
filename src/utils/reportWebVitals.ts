// Simple web vitals reporting
const reportWebVitals = (onPerfEntry?: any) => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    // Optional: Import web-vitals when needed
    try {
      import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
        getCLS(onPerfEntry);
        getFID(onPerfEntry);
        getFCP(onPerfEntry);
        getLCP(onPerfEntry);
        getTTFB(onPerfEntry);
      }).catch(() => {
        // Silently fail if web-vitals is not available
        console.log('Web vitals not available');
      });
    } catch (error) {
      console.log('Web vitals import failed');
    }
  }
};

export { reportWebVitals };
export default reportWebVitals;
