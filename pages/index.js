import Head from 'next/head'

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Head>
        <title>App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col items-center justify-center flex-1 px-20 text-center">
        <h1 className="text-6xl font-bold">
           App
        </h1>
        <p className="mt-3 text-2xl">
          Get started by typing SKU after{' '}
          <code className="p-3 font-mono text-lg bg-gray-100 rounded-md">
            /
          </code>
          {' '}and press{' '}
          <code className="p-3 font-mono text-lg bg-gray-100 rounded-md">
            return
          </code>.
        </p>
      </main>
    </div>
  )
}
