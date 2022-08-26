import React from 'react'
import Plot from "react-plotly.js"
import LoadingPage from '../Loader/LoadingPage'

const PlotStructure = ({
    isLoading,
    airData,
    layout
}) => {
  return (
    <div>
         {
          isLoading
          ?
          <LoadingPage/>
          :
          <>
            <Plot
              data={airData}
              layout = {layout}
            />
          </>
         }
    </div>
  )
}

export default PlotStructure