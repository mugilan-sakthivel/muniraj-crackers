import { at, defineMigration, setIfMissing } from 'sanity/migrate'

type LegacyProduct = {
  listPricePaise?: number
  pricePaise?: number
}

export default defineMigration({
  title: 'Store product prices as rupees',
  documentTypes: ['product'],
  filter: 'defined(listPricePaise) && defined(pricePaise)',
  migrate: {
    document(product) {
      const legacyProduct = product as LegacyProduct

      return [
        at('listPriceRupees', setIfMissing((legacyProduct.listPricePaise ?? 0) / 100)),
        at('priceRupees', setIfMissing((legacyProduct.pricePaise ?? 0) / 100)),
      ]
    },
  },
})
