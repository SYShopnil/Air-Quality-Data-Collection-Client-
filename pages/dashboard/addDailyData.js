import React from 'react'
import PrivateRouteAuth from '../../src/component/common/PrivateRoute/PrivateRouteAuth'
import DashboardLayout from '../../src/layout/DashboardLayout'
import AddDataLayout from "../../src/layout/AddDataLayout"
import AddDailyAirData from '../../src/view/Dashboard/AddDailyAirData'

const addDailyData = () => {
  return (
    <PrivateRouteAuth>
      <DashboardLayout>
              <AddDailyAirData/>
      </DashboardLayout> 
    </PrivateRouteAuth>
  )
}

export default addDailyData