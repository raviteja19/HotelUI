import  React,{useState,useEffect} from 'react';
import {connect} from 'react-redux';
import { renderIntoDocument } from 'react-dom/test-utils';

function Confirmation(props)
{
    const [room,setRoom]=useState();
    useEffect(()=>{
        let data=JSON.parse(sessionStorage.getItem('confirmation'));
        if(data!=undefined ||data!=null)
            setRoom(data);
    },[]);
    const date=new Date();
    const days=['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
    const month=['Jan','Feb','Mar','Apr','May','Jun'];
    if(room==undefined||room==null) 
    return null;

    return (
        <div className="confirmation">
            <div></div>
            <div className="userdetails">
                <div className="header">
                    <span style={{fontSize:'18px',fontWeight:600,margin:'10px'}}>Your Booking id: {room.bookingid}</span>
                </div>
                <div className="hoteldetails">
                    <div className="details">
                        <div className="name">{room.name}</div>
                        <div className="hotelrating" style={{'backgroundColor':(room.rating>4)?'#1ab64f':(room.rating>3)?'#b4da55':'#f2605b'}}>
                                <span>
                                    {room.rating}
                                </span>
                            <img className="star" src="/star.svg" ></img>
                        </div>
                        <div className="staying" >2 Nights   ,  2 Guests   ,   {room.roomType}   ,    {days[date.getDay()]+','+date.getDate() +' '+month[date.getMonth()]+'  -  '+days[date.getDay()+1]+','+(date.getDate()+1) +' '+month[date.getMonth()+1]}</div>
                    </div>       
                    <div className="">
                        <img style= {{height:'100%',width:'100%'}} src={"/hotelimages/"+room.images[0]+".jpg"}></img>
                    </div>       
                 </div>
                    <div className="bookingdetails">
                        <span className="text"> We will use these details for your booking information</span>
                        <div className="confirmationdetails">
                            <div style={{marginBottom:'20px'}}>
                                <span  className="text"  style={{fontWeight:600}}>First Name:</span>
                                <span className="text" style={{marginLeft:'10px'}}>Jon</span>
                                <span className="text" style={{marginLeft:'5%',fontWeight:600}}>Last Name:</span>
                                <span className="text" style={{marginLeft:'10px'}}>Doe</span>
                            </div>
                            <div>
                                <div style={{marginBottom:'20px',marginTop:'10px'}}>
                                    <div className="text" style={{display:'inline-block'}}>Room price for 2 nights X 2 Guests :</div>
                                    <div className="text" style={{display:'inline-block',float:'right',marginRight:'15%',fontWeight:500}}>€{room.price*2}</div>
                                </div>
                                <div style={{marginBottom:'20px',marginTop:'10px'}}>
                                    <div className="text" style={{display:'inline-block'}}>Price drop</div>
                                    <div className="text" style={{display:'inline-block',float:'right',marginRight:'15%',fontWeight:500}}>-€10</div>
                                </div>
                                <div style={{marginBottom:'20px',marginTop:'10px'}}>
                                    <div className="text" style={{display:'inline-block'}}>Payable amount with taxes</div>
                                    <div className="text" style={{display:'inline-block',float:'right',marginRight:'15%',fontWeight:500}}>€{room.price*2-10}</div>
                                </div>
                            </div>
                            <div></div>
                        </div>
                    </div>
                    <div className="bookingbutton">
                        <div className="confirm">
                            Confirm booking
                        </div>
                    </div>
                
            </div>
        </div>
    );
}


export default Confirmation;