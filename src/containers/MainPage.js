import React from 'react';
import useS3Upload from "../components/FileUpload";
import ImageTable from "../components/ImageTable";
import { Button } from "react-bootstrap";
import "./MainPage.css";

function MainPage() {
    const {getRootProps, getInputProps} = useS3Upload();

    return (
        <div className="App">
            <div className={"buttonContainer"}>
            <Button {...getRootProps()}>
                <input {...getInputProps()}/>
                <span>Click here to upload a file</span>
            </Button>
            </div>
            <ImageTable
                fetchUrl={"http://grant-onboarding-lb-1207286975.us-east-1.elb.amazonaws.com/list"}
            />
        </div>
    );
}

export default MainPage;