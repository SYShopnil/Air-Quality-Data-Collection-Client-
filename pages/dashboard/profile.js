import React from 'react'
import PrivateRouteAuth from '../../src/component/common/PrivateRoute/PrivateRouteAuth'
import DashboardLayout from '../../src/layout/DashboardLayout'
import MainLayout from '../../src/layout/MainLayout'

const profile = () => {
  return (
    <PrivateRouteAuth>
      <DashboardLayout>
        <div>
          <h1>Hello I am from profile</h1>
        </div>
      </DashboardLayout>
    </PrivateRouteAuth>
  )
}

export default profile