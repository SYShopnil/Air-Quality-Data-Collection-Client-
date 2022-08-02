import Head from 'next/head'
import AppWrapper from '../src/layout/AppWrapper'
import MainLayout from '../src/layout/MainLayout'
import StoreWrapper from '../src/layout/StoreWrapper'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return <>
    <Head>
      <title>Air Quality App</title>
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous"/>
      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>
    </Head>
    <StoreWrapper>
        <AppWrapper>
            <MainLayout>
                <Component {...pageProps} />
            </MainLayout>
        </AppWrapper>
    </StoreWrapper>
  </>
}

export default MyApp
