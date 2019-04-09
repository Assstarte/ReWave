import React, { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'

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
      
    }).then((r) => r.json().then((r) => console.log(r)))

  }, [])
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      <p>Drag 'n' drop some files here, or click to select files</p>
    </div>
  )
}

export default MyDropzone;