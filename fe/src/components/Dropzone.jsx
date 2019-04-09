import React from "react";
import { PURE_BACKEND_HOST } from "../constants";
import ProgressBar from "react-fetch-progressbar";

const Dropzone = (props) => {
    return (
        <React.Fragment>
            <form action={`${PURE_BACKEND_HOST}/upload/multiple`} method="POST" className="dropzone">
                <label htmlFor="tracks" className="file-input-label pulse">
                    Select Tracks
                </label>

                <input
                    type="file"
                    name="tracks"
                    id="tracks"
                    className="file-input"
                />

                <input
                    type="submit"
                    className="submit-form fill"
                    value="Execute"
                />
            </form>

            
        </React.Fragment>
    )
}

export default Dropzone;