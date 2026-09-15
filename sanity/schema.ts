import { defineType, defineField, defineArrayMember } from 'sanity'

export default defineType({
  name: 'phone',
  title: 'Mobile Phone',
  type: 'document',
  // 1. We define groups to create clean tabs in the Sanity Admin panel
  groups: [
    { name: 'general', title: 'General & Design' },
    { name: 'display', title: 'Display Specs' },
    { name: 'hardware', title: 'Hardware & Battery' },
    { name: 'camera', title: 'Cameras' },
    { name: 'connectivity', title: 'Network & Connectivity' },
    { name: 'media', title: 'Gallery' },
  ],
  fields: [
    // --- GENERAL & DESIGN ---
    defineField({ name: 'title', title: 'Device Name', type: 'string', group: 'general' }),
    defineField({ name: 'slug', title: 'URL Slug', type: 'slug', options: { source: 'title' }, group: 'general' }),
    defineField({ name: 'launchDate', title: 'Launch Date', type: 'string', group: 'general' }),
    defineField({ name: 'simConfig', title: 'SIM Configuration', type: 'string', group: 'general' }),
    defineField({ name: 'dimensions', title: 'Device Dimensions', type: 'string', group: 'general' }),
    defineField({ name: 'weight', title: 'Device Weight', type: 'string', group: 'general' }),
    defineField({ name: 'osVersion', title: 'OS Version', type: 'string', group: 'general' }),

    // --- DISPLAY ---
    defineField({ name: 'displaySize', title: 'Display Size', type: 'string', group: 'display' }),
    defineField({ name: 'resolution', title: 'Screen Resolution', type: 'string', group: 'display' }),
    defineField({ name: 'displayTech', title: 'Display Tech (Type)', type: 'string', group: 'display' }),
    defineField({ name: 'glassProtection', title: 'Glass Protection', type: 'string', group: 'display' }),

    // --- HARDWARE & MEMORY ---
    defineField({ name: 'storageCapacity', title: 'Storage Capacity (ROM)', type: 'string', group: 'hardware' }),
    defineField({ name: 'systemMemory', title: 'System Memory (RAM)', type: 'string', group: 'hardware' }),
    defineField({ name: 'expandableStorage', title: 'Expandable Storage', type: 'string', group: 'hardware' }),
    defineField({ name: 'chipset', title: 'Chipset (Processor)', type: 'string', group: 'hardware' }),
    defineField({ name: 'graphics', title: 'Graphics (GPU)', type: 'string', group: 'hardware' }),
    defineField({ name: 'batteryCapacity', title: 'Battery Capacity', type: 'string', group: 'hardware' }),

    // --- CAMERAS ---
    defineField({ name: 'mainCameraSetup', title: 'Main Camera Setup', type: 'string', group: 'camera' }),
    defineField({ name: 'backVideo', title: 'Main Video Recording', type: 'string', group: 'camera' }),
    defineField({ name: 'backFlash', title: 'Main Flash Light', type: 'boolean', group: 'camera' }),
    
    defineField({ name: 'selfieCamera', title: 'Selfie Camera', type: 'string', group: 'camera' }),
    defineField({ name: 'frontVideo', title: 'Selfie Video Recording', type: 'string', group: 'camera' }),
    defineField({ name: 'frontFlash', title: 'Selfie Flash Light', type: 'boolean', group: 'camera' }),

    // --- CONNECTIVITY ---
    defineField({ name: 'has5G', title: '5G Network Support', type: 'boolean', group: 'connectivity' }),
    defineField({ name: 'has4G', title: '4G/LTE Support', type: 'boolean', group: 'connectivity' }),
    defineField({ name: 'has3G', title: '3G Support', type: 'boolean', group: 'connectivity' }),
    defineField({ name: 'wifi', title: 'WiFi Features', type: 'string', group: 'connectivity' }),
    defineField({ name: 'bluetooth', title: 'Bluetooth Version', type: 'string', group: 'connectivity' }),
    defineField({ name: 'nfc', title: 'NFC Support', type: 'boolean', group: 'connectivity' }),
    defineField({ name: 'radio', title: 'FM Radio', type: 'boolean', group: 'connectivity' }),

    // --- MEDIA / GALLERY ---
    // 2. This array allows you to upload multiple images (front, back, side angles)
    defineField({
      name: 'gallery',
      title: 'Phone Gallery',
      type: 'array',
      group: 'media',
      of: [
        defineArrayMember({
          type: 'image',
          options: { hotspot: true } // Hotspot allows you to crop images directly in Sanity
        })
      ]
    }),
  ],
})
