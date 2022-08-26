import React, {
    useEffect,
    useState
} from 'react'
import Link from "next/link"
import dashboardStyle from "./DashboardLayout.module.css"

const DashboardLayout = ({children, active}) => {
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
    <div className = {`container pb-5`} >
        <div className = {`row`}>
            {/* right navbar part */}
            <section className = {`col-12 col-md-2`} style = {{paddingTop: "4%",
    borderRight:"2px solid #C4C6C9"}}>
                <ul class="nav flex-column">
                    {
                        lists.map ((list, ind) => {
                            return (
                                 <li className= {`nav-item`} key = {list.id}>
                                        <Link href= {list.link}>
                                            <a className= {`nav-link ${list.name == active ? dashboardStyle.textWrapActive : dashboardStyle.textWrapWithOutActive  } `} aria-current="page">{list.name}</a>
                                        </Link>
                                    </li>
                            )
                        })
                    }
                   
                </ul>
            </section>
            
            {/* left content part */}
            <section className = {`col-12 col-md-10 px-3`}>
                <div>{children}</div>
            </section>
        </div>
    </div>
  )
}

export default DashboardLayout