export const schema = {
  types: [
    {
      name: 'phone',
      title: 'Phone Model',
      type: 'document',
      groups: [
        { name: 'general', title: 'General & Design' },
        { name: 'display', title: 'Display Specs' },
        { name: 'performance', title: 'Core & Storage' },
        { name: 'camera', title: 'Cameras' },
        { name: 'network', title: 'Connectivity' },
        { name: 'media', title: 'Images Gallery' }
      ],
      fields: [
        // --- GENERAL ---
        { name: 'title', title: 'Phone Name', type: 'string', group: 'general' },
        { name: 'slug', title: 'URL Slug', type: 'slug', options: { source: 'title' }, group: 'general' },
        { name: 'price', title: 'Price in PKR', type: 'number', group: 'general' },
        { name: 'launchDate', title: 'Market Debut (Release Date)', type: 'string', group: 'general' },
        { name: 'simConfig', title: 'SIM Configuration', type: 'string', group: 'general' },
        { name: 'dimensions', title: 'Device Proportions', type: 'string', group: 'general' },
        { name: 'weight', title: 'Device Mass', type: 'string', group: 'general' },
        { name: 'software', title: 'Software Platform (OS)', type: 'string', group: 'general' },

        // --- DISPLAY ---
        { name: 'displayDiagonal', title: 'Display Diagonal (Size)', type: 'string', group: 'display' },
        { name: 'resolution', title: 'Screen Resolution', type: 'string', group: 'display' },
        { name: 'panelTech', title: 'Panel Technology (Type)', type: 'string', group: 'display' },
        { name: 'glassShield', title: 'Glass Shield Protection', type: 'string', group: 'display' },

        // --- PERFORMANCE ---
        { name: 'builtInStorage', title: 'Built-in Storage (ROM)', type: 'string', group: 'performance' },
        { name: 'systemMemory', title: 'System Memory (RAM)', type: 'string', group: 'performance' },
        { name: 'expandableStorage', title: 'Expandable Storage (SD Card)', type: 'string', group: 'performance' },
        { name: 'cpu', title: 'Chipset / CPU', type: 'string', group: 'performance' },
        { name: 'graphics', title: 'Graphics Processor (GPU)', type: 'string', group: 'performance' },
        { name: 'batteryCapacity', title: 'Battery Capacity', type: 'string', group: 'performance' },

        // --- CAMERAS ---
        { name: 'primaryCamera', title: 'Primary Camera Array', type: 'string', group: 'camera' },
        { name: 'mainFlash', title: 'Main Flash Illumination', type: 'boolean', group: 'camera' },
        { name: 'mainVideo', title: 'Main Video Capture', type: 'string', group: 'camera' },
        { name: 'selfieLens', title: 'Selfie Lens', type: 'string', group: 'camera' },
        { name: 'selfieFlash', title: 'Selfie Illumination', type: 'boolean', group: 'camera' },
        { name: 'selfieVideo', title: 'Selfie Video Capture', type: 'string', group: 'camera' },

        // --- CONNECTIVITY ---
        { name: 'has5G', title: 'Supports 5G?', type: 'boolean', group: 'network' },
        { name: 'has4G', title: 'Supports 4G/LTE?', type: 'boolean', group: 'network' },
        { name: 'has3G', title: 'Supports 3G?', type: 'boolean', group: 'network' },
        { name: 'wifi', title: 'Wi-Fi Connectivity', type: 'string', group: 'network' },
        { name: 'bluetooth', title: 'Bluetooth Version', type: 'string', group: 'network' },
        { name: 'nfc', title: 'NFC Support', type: 'boolean', group: 'network' },
        { name: 'radio', title: 'FM Radio', type: 'boolean', group: 'network' },

        // --- MEDIA ---
        {
          name: 'images',
          title: 'Phone Gallery',
          type: 'array',
          group: 'media',
          of: [{ type: 'image', options: { hotspot: true } }]
        }
      ]
    }
  ]
}
