export const schema = {
  types: [
    {
      name: 'phone',
      title: 'Phone Model',
      type: 'document',
      groups: [
        { name: 'general', title: 'General Features' },
        { name: 'display', title: 'Display' },
        { name: 'performance', title: 'Memory & Performance' },
        { name: 'camera', title: 'Camera' },
        { name: 'network', title: 'Connectivity' },
        { name: 'media', title: 'Gallery' }
      ],
      fields: [
        // --- GENERAL FEATURES ---
        { name: 'title', title: 'Model Name', type: 'string', group: 'general' },
        { name: 'slug', title: 'URL Slug', type: 'slug', options: { source: 'title' }, group: 'general' },
        { name: 'price', title: 'Price (PKR)', type: 'number', group: 'general' },
        { name: 'launchDate', title: 'Release Date', type: 'string', group: 'general' },
        { name: 'simConfig', title: 'SIM Support', type: 'string', group: 'general' },
        { name: 'dimensions', title: 'Phone Dimensions', type: 'string', group: 'general' },
        { name: 'weight', title: 'Phone Weight', type: 'string', group: 'general' },
        { name: 'software', title: 'Operating System', type: 'string', group: 'general' },

        // --- DISPLAY ---
        { name: 'displayDiagonal', title: 'Screen Size', type: 'string', group: 'display' },
        { name: 'resolution', title: 'Screen Resolution', type: 'string', group: 'display' },
        { name: 'panelTech', title: 'Screen Type', type: 'string', group: 'display' },
        { name: 'glassShield', title: 'Screen Protection', type: 'string', group: 'display' },

        // --- MEMORY & PERFORMANCE ---
        { name: 'builtInStorage', title: 'Internal Memory', type: 'string', group: 'performance' },
        { name: 'systemMemory', title: 'RAM', type: 'string', group: 'performance' },
        { name: 'expandableStorage', title: 'Card Slot', type: 'string', group: 'performance' },
        { name: 'cpu', title: 'Processor', type: 'string', group: 'performance' },
        { name: 'graphics', title: 'GPU', type: 'string', group: 'performance' },
        { name: 'batteryCapacity', title: 'Battery', type: 'string', group: 'performance' },

        // --- CAMERA ---
        { name: 'primaryCamera', title: 'Back Camera', type: 'string', group: 'camera' },
        { name: 'mainFlash', title: 'Back Flash Light', type: 'boolean', group: 'camera' },
        { name: 'mainVideo', title: 'Back Video Recording', type: 'string', group: 'camera' },
        { name: 'selfieLens', title: 'Front Camera', type: 'string', group: 'camera' },
        { name: 'selfieFlash', title: 'Front Flash Light', type: 'boolean', group: 'camera' },
        { name: 'selfieVideo', title: 'Front Video Recording', type: 'string', group: 'camera' },

        // --- CONNECTIVITY ---
        { name: 'has5G', title: '5G', type: 'boolean', group: 'network' },
        { name: 'has4G', title: '4G/LTE', type: 'boolean', group: 'network' },
        { name: 'has3G', title: '3G', type: 'boolean', group: 'network' },
        { name: 'wifi', title: 'WiFi', type: 'string', group: 'network' },
        { name: 'bluetooth', title: 'Bluetooth', type: 'string', group: 'network' },
        { name: 'nfc', title: 'NFC', type: 'boolean', group: 'network' },
        { name: 'radio', title: 'Radio', type: 'boolean', group: 'network' },

        // --- GALLERY ---
        {
          name: 'images',
          title: 'Images',
          type: 'array',
          group: 'media',
          of: [{ type: 'image', options: { hotspot: true } }]
        }
      ]
    }
  ]
}
export const schema = {
  types: [
    // ... (Keep your existing 'phone' schema here) ...

    // --- 1. NEWS SCHEMA ---
    {
      name: 'news',
      title: '5G News',
      type: 'document',
      fields: [
        { name: 'title', title: 'Headline', type: 'string' },
        { name: 'slug', title: 'URL Slug', type: 'slug', options: { source: 'title' } },
        { name: 'isFeatured', title: 'Feature on Homepage?', type: 'boolean', description: 'Turn on to push this to the bottom Featured slider.' },
        { name: 'publishedAt', title: 'Publish Date', type: 'datetime' },
        { name: 'snippet', title: 'Short Snippet (1-2 lines)', type: 'text' },
        { name: 'content', title: 'Full Article Content', type: 'array', of: [{ type: 'block' }] }
      ]
    },

    // --- 2. BLOG SCHEMA ---
    {
      name: 'blog',
      title: 'Mobile Guides & Blogs',
      type: 'document',
      fields: [
        { name: 'title', title: 'Blog Title', type: 'string' },
        { name: 'slug', title: 'URL Slug', type: 'slug', options: { source: 'title' } },
        { name: 'category', title: 'Category Badge', type: 'string', description: 'e.g., Mobile Guide, PTA Tax, Comparison' },
        { name: 'featuredImage', title: 'Cover Image', type: 'image', options: { hotspot: true } },
        { name: 'excerpt', title: 'Short Excerpt', type: 'text' },
        { name: 'readTime', title: 'Reading Time (e.g., 4 min read)', type: 'string' },
        { name: 'content', title: 'Full Blog Content', type: 'array', of: [{ type: 'block' }] }
      ]
    },

    // --- 3. BRAND SCHEMA ---
    {
      name: 'brand',
      title: 'Mobile Brands',
      type: 'document',
      fields: [
        { name: 'name', title: 'Brand Name', type: 'string' },
        { name: 'slug', title: 'Brand URL Slug', type: 'slug', options: { source: 'name' } },
        { name: 'logo', title: 'Brand Logo (SVG or PNG)', type: 'image', options: { hotspot: true } }
      ]
    },

    // --- 4. ALERT BANNER SCHEMA ---
    {
      name: 'banner',
      title: 'Promo / Alert Banner',
      type: 'document',
      fields: [
        { name: 'title', title: 'Internal Title (e.g., Ramadan Sale)', type: 'string' },
        { name: 'alertText', title: 'Banner Text', type: 'string' },
        { name: 'linkUrl', title: 'Clickable URL', type: 'url' },
        { name: 'isActive', title: 'Banner Active?', type: 'boolean', description: 'Turn on to display this banner at the top of the website.' }
      ]
    }
  ]
}
