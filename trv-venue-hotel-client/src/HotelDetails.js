import React,{useEffect,useState} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux'
import * as allactions from './actions/allactions'

function HotelDetails(props)
{
    const [hoteldata,SetHoteldata]=useState();
    
      const svgicons=[{name:'Wifi',svg:'wifi.svg'},{name:'Parking',svg:'parking.svg'},{name:'Kitchen',svg:'Kitchen.svg'},{name:'Lunch',svg:'eat.svg'}]
      const rooms=['room1','room2','room3','room4'];
      useEffect(()=>{
        props.actions.hoteldetails();
        let viewdata=JSON.parse(sessionStorage.getItem("viewdeal"));
        if(viewdata!=undefined || viewdata!=null)
        {
            SetHoteldata(viewdata);
            viewdata.amenities.map((data,i)=>console.log(data))
        }
        console.log(viewdata)
        console.log("*********");
      },[]);

    const domore=(e)=>
    {   
        let id=e.target.id;
        let isd=id.split('-')[0];
        let imore=isd+"more",iless=isd+"-less",idmore=isd+"-more";
        console.log(imore ,iless);
        if(isd=="show")
        {
            let moreText = document.getElementsByClassName(imore);
            let len=moreText.length;
            for(let i=0;i<len;i++)
            {
             moreText[i].style.display = "inline";
            }
        }else 
        {
            let moreText = document.getElementById(imore);
            moreText.style.display = "inline";
        }
        let moreidText = document.getElementById(idmore);
        moreidText.style.display = "none";
        let lessText = document.getElementById(iless);
        lessText.style.display = "inline";
    }
    const doless=(e)=>
    {
        let id=e.target.id;
        let isd=id.split('-')[0];
        let imore=isd+"more",iless=isd+"-less",idmore=isd+"-more";
        console.log(imore ,iless);
        if(isd=="show")
        {
            let moreText = document.getElementsByClassName(imore);
            let len=moreText.length;
            for(let i=0;i<len;i++)
            {
             moreText[i].style.display = "none";
            }
        }else 
        {
            let moreText = document.getElementById(imore);
            moreText.style.display = "none";
        }
        let moreidText = document.getElementById(idmore);
        moreidText.style.display = "inline";
        let lessText = document.getElementById(iless);
        lessText.style.display = "none";
    }
    const gotToConfirmation=(id,price)=>{


        hoteldata.roomType=id;
        let bookingid='TRI'+Math.floor(Math.random()*899999+100000);
        hoteldata.bookingid=bookingid;
        hoteldata.price=price;
        let data=JSON.stringify(hoteldata);
        sessionStorage.setItem('confirmation',data);
        props.history.push('/confirmation');
    }
    if(hoteldata==undefined)
    {
        return(<div></div>);
    }
    return (
        <div className="hotel">
            <div></div>
            <div>
               <div className="hotelimage">
                   <img className="hotelmainimage"  src={"hotelimages/"+hoteldata.images[0]+".jpg"}></img>
                </div> 
                <div className="name_row">
                    <div className="details">
                        <div className="name">
                            {hoteldata.name}
                        </div>  
                        <div className="near">
                            {hoteldata.description}
                        </div>
                    </div>
                    <div className="review">
                        <div className="hotelrating" style={{'backgroundColor':(hoteldata.rating>4)?'#1ab64f':(hoteldata.rating>3)?'#b4da55':'#f2605b'}}>
                                <span>
                                    {hoteldata.rating}
                                </span>
                            <img className="star" src="/star.svg" ></img>
                        </div>
                    </div>
                </div>
                <div className="description">
                    <span className="desc">Description</span>
                    <span className="location">Location</span>
                    <div style={{display:'block'}}>
                        <p style={{marginLeft:'10px'}}>
                        Sitting {hoteldata.description}, " {hoteldata.name} "  ensures a good <a id="loc-more" onClick={(e)=>domore(e)}>read more</a><span id="locmore">environment for the dwellers. The hotel sits very close to the intersection between State Highways 9 and 39.
                        Modern rooms offer garden or sea views. A flat-screen cable TV, mini-bar and tea/coffee-making facilities are standard in all rooms. Safety deposit boxes are provided.</span><a id="loc-less" onClick={(e)=>doless(e)}>read less</a></p>
                    </div>
                    <span className="location">Special features</span>
                    <div style={{display:'block'}}>
                        <p style={{marginLeft:'10px'}}>
                        Courier and secretarial services are available upon request. Guests can work out <a id="spec-more" onClick={(e)=>domore(e)}>read more</a><span id="specmore"> at the fitness center or head for a relaxing spa bath session. Ticketing and currency exchange services are available. Guests can enjoy the outdoor atmosphere at GAD restaurant, which offers open kitchens. Szechuan cuisine is served at Ming Garden restaurant.</span><a id="spec-less" onClick={(e)=>doless(e)}>read less</a></p>
                    </div>
                </div>
                <div className="amenitiesbox">
                        {hoteldata.amenities.map((ament,i)=>{
                            return (
                                <div className="amenties" key={i}>
                                    {ament}
                                    <div className="am_image">

                                    {svgicons.map((svg,i)=>{
                                        return (
                                            <div style={{display:(ament==svg.name)?'block':'none'}}>
                                                <img  src={svg.svg}></img>
                                            </div>   
                                                );
                                    })}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    <span className="depsc">Avilabile Rooms</span>
                    {props.roomdetails.map((data,i)=>{
                        return (    <div className={(i>1)?'showmore':'showless'}>         
                <div className="avaialbilerooms" key={data.id+'-'+i}>
                   
                    <div className="room">
                        <div className="image">
                            {rooms.map((data,i)=>{
                                return (
                                   <div key={i+data}>
                                   <img className="roomimage"  src={"hotelimages/"+data+".jpg"}></img>
                                   </div>
                                );
                            })}
                        </div>
                        <div className="room_details">
                                <div className="room_desc">
                                    <div className="type">
                                        <span className="suite">
                                        {data.name}
                                        </span>
                                        <span className="describe">Lorem ipsum dolor sit amet, consetetur sadipscing elitr.</span>
                                    </div>
                                    <div className="type">
                                        <span>Modern room with garden views fitted with a flat-screen cable TV, mini-bar and tea/coffee-making facilities.</span>
                                    </div>
                                    <div className="type" style={{display:'grid',gridTemplateColumns:'50% 10% 40%'}}>
                                        <span style={{display:'inline'}}>Maximum occupancy :{data.max_occupancy} </span>
                                        <img src={'/bed.svg'} style={{height:'23px'}}></img>
                                        <span style={{color:'green',textAlign:'center'}}>Non refundable</span>
                                    </div>
                                    <div className="type">
                                        <span style={{display:'inline'}}>Price per night :</span>
                                        <span className="price">€{data.price_in_usd}</span>
                                    </div>
                                </div>
                                
                        <div className="booknow" id={data.name} onClick={()=>gotToConfirmation(data.name,data.price_in_usd)}>
                            Book now    
                        </div>
                        </div>
                    </div>
                </div></div>)
                    })}
            <div style={{display:'block',marginBottom:'10%'}}>        
            <span  id="show-more" onClick={(e)=>domore(e)}>Show more</span>
            <span id="show-less" style={{display:'none'}} onClick={(e)=>doless(e)}> Show less</span>
            </div></div>
            <div></div>
        </div>
    );
}

const mapStateToProps=(state,props)=>{
    return {
        roomdetails:Array.from(state.Roomdetails)
            };
}

const mapDispatchToProps=(dispatch)=>{
    return {
        actions: bindActionCreators(allactions, dispatch)
      };
}


export default connect(mapStateToProps,mapDispatchToProps)(HotelDetails);
