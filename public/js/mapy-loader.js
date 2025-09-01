
// Mapy.cz API initialization - Non-blocking
function initMapy() {
  if (typeof Loader !== 'undefined') {
    Loader.load(null, {
      apiKey: '99CljcS9lbvcstE5'
    });
  } else {
    // Retry if Loader not ready yet
    setTimeout(initMapy, 100);
  }
}

// Use requestIdleCallback for better performance
if ('requestIdleCallback' in window) {
  requestIdleCallback(initMapy);
} else {
  setTimeout(initMapy, 0);
}
