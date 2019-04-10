import React, { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { ProgressBar } from "react-fetch-progressbar"

const MyDropzone = () => {
  const onDrop = useCallback(acceptedFiles => {
    console.dir(acceptedFiles);
    let data = new FormData();

    for (let item of acceptedFiles) {
      console.log(item);
      data.append("tracks", item);
    }

    console.dir(data.getAll("tracks"));


    fetch("/upload/multiple", {
      method: "POST",
      credentials: 'include',
      body: data

    }).then((r) => r.json().then((r) => {
      console.log(r);
      
    }))

  }, [])
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })
  return (
    
    <div {...getRootProps()}>
    <div className="tc" style={{border: "7px solid black", width: "100%", height: "400px"}}>
      <input {...getInputProps()} />
      <p style={{fontSize: "24px", marginTop: "70px"}}>Drag 'n' drop some files here, or click to select files</p>
    </div>
      
     
      <ProgressBar className="fetch-progress-bar"
        style={{
          background: "#12c2e9",
          background: "-webkit-linear-gradient(to right, #12c2e9, #c471ed, #f64f59)",
          background: "linear-gradient(to right, #12c2e9, #c471ed, #f64f59)"
          , height: "20px", top: `20%`
        }}
      />
    </div>
  )
}

export default MyDropzone;