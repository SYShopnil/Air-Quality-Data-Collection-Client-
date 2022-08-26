import React from 'react'
import PrivateRouteAuth from '../../src/component/common/PrivateRoute/PrivateRouteAuth'
import DashboardLayout from '../../src/layout/DashboardLayout'
import AddAirData from '../../src/view/Dashboard/AddAirData'

const addAirData = () => {
  return (
    <PrivateRouteAuth>
      <DashboardLayout active = {`Add Air Data`}>
        <AddAirData/>
    </DashboardLayout>
    </PrivateRouteAuth> 
  )
}

export default addAirData
