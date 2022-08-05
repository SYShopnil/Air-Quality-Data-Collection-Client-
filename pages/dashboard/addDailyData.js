import React from 'react'
import PrivateRouteAuth from '../../src/component/common/PrivateRoute/PrivateRouteAuth'
import DashboardLayout from '../../src/layout/DashboardLayout'

const addDailyData = () => {
  return (
    <PrivateRouteAuth>
      <DashboardLayout>
        <div>
          <h1>Hello I am from Add Daily Air Data</h1>
        </div>
      </DashboardLayout> 
    </PrivateRouteAuth>
  )
}

export default addDailyData