import React, { Fragment, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';



const Verify = () => {
    const params = useParams();
    const [validUrl, setvalidUrl] = useState(false);
    useEffect(() => {
    const veriFyEmail= async()=>{
        try {
            const url = `/auth/${params.id}/verify/${params.token}`;
            console.log(params.id,params.token);
            const res= await axios.get(url);
            console.log(res.data);
            setvalidUrl(true);
        } catch (error) {
            console.log("error ocured");
            setvalidUrl(false);
        }
    }
    
      veriFyEmail();
    }, [params])
    
  return (
<Fragment>
    <div className='validUrl  flex items-center justify-center flex-col' style={{height:"75vh"}}>
<h1>Email verified successfully</h1>
<Link to="/login">
    <button className=' text-slate-100 text-2xl py-3 px-5 bg-orange-600' >LOGIN</button>
</Link>
    </div>

    
</Fragment>  )
}

export default Verify