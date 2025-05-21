
// Google Analytics initialization
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-B56HVH7E5R', { 'send_page_view': false });

// Delayed loading of analytics
window.addEventListener('load', function() {
  setTimeout(function() {
    var script = document.createElement('script');
    script.src = 'https://www.googletagmanager.com/gtag/js?id=G-B56HVH7E5R';
    script.async = true;
    document.head.appendChild(script);
    
    gtag('event', 'page_view');
  }, 1000);
});
