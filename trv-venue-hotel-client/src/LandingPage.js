import  React,{useEffect,useState} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux'
import * as allactions from './actions/allactions'

function LandingPage(props)
{
    const [hotels,Sethotels]=useState([]);
    const [chevron,setChevron]=useState('none');
    const [details,setDetails]=useState("Location");
    const detaildropdown=['Location','Reviews','Overview'];
    const svgicons=[{name:'Wifi',svg:'wifi.svg'},{name:'Parking',svg:'parking.svg'},{name:'Kitchen',svg:'Kitchen.svg'},{name:'Lunch',svg:'eat.svg'}]
    const [name,Setname]=useState("");
    const [distanceslider,setdistanceSlider]=useState(100);
    const [priceslider,setpriceSlider]=useState(1);
    const [amenity,setAmenity]=useState('');
    const [filtobj,setfiltObject]=useState({});
    const [budget,setbudget]=useState('');
    const [filterimage,setFilterImage]=useState(false);
    useEffect(()=>{
        console.log("*********************")
        console.log(props);
        props.actions.Logindetails("hello");
       
    },[]);

    useEffect(()=>{
            Sethotels(props.landingpage);
    },[props.landingpage])

    const settingChevronValue=(e)=>
    {
        let id=e.target.id;
        console.log(id);
        if(chevron==id)
        {
            setChevron("none");
        }else
        {
            setChevron(id);
        }
    }

    const ViewDeal=(data)=>{
            console.log(data)
            let viewdata=JSON.stringify(data);
            sessionStorage.setItem("viewdeal",viewdata);
            props.history.push('/hoteldetails')
            
    }
useEffect(()=>{
    console.log(filtobj);
})
    const doFilter=(e)=>{
        e.preventDefault();
        let id=e.target.id;
        let hoteldata=props.landingpage;
        let value=e.target.value;
        let obj=filtobj;
        if( id=="distance")
        {
            setfiltObject({...filtobj,distance_to_venue:value});
            setdistanceSlider(e.target.value);
            obj={...obj,distance_to_venue:value};
        }else if( id=="rating")
        {
            setfiltObject({...filtobj,rating:value});
            setpriceSlider(e.target.value);
            obj={...obj,rating:value};
        }
        else if(id=='low'||id=='medium'||id=='high')
        {   
            setbudget(id);
            setfiltObject({...filtobj,price_category:id});
            obj={...obj,price_category:id};

        }
        else
        {
            setAmenity(id);
            setfiltObject({...filtobj,amenities:id});
            obj={...obj,amenities:id};
        }
        
        console.log(obj);
        hoteldata=hoteldata.filter((item)=>{
            for (let key in obj) {console.log(item[key] <=obj[key])
                console.log(item[key] +'--'+obj[key])
                if(key=='distance_to_venue'||key=='rating')
                {

                    if (item[key] === undefined || item[key] < obj[key] )
                    return false;
                }
                else if(key =='amenities')
                {
                    if (item[key] === undefined || item[key].indexOf( obj[key])<=-1 )
                    return false;
                }
                else if(key=='price_category')
                {
                    if (item[key] === undefined || item[key] != obj[key]  )
                    return false;
                }

                //   if ( item[key] == obj[key] )
                //   return false;

              }
              return true;
        });

        console.log(hoteldata)
        
        setTimeout(()=>{
            Sethotels(hoteldata);
       },1000)
        return false;
        
    }

    const setFilterforMobile=()=>
    {
        let id=document.getElementById('filterbig').style.display;
        console.log(id);
        if(id==''||id=='none')
        {
            document.getElementById('filterbig').style.display='grid';
            setFilterImage(true);
        }else
        {
            document.getElementById('filterbig').style.display='none';
            setFilterImage(false);
        }
        
    }
    
    const reset=()=>{
        setAmenity('');
        setdistanceSlider(200);
        setpriceSlider(1);
        setfiltObject({});
        Sethotels(props.landingpage);
        setbudget('');

    }
    return ( 
        <div className="landingpage">
            <div className="main">
                <div className="filter_big" id="filterbig">
                    <div className="slidercontainer">
                        <span style={{display:'block',fontSize:'14px',marginBottom:'20px'}}>Distance from venue : {distanceslider}m</span>
                        <span style={{float:'left',fontSize:'12px'}}>200m</span><span style={{float:'right',fontSize:'12px'}}>1000m</span>
                        <input type="range" min="200" max="1000" value={distanceslider} className="slider" id="distance" onChange={(e)=>{doFilter(e)}}/>
                    </div>
                    <div className="slidercontainer">
                        <div style={{display:'block',fontSize:'14px',marginBottom:'20px'}}><span style={{display:'inline-block'}}>Rating :</span> 
                        <div className="rating" style={{'backgroundColor':(priceslider>4)?'#1ab64f':(priceslider>=3)?'#b4da55':'#f2605b'}}>
                                            <span>
                                                {priceslider}
                                            </span>
                                            <img className="star" src="/star.svg" ></img>
                                        </div></div>
                        <span style={{float:'left',fontSize:'12px'}}>1</span><span style={{float:'right',fontSize:'12px'}}>5</span>
                        <input type="range" min="1" max="5" value={priceslider} className="slider" id="rating" onChange={(e)=>{doFilter(e)}} step="0.1"/>
                    </div>
                    <div className="slidercontainer">
                        <span className="budget" id="low" style={{color:(budget=='low')?'#1ab64f':'black'}} onClick={(e)=>{doFilter(e)}}>Low</span>
                        <span className="budget" id="medium" style={{color:(budget=='medium')?'#1ab64f':'black'}} onClick={(e)=>{doFilter(e)}} onClick={(e)=>{doFilter(e)}}>Medium</span>
                        <span className="budget" id="high" style={{color:(budget=='high')?'#1ab64f':'black'}} onClick={(e)=>{doFilter(e)}} onClick={(e)=>{doFilter(e)}}>High</span>
                    </div>
                    <div className="filteramenties">

                    {svgicons.map((svg,i)=>{
                            return (
                                    <div className="icon" id={svg.name} key={svg.name+'-'+i} style={{backgroundColor:(amenity==svg.name)?'#8BC34A':'white'}} 
                                    >
                                            <img  id={svg.name} className="svg" src={svg.svg} onClick={(e)=>{doFilter(e)}}></img>
                                    </div>   
                                    );
                                })}
                    </div>
                    <div className="reset">
                            <div>

                            </div>
                            <div className="button" onClick={()=>reset()}>
                                Reset
                            </div>
                    </div>

                </div>
                <div className="container">
                    <div className="box">
                    <div className="filtericon" onClick={()=>{setFilterforMobile()}}>
                        <img style={{display:(filterimage)?'none':'inline-block',height:'30px'}} src="/filter.svg"></img>
                        <img style={{display:(filterimage)?'inline-block':'none',height:'30px'}} src="/filters.svg"></img>
                    </div>
                    <div style={{display:(hotels.length==0)?'block':'none',color:'#ccc',textAlign:'center',fontSize:'20px'}}>No results found</div>
                    {hotels.map((data,i)=>{
                        
                    return(
                        <div className="hotel-item" key={data.id+'-'+i}>
                            <div className="item__wrapper">
                                <div className="item__image-area">
                                    <img className="hotelimage" src={"/hotelimages/"+data.images[0]+".jpg"}></img>
                                </div>
                                <div className="item__flex-column">
                                    <div className="hotel_deetails">
                                        <div className="hotelname" onClick={()=>ViewDeal(data)}>
                                            {data.name}
                                        </div>
                                        <div className="description">
                                            {data.description}
                                        </div>
                                        <div className="rating" style={{'backgroundColor':(data.rating>4)?'#1ab64f':(data.rating>3)?'#b4da55':'#f2605b'}}>
                                            <span>
                                                {data.rating}
                                            </span>
                                            <img className="star" src="/star.svg" ></img>
                                        </div>
                                        <div style={{'display':'block'}}>
                                       <span  className="breakfast" style={{'display':(i%2==0)?'block':'none'}}>Breakfast</span>
                                        </div>
                                        <div className="amentibox" style={{'marginTop':(i%2==0)?'5%':'8%'}}>
                                            {data.amenities.map((ament,i)=>{
                                                return (
                                                    <div className="amenties" key={ament+'-'+i}>
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
                                        <div className="chevron">
                                                <img id={i} style={{height:'10px',cursor:'pointer'}} src="/chevrondown.svg" onClick={(e)=>settingChevronValue(e)}></img>
                                        </div>
                                    </div>
                                    <div className="hote_price">
                                        <span className="default">€{23*(i+1)} <span style={{display:'block',color: '#ada2a2',fontSize:'14px'}}>for 1 night</span></span>
                                        <div className="viewdeal" onClick={()=>ViewDeal(data)}>
                                            View Details
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="item__flex-columnone" style={{display:(i==chevron)?'grid':'none'}}>
                                    <div className="Overviews" >
                                            {detaildropdown.map((data,i)=>{
                                                return (
                                                    <div className={data} key={data+'-'+i} id= {data} onClick={(e)=>setDetails(e.target.id)}
                                                    style={{'borderBottom':(data==details)?'2px solid #1ab64f':'1px solid #ccc'}}>
                                                        {data}
                                                    </div>
                                                );
                                            })}
                                    </div>
                                    <div className="displayoverview">
                                        <p style={{display:(details=='Overview')?'block':'none'}}>
                                            Hotel Overview details will be displayed here
                                        </p>
                                        <p style={{display:(details=='Reviews')?'block':'none'}}>
                                            Hotel total reviews will be displayed
                                        </p>
                                        <div style={{display:(details=='Location')?'block':'none'}}>
                                            <p>This hotel is {data.distance_to_venue} meters from  your venue</p>
                                            <p style={{textAlign:'center'}}> Map will be displayed here</p>
                                        </div>
                                    </div>

                            </div>
                        </div>
                    );
                    })}
                    </div>
                </div>
                <div></div>
            </div>
        </div>
    );
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


export default connect(mapStateToProps,mapDispatchToProps)(LandingPage);