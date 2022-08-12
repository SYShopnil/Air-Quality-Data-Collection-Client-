import React , {
    useState,
    useEffect
} from 'react'
import SingleFileUploader from '../../../../utils/SingleFileUploader/SingleFileUploader'
import csvFileSelectorStylesheet from "./CsvFileSelector.module.css"

const CsvFileSelector = ({
    isLoading,
    setIsLoading,
    uploadHandler,
    buttonName,
    csvBase64,
    setCsvBase64
}) => {
    // const [csvBase64, setCsvBase64] = useState ("")

    const filePassHandler = (data) => {
        setCsvBase64 (data.base64)
    }
  return (
    <div>
         <div className = {`row container`}>
            <div className = {`col-12`}>
                <div className = {`${csvBase64 && csvFileSelectorStylesheet.textHeading}`}>
                    <p>Please chose any CSV file from local storage <span className = {`text-danger`}>**</span> </p>
                </div>

                {/* upload component */}
                <div className = {`mb-2`}>
                    <SingleFileUploader
                        filePassHandler = {filePassHandler}
                        accepted = {`.csv`}
                    />
                </div>

                <div>

                    {/* upload button */}
                    <button 
                    className = {`btn btn-dark me-2 `}
                    style = {{height: "15%", width: "auto"}}
                    onClick = {(e) => uploadHandler (e, csvBase64)} //handler for upload a new csv file
                    >
                        {
                            //handler the update button loading phase 
                            isLoading
                            ?
                            // spinner
                            <div 
                            className="spinner-border text-primary"
                            role="status"
                            style = {{height: "15px", width: "15px"}}
                            >
                                <span className="visually-hidden">Loading...</span>
                            </div>
                            :
                            <>
                                {buttonName || "Upload"}
                            </>
                        }
                    </button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default CsvFileSelector