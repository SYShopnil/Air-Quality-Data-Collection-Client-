import React from 'react'
import manualDataStyleSheet from "./ManualDataDisplay.module.css"

const ManualDataDisplay = ({
  finalDataList,
  deleteHandler ,
  saveHandler
}) => {
  // console.log(finalDataList)
  return (
    <div>
       {
        !!finalDataList.length
        ?
        <div className = {`row`}>
          <div className = {`col-1`}></div>
          {
            finalDataList.map ((item, ind) => {
              return (
                <div className = {`col-12 p-5`}>
                  <div className ={`${manualDataStyleSheet.listText}`}>
                    <p className = {`${manualDataStyleSheet.listParagraph}`}>{++ind}</p>
                  </div>
                  {/* list wrapper */}
                  <div className = {`row`}>
                    <ul className="list-group col-10">
                      <li class="list-group-item">
                        {
                          item.map (items => {
                            return (
                              <p>
                                  <span className = {`fw-bold`}>
                                    {items.labelName}:   
                                  </span> 
                                  <span>
                                    {items.field ?  ` ${items.field}` : " Not Available"}
                                  </span> 
                                </p> 
                            )
                          })
                        }
                      </li>
                    </ul>
                     <a className = {`col-2 d-inline-block`}
                     onClick = {(e) => {deleteHandler (e, --ind)}}
                     >
                      <i className= {`fa-solid fa-minus ${manualDataStyleSheet.deleteButton} `}></i>
                     </a>
                  </div>
                </div>
              )
            })
          }
          <div className = {`col-1`}></div>
          <div className = {`col-3`}></div>
          <div className = {`col-8`}>
            <button 
            className = {`btn btn-dark`}
            onClick = {(e) => saveHandler (e)}>Save Data</button>
          </div>
        </div>
        :
        <div className ={`${manualDataStyleSheet.noDataFoundWrapper}`} >
          <div className ={`${manualDataStyleSheet.noDataFoundParagraphWrapper}`} >
            <p className ={`${manualDataStyleSheet.noDataFoundParagraph}`} >No Air Data in the list.....</p>
          </div>
        </div>
       }
    </div>
  )
}

export default ManualDataDisplay
