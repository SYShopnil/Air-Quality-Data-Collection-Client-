import React from 'react'
import SectionOne from './Section/SectionOne'
import SectionTwoA from './Section/SectionTwoA'
import SectionTwoB from './Section/SectionTwoB'
import SectionThree from './Section/SectionThree'
import SectionFour from './Section/SectionFour'
import SectionFive from './Section/SectionFive'
import SectionSixA from './Section/SectionSixA'
import SectionSixB from './Section/SectionSixB'
import SectionSeven from './Section/SectionSeven'
import SectionEight from './Section/SectionEight'


const HomePage = () => {
  return (
    <div className = {` container`}>
       <div className = {`d-flex justify-content-center align-items-center`}>
            <div>
              <SectionOne/>
              <SectionTwoA/>
              <SectionTwoB/>
              <SectionThree/>
              <SectionFour/>
              <SectionFive/>
              <SectionSixA/>
              <SectionSixB/>
              <SectionSeven/>
              <SectionEight/>
            </div>
       </div>
    </div>
  )
}

export default HomePage
