import Head from 'next/head'
import { useRouter } from 'next/router'
import { Layout } from '../components/layout'
import { Container } from '../components/container'
import { NutritionTable } from '../components/nutrition-table'
import { AdditionalTable } from '../components/additional-table'
import { Barcode } from '../components/barcode'
import { Header } from '../components/header'
import { Paragraph } from '../components/paragraph'

export async function getServerSideProps({ query }) {
  const response = await fetch(`${process.env.BASE_URL}/api/${query.sku}`)
  if (response.status === 404) {
    return {
      notFound: true,
    }
  }
  const data = await response.json()
  return { props: { data } }
}

function Sku({ data: { barcode, description, product } }) {
  const router = useRouter()
  const { sku, type } = router.query
  const importantDesc = description && description.find(d => d.descriptionType.description === 'Важлива інформація')
  const uaDesc = description && description.find(d => d.descriptionType.description === 'Опис українською')

  if (type === '1') {
    return (
      <main className="bg-yellow-300 min-h-screen">
        <Head>
          <title>{product.name}</title>
        </Head>
        <Layout>
          <Container>
            <Header name={product.name} />
            <section className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-16 lg:gap-32 mb-16">
              <Paragraph keys={'Арт.'} value={sku} />
              {barcode ? <Barcode value={barcode.barcode}/> : null}
            </section>
            {!!importantDesc
              ? (<section className="w-100 pb-8">
                <b><p className="text-xl">{importantDesc.desription}</p></b>
              </section>)
              : null
            }
            {!!uaDesc
              ? (<section className="w-100 pb-8">
                <b><p className="text-xl">{uaDesc.desription}</p></b>
              </section>)
              : null
            }
            <section className="w-100 pb-8">
              {product.st_composition ? <Paragraph keys={'Склад продукту:'} value={product.st_composition} /> : null}
            </section>
            <section className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-16 lg:gap-32 mb-16">
              {product.calories || product.carb || product.fat || product.protein ? <NutritionTable sticker={product} /> : null}
              {product.st_description || product.st_cooking || product.st_storage_condition ? <AdditionalTable sticker={product} /> : null}
            </section>
            <section className="w-100 pb-16">
              {product.fea_producer ? <Paragraph keys={'Виробник: '} value={product.fea_producer.name} /> : null}
              {product.fea_productionaddress ? <Paragraph keys={'Адреса виробництва: '} value={product.fea_productionaddress} /> : null}
            </section>
          </Container>
        </Layout>
      </main>
    )
  }

  if (type === '3') {
    return (
      <main className="min-h-screen" style={{backgroundColor: "rgb(0, 255, 154)"}}>
        <Head>
          <title>{product.name}</title>
        </Head>
        <Layout>
          <Container>
            <Header name={product.name} />
            <section className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-16 lg:gap-32 mb-16">
              <Paragraph keys={'Арт.'} value={sku} />
              {barcode ? <Barcode value={barcode.barcode}/> : null}
            </section>
            {!!importantDesc
              ? (<section className="w-100 pb-8">
                <b><p className="text-xl">{importantDesc.desription}</p></b>
              </section>)
              : null
            }
            {!!uaDesc
              ? (<section className="w-100 pb-8">
                <b><p className="text-xl">{uaDesc.desription}</p></b>
              </section>)
              : null
            }
            <section className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-16 lg:gap-32 mb-16">
              {product.calories || product.carb || product.fat || product.protein ? <NutritionTable sticker={product} /> : null}
              {product.st_description || product.st_cooking || product.st_storage_condition ? <AdditionalTable sticker={product} type={type} /> : null}
            </section>
            <section className="w-100 pb-16">
              {product.fea_producer ? <Paragraph keys={'Виробник: '} value={product.fea_producer.name} /> : null}
              {product.fea_productionaddress ? <Paragraph keys={'Адреса виробництва: '} value={product.fea_productionaddress} /> : null}
              <br/>
            </section>
          </Container>
        </Layout>
      </main>
    )
  }

  return (
    <main>
      <Head>
        <title>{product.name}</title>
      </Head>
      <Layout>
        <Container>
          <Header name={product.name} />
          <section className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-16 lg:gap-32 mb-16">
            <Paragraph keys={'Арт.'} value={sku} />
            {barcode ? <Barcode value={barcode.barcode}/> : null}
          </section>
          <section className="w-100 pb-8">
            {product.st_composition ? <Paragraph keys={'Склад продукту:'} value={product.st_composition} /> : null}
          </section>
          <section className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-16 lg:gap-32 mb-16">
            {product.calories || product.carb || product.fat || product.protein ? <NutritionTable sticker={product} /> : null}
            {product.st_description || product.st_cooking || product.st_storage_condition ? <AdditionalTable sticker={product} /> : null}
          </section>
          <section className="w-100 pb-16">
            {product.fea_producer ? <Paragraph keys={'Виробник: '} value={product.fea_producer.name} /> : null}
            {product.fea_productionaddress ? <Paragraph keys={'Адреса виробництва: '} value={product.fea_productionaddress} /> : null}
          </section>
        </Container>
      </Layout>

    </main>
  )
}

export default Sku
