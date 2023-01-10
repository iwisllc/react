import { getProductByItemnumber, getProductDescription, getBarcodeByProduct } from '../../lib/api'

export default async function skuAPI(req, res) {
  try {
    const product = await getProductByItemnumber(req.query.sku)

    if (!product) {
      return res.status(404).json({ message: 'This SKU not found' })
    }

    const { code } = product

    const barcode = await getBarcodeByProduct(code)
    const description = await getProductDescription(code)

    res.status(200).json({ product, barcode, description })
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
}
