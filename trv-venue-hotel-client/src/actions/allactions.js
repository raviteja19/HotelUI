import * as types from './actionTypes'
import Axios from 'axios'
export const Logindetails=(data)=>{
    console.log(data)
    // return (dispatch)=>{

    //     return dispatch({type:types.LandingPage,data:data});
    // }
    return (dispatch)=>{

        return Axios.get(' http://localhost:3001/hotels')
        .then((res)=>{
            console.log(res.data);
            dispatch({type:types.LandingPage,data:res.data})
        })
        .catch((res)=>{
            console.log(res);
        })
    }
}

export const hoteldetails=()=>{
    return (dispatch)=>{

        return Axios.get(' http://localhost:3001/rooms')
        .then((res)=>{
            console.log(res.data);
            dispatch({type:types.DetailPage,data:res.data})
        })
        .catch((res)=>{
            console.log(res);
        })
    }
}


export const Addhotels=(data)=>{
    return (dispatch)=>{

        return Axios.post(' http://localhost:3001/hotels',data)
        .then((res)=>{
            console.log(res.data);
            dispatch({type:types.Addhotel,data:res.data})
        })
        .catch((res)=>{
            console.log(res);
        })
    }
}


export const DeleteHotel=(id)=>{
    return (dispatch)=>{

        return Axios.delete(' http://localhost:3001/hotels/'+id)
        .then((res)=>{
            console.log(res.data);
            dispatch({type:types.DELETEHOTEL,data:{message:'success'}})
           
        })
        .catch((res)=>{
            dispatch({type:types.DELETEHOTEL,data:{message:'error'}})
        })
    }
}