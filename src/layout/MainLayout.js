import React from 'react'
import Link from "next/link"

const MainLayout = ({children}) => {
  return (
    <>
      {/* header part */}
      <header>
          {/* navigation bar */}
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container">
              <Link href="/">
                <a className="navbar-brand" href="#">Air Quality App</a>
              </Link>
              <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarSupportedContent">
                {/* fake one */}
                <form className="d-flex" style = {{visibility: "hidden", width: "45%"}}>
                  <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
                  <button className="btn btn-outline-success" type="submit">Search</button>
                </form>
                
                {/* navbar content part */}
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                  {/* profile button */}
                  <li className="nav-item">
                    <Link href="/dashboard/profile">
                      <a className="nav-link active" aria-current="page" href="#">Profile</a>
                    </Link>
                  </li>
                  {/* Logout */}
                  <li className="nav-item">
                    <Link href="/">
                        <a className="nav-link" href="#">Logout</a>
                    </Link>
                  </li>
                  {/* Sign up */}
                  <li className="nav-item">
                    <Link href="/signUp">
                        <a className="nav-link" href="#">Sign Up</a>
                    </Link>
                  </li>
                  {/* Sign In */}
                  <li className="nav-item">
                    <Link href="/signIn">
                        <a className="nav-link" href="#">Sign In</a>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
      </header>

      <main>
        <section>{children}</section>
      </main>

      {/* footer part */}
      <footer>
        <h4>@2022.All Rights Reserved</h4>
      </footer>
    </>
  )
}

export default MainLayout