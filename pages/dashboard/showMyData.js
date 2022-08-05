import React from 'react'
import PrivateRouteAuth from '../../src/component/common/PrivateRoute/PrivateRouteAuth'
import DashboardLayout from '../../src/layout/DashboardLayout'

const showMyData = () => {
  return (
    <PrivateRouteAuth>
      <DashboardLayout>
        <div>
          <h1>Hello I am from Show My Data</h1>
        </div>
      </DashboardLayout> 
    </PrivateRouteAuth>
  )
}

export default showMyData