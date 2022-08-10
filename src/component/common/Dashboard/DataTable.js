import React, {
    useState
} from 'react'
import DataNotfFound from './DataNotfFound'

const DataTable = (
    {
        showHeaderField,
        fetchData,
        pageNeed,
        selectedPage,
        setSelectPage
    }
) => {
    const [selectButtonType, setSelectButtonType] = useState ("")
    const [defaultSelection, setDefaultSelection] = useState (1)
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
  return (
    <div>
        <table className="table mt-3">
            <thead>
                <tr className="table-active">
                        {
                            showHeaderField.map (head => {
                                return (
                                    <th>{head}</th>
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
                                return (
                                    <tr key = {ind}>
                                        {
                                            (showHeaderField.map (head => {
                                                let publishedData = data[head]
                                                if (head == "publishedDate") {
                                                    publishedData = new Date (data[head]).toLocaleDateString()
                                                }
                                                return  <td>{publishedData}</td>
                                            }))
                                        }
                                        <td>
                                                <button className = {`btn btn-primary`}>Update</button>
                                            </td>
                                            <td>
                                                <button className = {`btn btn-danger`}>Delete</button>
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
                            <li  className= {`page-item ${selectButtonType == "prev" &&  "active"}`}>
                                <a 
                                className="page-link" 
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
                                <li className= {`page-item ${selectedPage == d && selectButtonType == "normal" &&  "active"} ${defaultSelection == 1 && d == 1 && "active"}`}>
                                    <a className="page-link"
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
                                className="page-link"
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
  )
}

export default DataTable