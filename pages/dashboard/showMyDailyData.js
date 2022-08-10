import React from 'react'
import PrivateRouteAuth from '../../src/component/common/PrivateRoute/PrivateRouteAuth'
import DashboardLayout from '../../src/layout/DashboardLayout'
import ShowMyDailyAirData from '../../src/view/Dashboard/ShowMyDailyAirData'

const showMyDailyData = () => {
  return (
    <PrivateRouteAuth>
      <DashboardLayout>
        <ShowMyDailyAirData/>
      </DashboardLayout>
    </PrivateRouteAuth> 
  )
}

export default showMyDailyData