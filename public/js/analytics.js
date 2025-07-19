
// Google Analytics initialization
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());

// Google Analytics config
gtag('config', 'G-B56HVH7E5R', { 'send_page_view': false });

// Google Ads config - pridané pre sledovanie konverzií
gtag('config', 'AW-17366246923');

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

// Google Ads conversion tracking function
window.trackConversion = function(conversionType = 'Prihlásenie na odber', value = 1.0, currency = 'CZK') {
  gtag('event', 'conversion', {
    'send_to': 'AW-17366246923/xUWjCPadwPIaEIvM79hA',
    'value': value,
    'currency': currency,
    'transaction_id': '' // Môžete pridať jedinečné ID transakcie
  });
  
  console.log('Google Ads conversion tracked:', conversionType, value, currency);
};
