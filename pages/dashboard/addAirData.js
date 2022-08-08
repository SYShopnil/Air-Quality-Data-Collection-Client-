import React from 'react'
import PrivateRouteAuth from '../../src/component/common/PrivateRoute/PrivateRouteAuth'
import DashboardLayout from '../../src/layout/DashboardLayout'
import AddAirData from '../../src/view/Dashboard/AddAirData'

const addAirData = () => {
  return (
    <PrivateRouteAuth>
      <DashboardLayout>
        <AddAirData/>
    </DashboardLayout>
    </PrivateRouteAuth> 
  )
}

export default addAirData
