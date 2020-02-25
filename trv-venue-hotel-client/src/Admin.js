import  React,{useState,useEffect} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux'
import * as allactions from './actions/allactions'

function Admin(props)
{   
    const [hoteldata,setHotelDate]=useState();
    const [roles,setRoles]=useState('add');
    const [nextId,setnextId]=useState();
    const [hotelname,setHotelName]=useState('');
    const [pricecategory,setPricecategory]=useState('');
    const [description,setDescription]=useState('');
    const [amenities,setAmenities]=useState([]);
    const [success,setSuccess]=useState('');
    const [rating,setrating]=useState('');
    const [breakfast,setBreakFast]=useState('');
    const [mandatory,setmandatory]=useState('');
    const svgicons=[{name:'Wifi',svg:'wifi.svg'},{name:'Parking',svg:'parking.svg'},{name:'Kitchen',svg:'Kitchen.svg'},{name:'Lunch',svg:'eat.svg'}]
      
    useEffect(()=>{
        console.log("*********************")
        console.log(props);
        props.actions.Logindetails("hello");
       
    },[]);

    useEffect(()=>{
        setHotelDate(props.landingpage);
        setnextId(props.landingpage.length+1);
    },[props.landingpage]);

    const Aminity=(e)=>{
        let value=e.target.value;
        let ischeck=document.getElementById(e.target.id).checked;
        let index=amenities.indexOf(value);
        console.log(value);
        if(index==-1 && ischeck)
        {
            amenities.push(value);
        }
        else if(index>-1&&!ischeck)
        {
            console.log("remove")
            amenities.splice(index,1);
        }
        console.log(amenities)
    };

    const addHotel=()=>{
        let data={};
        let am=['Wifi','Parking','Kitchen','Lunch'];
        let hotelid='hotel'+(nextId%6);
        data.id=nextId;
        data.name=hotelname;
        data.description=description;
        data.distance_to_venue=600;
        data.rating=4;
        data.price_category=pricecategory;
        data.amenities=amenities;
        data.images=[hotelid];
        console.log(data)
        if(data.name!=null && data.description!=null&&data.price_category!=null&&data.amenities.length>0)
        {

            props.actions.Addhotels(data);
            setSuccess('Hotel data was added succesfully');
            setTimeout(()=>{
                setHotelName('');setDescription('');setPricecategory('');setSuccess('');
                setAmenities([]);
                am.map((data,i)=>{
                    document.getElementById(data).checked=false;
                });
            },2000);
            
            setmandatory('');
        }else
        {
            setmandatory('Please select all mandatory fields');
        }

    }

    const deletehotel=(e)=>{
        let id=e.target.id;
        setnextId(nextId-1);
        props.actions.DeleteHotel(id);
        setTimeout(()=>{
            props.actions.Logindetails('hello');
        },0);
    }

    if(hoteldata==null) return(<div></div>);

    return (<div className="admin">
            <div className="roles">
                <div className="add" onClick={()=>setRoles('add')}>Add Hotels</div>
                <div className="delete" onClick={()=>setRoles('delete')}>Delete Hotels</div>
            </div>
            <div className="operation" style={{display:(roles=='add')?'block':'none'}}>
                <div className="header">Please enter below information to create a hotel</div>
                <div style={{display:(mandatory.length>0)?'block':'none',color:'red'}}>Please enter below information to create a hotel</div>
                    <div className="operationgrid">
                        <div className="details">
                            <div className="text">
                                Hotel name:
                            </div>
                            <div className="text">
                                <input type="text" value={hotelname} onChange={(e)=>setHotelName(e.target.value)} placeholder="Enter hotel name" maxLength="30"></input>
                            </div>
                        </div>
                        <div className="details">
                            <div className="text">
                                Hotel description:
                            </div>
                            <div className="text">
                                <input type="text" value={description} onChange={(e)=>setDescription(e.target.value)} placeholder="Enter hotel description" maxLength="20"></input>
                            </div>
                        </div>
                    </div>
                    <div className="operationgrid">
                        <div className="details">
                            <div className="text">
                                Amenities
                            </div>
                            <div className="checkbox">
                                {svgicons.map((data,i)=>{
                                    return (
                                        <div key={data.name+'-'+i} style={{margin:'5px'}}>
                                            <input type="checkbox" value={data.name} id={data.name} onClick={(e)=>Aminity(e)}></input>
                                            <div style={{display:'inline-block'}} className="text">{data.name}</div>
                                        </div>
                                    );
                                })}
                                
                            </div>
                        </div>
                        <div className="details">
                            <label className="text">
                                Price category:
                            </label>
                            <select id="pricecategory" onChange={(e)=>setPricecategory(e.target.value)}>
                                <option value="low">Low</option>
                                <option value="medium">Medium</option>
                                <option value="high">High</option>
                            </select>
                            <div className="category">
                            
                            </div>
                        </div>
                    </div>
                    <div className="operationgrid">
                        <div className="details">
                            
                        </div>
                        <div className="details">
                            <div className="add" onClick={()=>addHotel()}>
                                    Add hotel
                            </div>
                        </div>
                    </div>
                    <div className="operationgrid">
                                <div style={{color:'green'}}>{success}</div>
                    </div>
                    
            </div>
            <div className="operation" style={{display:(roles=='delete')?'block':'none',boxShadow:'none'}}>
                <div className="hotelbox">
                  {hoteldata.map((data,i)=>{
                      return (<div key={data.id+'-'+i} className="box">
                                <img style={{width:'100%',height:'100%'}} src={'hotelimages/'+data.images[0]+'.jpg'}></img>
                                <div style={{display:'grid',gridTemplateRows:'70% 30%'}}>
                                  <span style={{margin:'10px',fontWeight:600,fontSize:'16px'}}>{data.name}</span>  
                                  <div className="delete" id ={data.id} onClick={(e)=>deletehotel(e)}>
                                      Delete
                                  </div>
                                </div>
                                </div>)
                  })}              
                </div>
            </div>
    </div>);
}

const mapStateToProps=(state,props)=>{
    return {
        landingpage:Array.from(state.Landing)
            };
}

const mapDispatchToProps=(dispatch)=>{
    return {
        actions: bindActionCreators(allactions, dispatch)
      };
}


export default connect(mapStateToProps,mapDispatchToProps)(Admin);

