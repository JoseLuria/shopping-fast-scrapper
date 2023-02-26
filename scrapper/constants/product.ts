export const PRODUCT_SELECTORS = [
  {
    name: 'name',
    selector: 'h1',
    attr: null,
    iterator: null
  },
  {
    name: 'priceUnique',
    selector: '.group_price .unique_price',
    attr: null,
    iterator: null
  },
  {
    name: 'priceOld',
    selector: '.group_price .old_price',
    attr: null,
    iterator: null
  },
  {
    name: 'discount',
    selector: '.tam_normal .discountRibbon',
    attr: null,
    iterator: null
  },
  {
    name: 'description',
    selector: '.productContainerDescription .content #longDescriptionWidgetId div',
    attr: null,
    iterator: null
  },
  {
    name: 'imageContainer',
    selector: '.image_container a',
    attr: 'href',
    iterator: null
  },
  {
    name: 'imagesElements',
    selector: '.other_views ul li a',
    attr: null,
    iterator: [{ name: 'image', find: '', attr: 'href' }]
  },
  {
    name: 'properties',
    selector: '#descriptiveAttributesWidgetId ul li',
    attr: null,
    iterator: [
      { name: 'name', find: 'span:first-child', attr: null },
      { name: 'value', find: 'span:last-child', attr: null }
    ]
  }
]

export const PRODUCTS_REMOVE_PROPERTIES = [
  'imageContainer',
  'imagesElements',
  'priceOld',
  'priceUnique',
  'propertiesElements'
]
