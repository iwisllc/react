async function fetchAPI(query, { variables } = {}) {
  const res = await fetch(
    `${process.env.APP_API_DOMEN}${process.env.APP_API_URL}?apikey=${process.env.APP_API_KEY}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query, variables }),
    }
  )
  const json = await res.json()

  if (json.errors) {
    console.error(json.errors)
    throw new Error('Failed to fetch API')
  }
  return json.data
}

export async function getProductByItemnumber(itemnumber) {
  const data = await fetchAPI(
    `
  query ProductByItemnumber($defaultLanguage: String, $filter: String) {
    getProductListing(defaultLanguage: $defaultLanguage, filter: $filter) {
      edges {
        node {
          id
          code
          itemnumber
          name
          st_composition
          st_description
          st_cooking
          st_storage_condition
          calories
          protein
          fat
          carb
          fea_producer {
            ... on object_productManufacturer {
              id
              code
              name
              country
            }
          }
          fea_productionaddress
        }
      }
    }
  }
  `,
    { variables: { defaultLanguage: "uk", filter: `{"itemnumber":"${itemnumber}"}` } }
  )
  return data.getProductListing.edges.length && data.getProductListing.edges[0].node
}

export async function getBarcodeByProduct(code) {
  const data = await fetchAPI(
    `query BarcodeByProduct($defaultLanguage: String, $filter: String) {
      getProductBarcodeListing(defaultLanguage: $defaultLanguage, filter: $filter) {
        edges {
          node {
            id
            barcode
            product
            barcode_type
            measure_unit
            barcode_main
          }
        }
      }
    }`,
    { variables: { defaultLanguage: "uk", filter: `{"product":"${code}"}` } }
  )
  const main = data.getProductBarcodeListing.edges.find(edge => edge.node.barcode_main)
  if (main) return main.node
}

export async function getProductDescription(code) {
  const data = await fetchAPI(
    `query ProductDescription($defaultLanguage: String, $filter: String) {
      getProductDescriptionListing(defaultLanguage: $defaultLanguage, filter: $filter) {
        edges {
          node {
            id
            product
            desription
            descriptionType {
              ... on object_ProductDescriptionType {
                id
                code
                del_mark
                description
                lang
              }
            }
          }
        }
      }
    }`,
    { variables: { defaultLanguage: "uk", filter: `{"product":"${code}"}` } }
  )
  return data.getProductDescriptionListing.edges.length && data.getProductDescriptionListing.edges.map((e) => e.node)
}
