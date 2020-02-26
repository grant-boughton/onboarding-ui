import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import { API, Auth } from "aws-amplify";

export default function useS3Upload() {
    async function handleDrop([pendingImage]) {
        Auth.currentAuthenticatedUser().then(user => async function(user){
            const baseUrl = "http://grant-onboarding-lb-1207286975.us-east-1.elb.amazonaws.com/upload/grant-onboarding-images/";
            const url = "/upload/grant-onboarding-images/" + Date.now() + "?user=" + user.getUsername();
            let token = (await Auth.currentSession()).getIdToken().getJwtToken();
            let config = {
                "Content-Type":"application/json",
                "Authorization":"Bearer "+token
            };
            API.get("images", url, {headers:config}).then(
                response => {
                    axios({
                        method:"put",
                        url: response,
                        data: pendingImage,

                    }).then(r => {
                        window.alert("File was successfully uploaded");
                    });
                });
            
        });

    }

    return useDropzone({
        accept: 'image/*',
        onDrop: handleDrop,
    });
}