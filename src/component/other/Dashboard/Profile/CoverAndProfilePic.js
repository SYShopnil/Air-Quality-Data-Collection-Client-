import React from 'react'
import ownStyle from "./CoverAndProfilePic.module.css"

const CoverAndProfilePic = (
    {
        coverPic,
        titlePic,
        isUpdateComponentVisible,
        setUpdateComponentVisible,
        setUpdatePictureType
    }
) => {
    //all handler 
    const editTitlePictureHandler = (e) => {
        e.preventDefault();
        setUpdateComponentVisible(!isUpdateComponentVisible)
        setUpdatePictureType ("title") //set the picture upload type
    }

    const editCoverPictureHandler = (e) => {
        e.preventDefault();
        setUpdateComponentVisible(!isUpdateComponentVisible)
        setUpdatePictureType ("cover") //set the picture upload type
    }
  return (
    <section className = {`${ownStyle.ImageWrapper}`}>
        {/* cover pic */}
        <div>
            <img className = {`h-50 w-100 `} src= {coverPic} alt= {`${name}'s cover picture`} />
            <a onClick = {(e) => editCoverPictureHandler(e)}>
                <i className={`fas fa-edit ${ownStyle.editButtonCover}`}></i>
            </a>
        </div>

        {/* title or profile pic */}
        <div className = {`${ownStyle.Image}`}>
            <img className = {`h-25 w-25 ${ownStyle.content}`} src= {titlePic} alt= {`${name}'s title picture`} />
            <a onClick = {(e) => editTitlePictureHandler (e)}>
                <i className= {`fas fa-edit ${ownStyle.editButtonTitle}`}></i>
            </a>
        </div>
    </section>
  )
}

export default CoverAndProfilePic