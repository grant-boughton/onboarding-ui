import React from "react";
import {API, Auth} from "aws-amplify";

export default function ImageTable(props){

    const [items, setItems] = React.useState([]);

    async function fetchItems(){
        let token = (await Auth.currentSession()).getIdToken().getJwtToken();
        let config = {
                "Content-Type":"application/json",
                "Authorization":"Bearer "+token
            };
        try {

            let items = await API.get("images","/list",{headers:config});
            setItems(items.map(i => {
                return JSON.parse(i);
            }));
        }
        catch {

        }
    }

    //Empty array for second parameter causes effect to only happen once (on mount)
    React.useEffect(() => {
        fetchItems();
    }, []);

    return(<React.Fragment>
        <table className={"table"}>
            <tr>
                <th>Image</th>
                <th>Text</th>
            </tr>
            {items.map(i => {
                return(
                    <tr>
                        <td><img src = {"http://"+i.url} width={"500"}/></td>
                        <td>
                            {i.foundText &&
                                <ul>
                                    {i.foundText.map(t => {
                                    return <li>{t}</li>
                                    })}
                                </ul>
                            }
                            {!i.foundText &&
                                <span>No text found</span>
                            }
                        </td>
                    </tr>
                )
            })}
        </table>
    </React.Fragment>)
}