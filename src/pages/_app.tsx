import { AppPropsWithLayout } from "../types"
import { Hydrate, QueryClientProvider } from "@tanstack/react-query"
import { useEffect } from "react"
import { RootLayout } from "src/layouts"
import { queryClient } from "src/libs/react-query"
import posthog from "posthog-js"
import Head from "next/head"

function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout || ((page) => page)
  useEffect(() => {
    posthog.init("phc_aL8z05HOnmltUt4XYkMsByrYa9WavQqAvsLVq9DGPHs", {
      api_host: "https://us.posthog.com",
    })
    posthog.capture("my event", { property: "value" })
  })
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <RootLayout>{getLayout(<Component {...pageProps} />)}</RootLayout>
        </Hydrate>
      </QueryClientProvider>
    </>
  )
}

export default App
