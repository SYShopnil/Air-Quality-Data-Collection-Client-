import React from 'react'
import Link from "next/link"
const DashboardLayout = ({children}) => {
  return (
    <div className = {`row`}>
        {/* right navbar part */}
        <section className = {`col-12 col-md-4`}>
            <ul class="nav flex-column">
                <li class="nav-item">
                    <Link href="/dashboard/profile">
                        <a class="nav-link active" aria-current="page">My Profile</a>
                    </Link>
                </li>
                <li class="nav-item">
                    <Link href="/dashboard/addAirData">
                         <a class="nav-link" href="#">Add Air Data</a>
                    </Link>
                </li>
                <li class="nav-item">
                    <Link href="/dashboard/showMyData">
                        <a class="nav-link" href="#">Show My Data</a>
                    </Link>
                </li>
                <li class="nav-item">
                    <Link href="/dashboard/addDailyData">
                        <a class="nav-link" href="#">Add Daily Data</a>
                    </Link>
                </li>
                <li class="nav-item">
                    <Link href="/dashboard/showMyDailyData">
                        <a class="nav-link" href="#">Show My Daily Data</a>
                    </Link>
                </li>
            </ul>
        </section>
        
        {/* left content part */}
        <section className = {`col-12 col-md-8`}>
            <div>{children}</div>
        </section>
    </div>
  )
}

export default DashboardLayout