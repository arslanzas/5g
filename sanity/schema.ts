export const schema = {
  types: [
    {
      name: 'phone',
      title: 'Phone Model',
      type: 'document',
      fields: [
        { name: 'title', title: 'Phone Name', type: 'string' },
        { name: 'price', title: 'Price in PKR', type: 'number' },
        { name: 'has5G', title: 'Supports 5G?', type: 'boolean' }
      ]
    }
  ]
}
