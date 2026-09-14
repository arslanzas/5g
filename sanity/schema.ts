export const schema = {
  types: [
    {
      name: 'phone',
      title: 'Phone Model',
      type: 'document',
      fields: [
        { name: 'title', title: 'Phone Name', type: 'string' },
        { 
          name: 'slug', 
          title: 'URL Slug', 
          type: 'slug', 
          options: { source: 'title', maxLength: 96 } 
        },
        { name: 'brand', title: 'Brand (e.g., Samsung, Apple)', type: 'string' },
        { name: 'price', title: 'Official Price (PKR)', type: 'number' },
        { name: 'ptaApproved', title: 'PTA Approved?', type: 'boolean' },
        { name: 'has5G', title: 'Supports 5G?', type: 'boolean' },
        { name: 'image', title: 'Device Photo', type: 'image', options: { hotspot: true } },
        
        // Quick Specs
        { name: 'screen', title: 'Display (e.g., 6.8" 120Hz AMOLED)', type: 'string' },
        { name: 'processor', title: 'Chipset (e.g., Snapdragon 8 Gen 3)', type: 'string' },
        { name: 'ramStorage', title: 'RAM & Storage (e.g., 12GB / 256GB)', type: 'string' },
        { name: 'mainCamera', title: 'Main Camera (e.g., 200MP + 50MP)', type: 'string' },
        { name: 'selfieCamera', title: 'Selfie Camera (e.g., 12MP)', type: 'string' },
        { name: 'battery', title: 'Battery & Charging (e.g., 5000mAh, 45W)', type: 'string' },
        
        // Editorial Review & Pros/Cons
        { 
          name: 'pros', 
          title: 'Pros (What We Like)', 
          type: 'array', 
          of: [{ type: 'string' }] 
        },
        { 
          name: 'cons', 
          title: 'Cons (What Could Be Better)', 
          type: 'array', 
          of: [{ type: 'string' }] 
        },
        { name: 'verdict', title: 'Our Verdict / Review Summary', type: 'text' },
      ],
    },
  ],
}
