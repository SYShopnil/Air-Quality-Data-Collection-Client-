import dynamic from 'next/dynamic'
import Head from 'next/head'
import Image from 'next/image'
import LoadingPage from '../src/component/common/Loader/LoadingPage'
// import HomePage from '../src/component/other/HomePage/HomePage'
import MainLayout from '../src/layout/MainLayout'
const HomePage = dynamic(() => import('../src/component/other/HomePage/HomePage'), {
  ssr: false,
})

export default function Home() {
  return (
    <div>
      <HomePage/>
        {/* <LoadingPage/> */}
    </div>
  )
}
