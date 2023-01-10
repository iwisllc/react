import { useBarcode } from 'react-barcodes'

export const Barcode = ({ value }) => {
  const { inputRef } = useBarcode({ value, options: { background: 'transparent' } })
  return <svg ref={inputRef} />
}
