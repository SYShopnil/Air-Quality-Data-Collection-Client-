import React, {
    useState
} from 'react'
import DataTable from './DataTable'

const ShowAIrDataTable = ({
    fetchData,
    pageNeed,
    selectedPage,
    setSelectPage,
    showHeaderField,
    sortBy,
    searchBy,
    pageNo,
    dataLimit,
    updateType
}) => {
    const [showAllHeaderField, setShowAllHeaderField] = useState(
        [
            "dataId", 
            "publishedDate", 
            "valueOfPM",
            "avgTemp",
            "rainPrecipitation",
            "windSpeed",
            "visibility",
            "cloudCover",
            "relHumidity",
            "stationNo",
            "division",
            "season"
        ]
    )
    // console.log(fetchData)
    return (
    //table part  sub wrapper 
    <div >
        <DataTable
            fetchData = {fetchData}
            showHeaderField = {showHeaderField}
            pageNeed = {pageNeed}
            selectedPage = {selectedPage}
            setSelectPage = {setSelectPage}

            sortBy = {sortBy}
            searchBy = {searchBy}
            pageNo = {pageNo}
            dataLimit = {dataLimit}
            updateType ={updateType}
        />
    </div>
  )
}

export default ShowAIrDataTable