import React, {useState} from 'react'
import singleFileUploaderStyle from  "./SingleFileUploader.module.css"

const SingleFileUploader = ({filePassHandler, fileType, uploadFor, accepted}) => {
    const [fileBase64, setFileBase64] = useState ("")
  const handleChange = (e) => {
    e.preventDefault();
    // console.log("changed");
    const file = e.target.files[0];

    // console.log(file);
    if (file.name) {
      const { size } = file;
      const reader = new FileReader();
      reader.onloadend = () => {
        // console.log(reader.result);
        filePassHandler({
          base64: reader.result,
          size,
        },uploadFor );
        if (fileType == "img") {
            setFileBase64 (reader.result)
        } 
      };
      reader.readAsDataURL(file);    
      // console.log(size)
    }
  };

  return (
    <div>
      <div className="mb-3">
        <input
          onChange={handleChange}
          placeholder=""
          type="file"
          className="form-control"
          accept= {accepted ? accepted : [".png", ".jpg", ".jpeg"]}
          required
        ></input>
      </div>
      {
        fileBase64 
        &&
        <img 
        src= {fileBase64} 
        alt="image" 
        className = {`${singleFileUploaderStyle.imageSize}`}/>
      }
    </div>
  );
}

export default SingleFileUploader