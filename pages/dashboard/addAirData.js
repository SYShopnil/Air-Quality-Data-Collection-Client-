import React from 'react'
import PrivateRouteAuth from '../../src/component/common/PrivateRoute/PrivateRouteAuth'
import DashboardLayout from '../../src/layout/DashboardLayout'

const addAirData = () => {
  return (
    <PrivateRouteAuth>
      <DashboardLayout>
        <div>
          <h1>Hello I am from Add Air Data</h1>
        </div>
    </DashboardLayout>
    </PrivateRouteAuth> 
  )
}

export default addAirData