export const defaults = {
  color: '#ffffff',
  text: 'Hey',
  textColor: '#000000',
  productImageName: 'product.png',
  productPrintUploadName: '',
  productPrintSelect: ''
}

export const inputs = [
  {
    "type": "text", 
    "name": "text",
    "id": "text",
    value: defaults.text
  },
  {
    "type": "color", 
    "name": "text-color",
    "id": "text-color",
    value: defaults.textColor
  },
  {
    "type": "color", 
    "name": "color",
    "id": "color",
    value: defaults.color
  },
  {
    "type": "file", 
    "name": "print-upload",
    "id": "print-upload",
    value: defaults.productPrintUploadName
  },
  {
    "type": "select", 
    "name": "",
    "id": "print-select",
    value: defaults.productPrintSelect
  }
];

