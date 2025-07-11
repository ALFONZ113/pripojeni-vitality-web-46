
import { Handler } from '@netlify/functions';
import { blogPosts } from '../../src/data/blog';

// SSR template pre blog posty
const generateBlogPostHTML = (post: any) => {
  const canonicalUrl = `https://www.popri.cz/blog/${post.id}`;
  const ogImage = post.image.startsWith('http') ? post.image : `https://www.popri.cz${post.image}`;
  
  return `<!DOCTYPE html>
<html lang="cs">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${post.title} | PODA pripojení | Popri.cz</title>
  <meta name="description" content="${post.excerpt || post.content.substring(0, 160)}">
  <link rel="canonical" href="${canonicalUrl}">
  <meta property="og:title" content="${post.title}">
  <meta property="og:description" content="${post.excerpt || post.content.substring(0, 160)}">
  <meta property="og:url" content="${canonicalUrl}">
  <meta property="og:image" content="${ogImage}">
  <meta property="og:type" content="article">
  <meta name="robots" content="index, follow">
  <meta name="keywords" content="PODA pripojení, ${post.category}, internet, optické pripojenie">
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": "${post.title}",
    "description": "${post.excerpt || post.content.substring(0, 160)}",
    "image": "${ogImage}",
    "datePublished": "${post.date.split('. ').reverse().join('-')}",
    "author": {
      "@type": "Person",
      "name": "${post.author}"
    },
    "publisher": {
      "@type": "Organization",
      "name": "PODA pripojení",
      "logo": "https://www.popri.cz/poda-logo.svg"
    }
  }
  </script>
  <style>
    body { font-family: system-ui, sans-serif; line-height: 1.6; max-width: 800px; margin: 0 auto; padding: 20px; }
    .post-header { border-bottom: 1px solid #eee; padding-bottom: 20px; margin-bottom: 20px; }
    .post-meta { color: #666; font-size: 14px; }
    .post-content { prose: true; }
    img { max-width: 100%; height: auto; }
  </style>
</head>
<body>
  <article>
    <header class="post-header">
      <h1>${post.title}</h1>
      <div class="post-meta">
        <span>Autor: ${post.author}</span> • 
        <span>Dátum: ${post.date}</span> • 
        <span>Kategória: ${post.category}</span> •
        <span>PODA pripojení</span>
      </div>
    </header>
    <div class="post-content">
      ${post.content}
    </div>
  </article>
  <script>
    // Redirect na SPA po načítaní pre používateľov
    if (!/bot/i.test(navigator.userAgent)) {
      setTimeout(() => {
        window.location.href = '${canonicalUrl}?spa=true';
      }, 2000);
    }
  </script>
</body>
</html>`;
};

// SSR template pre hlavnú stránku
const generateHomeHTML = () => {
  return `<!DOCTYPE html>
<html lang="cs">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Popri.cz – Rychlý PODA pripojení s TV Zdarma | Gigabitové Připojení</title>
  <meta name="description" content="Hledáte spolehlivý PODA pripojení? Popri.cz vám nabízí gigabitové připojení s TV zdarma a non-stop podporou. Rychlá instalace PODA pripojení.">
  <link rel="canonical" href="https://www.popri.cz">
  <meta property="og:title" content="Popri.cz – PODA pripojení">
  <meta property="og:description" content="Gigabitové PODA pripojení s TV zdarma">
  <meta property="og:url" content="https://www.popri.cz">
  <meta name="robots" content="index, follow">
  <meta name="keywords" content="PODA pripojení, internet Ostrava, optické pripojenie, gigabitový internet">
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "PODA pripojení - Popri.cz",
    "url": "https://www.popri.cz",
    "logo": "https://www.popri.cz/poda-logo.svg",
    "description": "PODA pripojení - gigabitové internetové pripojenie s TV zdarma",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+420-739-065-142",
      "contactType": "customer service"
    }
  }
  </script>
  <style>
    body { font-family: system-ui, sans-serif; line-height: 1.6; margin: 0; padding: 20px; }
    .hero { text-align: center; padding: 40px 20px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; }
    .features { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px; padding: 40px 20px; }
    .feature { padding: 20px; border: 1px solid #eee; border-radius: 8px; }
  </style>
</head>
<body>
  <div class="hero">
    <h1>PODA pripojení - Gigabitové pripojenie</h1>
    <p>Rychlý a spolehlivý PODA pripojení s TV zdarma</p>
  </div>
  <div class="features">
    <div class="feature">
      <h2>Gigabitové rýchlosti</h2>
      <p>PODA pripojení až do 1000 Mb/s download a upload</p>
    </div>
    <div class="feature">
      <h2>TV zdarma</h2>
      <p>Viac ako 100 TV kanálov v cene PODA pripojení</p>
    </div>
    <div class="feature">
      <h2>Non-stop podpora</h2>
      <p>Technická podpora PODA pripojení 24/7</p>
    </div>
  </div>
  <script>
    if (!/bot/i.test(navigator.userAgent)) {
      setTimeout(() => {
        window.location.href = '/?spa=true';
      }, 2000);
    }
  </script>
</body>
</html>`;
};

// SSR template pre geografické stránky
const generateGeoHTML = (city: string) => {
  return `<!DOCTYPE html>
<html lang="cs">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>PODA pripojení ${city} | Internet a TV | Popri.cz</title>
  <meta name="description" content="PODA pripojení ${city} - gigabitové internetové pripojenie s TV zdarma. Rychlá instalace a spolehlivé PODA pripojení v ${city}.">
  <link rel="canonical" href="https://www.popri.cz/internet-${city.toLowerCase()}">
  <meta name="robots" content="index, follow">
  <meta name="keywords" content="PODA pripojení ${city}, internet ${city}, optické pripojenie ${city}">
  <style>
    body { font-family: system-ui, sans-serif; line-height: 1.6; margin: 0; padding: 20px; }
    .hero { text-align: center; padding: 40px 20px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; }
  </style>
</head>
<body>
  <div class="hero">
    <h1>PODA pripojení ${city}</h1>
    <p>Gigabitové PODA pripojení s TV zdarma v ${city}</p>
  </div>
  <div style="padding: 40px 20px;">
    <h2>PODA pripojení ${city} - Výhody</h2>
    <ul>
      <li>Gigabitové rychlosti PODA pripojení</li>
      <li>TV zdarma s PODA pripojení</li>
      <li>Technická podpora 24/7</li>
      <li>Rychlá instalace v ${city}</li>
    </ul>
  </div>
  <script>
    if (!/bot/i.test(navigator.userAgent)) {
      setTimeout(() => {
        window.location.href = '/internet-${city.toLowerCase()}?spa=true';
      }, 2000);
    }
  </script>
</body>
</html>`;
};

export const handler: Handler = async (event) => {
  const path = event.path.replace('/.netlify/functions/ssr-renderer', '') || '/';
  
  console.log(`SSR rendering for path: ${path}`);
  
  // Blog post SSR
  if (path.startsWith('/blog/')) {
    const postId = parseInt(path.split('/blog/')[1]);
    const post = blogPosts.find(p => p.id === postId);
    
    if (post) {
      return {
        statusCode: 200,
        headers: {
          'Content-Type': 'text/html; charset=utf-8',
          'Cache-Control': 'public, max-age=3600, s-maxage=3600',
        },
        body: generateBlogPostHTML(post),
      };
    }
  }
  
  // Geographic pages SSR
  if (path.startsWith('/internet-')) {
    const city = path.split('/internet-')[1];
    const cityNames = {
      'ostrava': 'Ostrava',
      'karvina': 'Karviná',
      'bohumin': 'Bohumín',
      'havirov': 'Havířov',
      'poruba': 'Poruba'
    };
    
    const cityName = cityNames[city as keyof typeof cityNames];
    if (cityName) {
      return {
        statusCode: 200,
        headers: {
          'Content-Type': 'text/html; charset=utf-8',
          'Cache-Control': 'public, max-age=3600, s-maxage=3600',
        },
        body: generateGeoHTML(cityName),
      };
    }
  }
  
  // Homepage SSR
  if (path === '/' || path === '') {
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': 'public, max-age=3600, s-maxage=3600',
      },
      body: generateHomeHTML(),
    };
  }
  
  // Blog listing SSR
  if (path === '/blog') {
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': 'public, max-age=1800, s-maxage=1800',
      },
      body: `<!DOCTYPE html>
<html lang="cs">
<head>
  <title>Novinky IT | PODA pripojení | Popri.cz</title>
  <meta name="description" content="IT novinky, technológie a tipy pre PODA pripojení a TV">
  <link rel="canonical" href="https://www.popri.cz/blog">
  <meta name="keywords" content="PODA pripojení, IT novinky, technológie, internet">
</head>
<body>
  <h1>Novinky IT - PODA pripojení</h1>
  <p>Najnovšie IT novinky a technológie pre PODA pripojení</p>
  ${blogPosts.slice(0, 10).map(post => `
    <article>
      <h2><a href="/blog/${post.id}">${post.title}</a></h2>
      <p>${post.excerpt}</p>
    </article>
  `).join('')}
  <script>
    if (!/bot/i.test(navigator.userAgent)) {
      setTimeout(() => window.location.href = '/blog?spa=true', 2000);
    }
  </script>
</body>
</html>`,
    };
  }
  
  return {
    statusCode: 404,
    body: 'Page not found',
  };
};
