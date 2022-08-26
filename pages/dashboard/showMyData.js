import React from 'react'
import PrivateRouteAuth from '../../src/component/common/PrivateRoute/PrivateRouteAuth'
import DashboardLayout from '../../src/layout/DashboardLayout'
import ShowMyData from '../../src/view/Dashboard/ShowMyData'

const showMyData = () => {
  return (
    <PrivateRouteAuth>
      <DashboardLayout active = {`Show My Data`}>
        <ShowMyData/>
      </DashboardLayout> 
    </PrivateRouteAuth>
  )
}

export default showMyData