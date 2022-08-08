import React from 'react'
import PrivateRouteAuth from '../../src/component/common/PrivateRoute/PrivateRouteAuth'
import DashboardLayout from '../../src/layout/DashboardLayout'
import MainLayout from '../../src/layout/MainLayout'
import Profile from '../../src/view/Dashboard/Profile'

const profile = () => {
  return (
    <PrivateRouteAuth>
      <DashboardLayout>
        <div>
          <Profile/>
        </div>
      </DashboardLayout>
    </PrivateRouteAuth>
  )
}

export default profile