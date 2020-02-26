import React from "react";
import "./LoadingScreen.css";
import {Octicon, sync} from "octicons-react";

export default function LoadingScreen(props) {
    return(<div className={"LoadingScreen"}>
        <Octicon icon={sync} className={"icon"} scale={3}/>

    </div>);
}