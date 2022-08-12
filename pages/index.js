import Head from 'next/head'
import Image from 'next/image'
import LoadingPage from '../src/component/common/Loader/LoadingPage'
import MainLayout from '../src/layout/MainLayout'


export default function Home() {
  return (
    <div>
        <h1>Hello I am from homepage</h1>
        {/* <LoadingPage/> */}
    </div>
  )
}
