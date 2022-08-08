import React, {
    useEffect,
    useState
} from 'react'
import Link from "next/link"
const DashboardLayout = ({children}) => {
    const [lists, setList] = useState ([
        {
            name: "My Profile",
            id: 1,
            link: "/dashboard/profile"
        },
        {
            name: "Add Air Data",
            id: 2,
            link: "/dashboard/addAirData"
        },
        {
            name: "Show My Data",
            id: 3,
            link: "/dashboard/showMyData"
        },
        {
            name: "Add Daily Data",
            id: 4,
            link: "/dashboard/addDailyData"
        },
        {
            name: "Show My Daily Data",
            id: 5,
            link: "/dashboard/showMyDailyData"
        },
    ])
  return (
    <div className = {`container`}>
        <div className = {`row`}>
            {/* right navbar part */}
            <section className = {`col-12 col-md-2`}>
                <ul class="nav flex-column">
                    {
                        lists.map ((list, ind) => {
                            return (
                                 <li className= {`nav-item`} key = {list.id}>
                                        <Link href= {list.link}>
                                            <a className= {`nav-link `} aria-current="page">{list.name}</a>
                                        </Link>
                                    </li>
                            )
                        })
                    }
                   
                    {/* <li class="nav-item">
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
                    </li> */}
                </ul>
            </section>
            
            {/* left content part */}
            <section className = {`col-12 col-md-10`}>
                <div>{children}</div>
            </section>
        </div>
    </div>
  )
}

export default DashboardLayout