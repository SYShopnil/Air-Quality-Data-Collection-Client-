import React, {
    useState
} from 'react'
import DataNotfFound from './DataNotfFound'
import tableHeaderStyle from "./DataTable.module.css"
import UpdateData from './UpdateData'
import {connect} from "react-redux"
import { updateAirData } from '../../../store/readAirData/action'
import { updateDailyAirData } from '../../../store/readDailyAirData/action'

const DataTable = (
    {
        showHeaderField,
        fetchData,
        pageNeed,
        selectedPage,
        setSelectPage,

        sortBy,
        searchBy,
        pageNo,
        dataLimit,
        isLoadingForUpdate,
        updateAirData,
        updateType,
        updateDailyAirDataHandler
    }
) => {
    const [selectButtonType, setSelectButtonType] = useState ("")
    const [defaultSelection, setDefaultSelection] = useState (0)
    const [isUpdateShow, setIsUpdateShow] = useState (0)
    const [updateQueData, setUpdateQueData] = useState ({})
    const [selectDataIdForUpdate, setSelectDataIdForUpdate] = useState (null)
    const data = [];
    for (let i = 1 ; i <=pageNeed ; i++ ) {
        if (i <= 3) data.push(i) 
    }
    // console.log({selectedPage})
    const paginationController = (e, type, pageNo) => {
        // console.log(type)
        e.preventDefault();
        if (type == "normal") {
            setSelectButtonType (type)
            setSelectPage (pageNo)
            setDefaultSelection (null)
        }else if (type == "prev") {
            // console.log({type})
            setSelectButtonType (type) 
            setSelectPage (--selectedPage)
            setDefaultSelection (null)
        }else if (type == "next") {
            setSelectButtonType (type) 
            setSelectPage (++selectedPage)
            setDefaultSelection (null)
        }
        // if (selectedPage < 2) {
        //     setDefaultSelection (1)
        // }
    }
    // console.log(updateQueData)
    const updateDataHandler = (e, airData) => {
        e.preventDefault();
        // console.log(airData)
        setSelectDataIdForUpdate (airData.dataId)
        const format = updateType == "airData" ?{
            valueOfPM: airData.valueOfPM,
            stationNo: airData.stationNo,
            division: airData.division,
            season: airData.season
        } : {
            area: airData.area,
            mean: airData.mean,
            max: airData.max,
            count: airData.count
        }
        setUpdateQueData (format)
        setIsUpdateShow (true)
    }

    const updateHandler = async (e) => {
        try {
            e.preventDefault()
            updateType == "airData" 
            &&
            await updateAirData (
                updateQueData,
                selectDataIdForUpdate,
                searchBy,
                sortBy,
                pageNo,
                dataLimit
            )
            console.log(updateQueData)
            updateType == "dailyAirData"
            &&
            await updateDailyAirDataHandler (
                updateQueData,
                selectDataIdForUpdate,
                searchBy,
                sortBy,
                pageNo,
                dataLimit
            )

            !isLoadingForUpdate && setIsUpdateShow (false) 
        }catch (err) {
            console.log(err)
        }
    }
  return (
    <div className = {``}>
        <div>
            <table className="table mt-3">
                <thead className ={``}>
                    <tr className= {`table-active  ${tableHeaderStyle.tableHeader}`}>
                            {
                                showHeaderField.map (head => {
                                    return (
                                        <th className = {`text-capitalize`}>{head}</th>
                                    )
                                })
                            }
                            <th>Update</th>
                            <th>Delete</th>
                            
                        </tr>
                </thead>
                {
                    !!fetchData.length
                    ?
                    <tbody>
                            {
                                fetchData.map ((data, ind) => {
                                    // console.log(Object.keys (data))
                                    return (
                                        <tr key = {ind}>
                                            {
                                                (showHeaderField.map (head => {
                                                    let publishedData = data[head]
                                                    if (head == "publishedDate") {
                                                        publishedData = new Date (data[head]).toLocaleDateString()
                                                    }
                                                    return  <td >{publishedData}</td>
                                                }))
                                            }
                                            <td>
                                                    <button 
                                                    className = {`btn btn-dark`}
                                                    onClick = {(e) => updateDataHandler (e, data)}>Update</button>
                                                </td>
                                                <td>
                                                    <button className = {`btn btn-light`}>Delete</button>
                                                </td>
                                        </tr>
                                    )
                                    // console.log(data)
                                })
                            }
                    </tbody>
                    :
                    <DataNotfFound/>
                }
            
            </table>
            {/* pagination part */}
            {
                !!fetchData.length
                &&
                <div className = {`d-flex justify-content-end`}>
                    <nav aria-label="Page navigation example">
                        <ul className="pagination">
                            {/* pagination left arrow  */}
                            {
                                selectedPage > 1 
                                &&
                                pageNeed > 1 
                                &&
                                <li  className= {`page-item ${selectButtonType == "prev" && "active"  }`}>
                                    <a 
                                    className= {`page-link ${tableHeaderStyle.paginationButton}`}
                                    onClick = {(e) => paginationController(e, "prev")}
                                    style = {{cursor: "pointer"}}
                                    >
                                        <span
                                        >&laquo;</span>
                                    </a>
                                </li>
                            }
                            
                            {/* pagination middle data  */}
                            {data.map (d => {
                                return (
                                    <li className= {`page-item ${selectedPage == d && selectButtonType == "normal" && "active"} ${defaultSelection == 1 && d == 1 && "active"} `}>
                                        <a className= {`page-link ${tableHeaderStyle.paginationButton}`}
                                        style = {{cursor: "pointer"}}
                                        onClick = {(e) => paginationController (e, "normal", d)  }>{d}</a>
                                    </li>
                                )
                            })}

                            
                            {/* pagination right arrow  */}
                            {
                                pageNeed > 3
                                &&
                                pageNeed <= selectedPage
                                &&
                                <li className= {`page-item ${selectButtonType == "prev" &&  "active"}`}>
                                    <a 
                                    className= {`page-link ${tableHeaderStyle.paginationButton}`}
                                    href="#" 
                                    aria-label="Next"
                                    onClick = {(e) => paginationController(e, "next")}
                                    style = {{cursor: "pointer"}}
                                    >
                                        <span aria-hidden="true">&raquo;</span>
                                    </a>
                                </li>
                            }
                        
                        </ul>
                    </nav>
                </div>
            }
        </div>
        
        {/* delete part */}
        {
            !!isUpdateShow
            &&
              <div>
                <UpdateData
                    updateQueData = {updateQueData}
                    setIsUpdateShow = {setIsUpdateShow}
                    setUpdateQueData = {setUpdateQueData}
                    updateHandler = {updateHandler}
                    isLoading = {isLoadingForUpdate}
                />
            </div>
        }
    </div>
  )
}

//get global state 
const mapStateToProps = (state) => {
    const {
        airData: {
            isLoadingForUpdate
        }
    } = state
    return {
        
    }
}

//get global dispatch 
const mapDispatchToProps = (dispatch) => {
    return {
        updateAirData : (airData, dataId, searchBy, sortBy, pageNo, dataLimit) => dispatch (updateAirData(airData, dataId, searchBy, sortBy, pageNo, dataLimit)),
        updateDailyAirDataHandler  : (airData, dataId, searchBy, sortBy, pageNo, dataLimit) => dispatch (updateDailyAirData(airData, dataId, searchBy, sortBy, pageNo, dataLimit))
    }
}

export default connect (mapStateToProps, mapDispatchToProps)(DataTable)
