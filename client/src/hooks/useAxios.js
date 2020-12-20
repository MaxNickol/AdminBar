import {useState} from 'react';
import axios from 'axios';

export const useAxios = () => { 

    const [reload, setReload] = useState(false);
   

    const request = async (url, method, body=null) => { 
        try{
            const response = await axios({
                method: method,
                url: url,
                data: body
            });
    
            if(response.status === 200) { 
                setReload(!reload); 
                return response.data
            }
        }
        catch(e) { 
            return e;
        }
    }

    return {request, reload, setReload}
}