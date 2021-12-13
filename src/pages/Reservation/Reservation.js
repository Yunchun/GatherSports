import React from "react";
import CardFooter from "@material-tailwind/react/CardFooter";
import Paragraph from '@material-tailwind/react/Paragraph';
import H6 from "@material-tailwind/react/Heading6";
import Card from '@material-tailwind/react/Card';
import CardImage from "@material-tailwind/react/CardImage";
import CardBody from '@material-tailwind/react/CardBody';
import Dropdown from "@material-tailwind/react/Dropdown";
import Page from 'components/login/Page';
import moment from 'moment'
import GatherSportNav from 'components/GatherSportNav';
import DropdownLink from "@material-tailwind/react/DropdownLink";
import axios from 'axios';
import { Component } from 'react';
import Button from "@material-tailwind/react/Button";
import './styles.reservation.css';
import H2 from "@material-tailwind/react/Heading2";
const SportNameURL = 'http://localhost:8080/reservation/findSportNameThathasCourtbyAll';
const CourtReservationURL = 'http://localhost:8080/reservation/findAvailableTimeBySport';
const InsertReservationURL = 'http://localhost:8080/reservation/insertreservation';
async function getSportName() {
    const SportNames = await axios.get(SportNameURL);
    const SportName_info = [];
    for (const SportNames_data of SportNames.data) {
        SportName_info.push(SportNames_data);
    }
    return SportName_info;
}

class Reservation extends Component {
    constructor(props) {
        super(props);
       
        this.state = {
            userId: this.props.location.state.userid,
            availableTime:[],
            TimeSelect:[],
            SportNames: [],
            showCourtMenu:'none',
            showTimeCard:'none',
            showSportMenu:'none',
            CourtName:[],
            CourtReservation:[],
            CourtTime:[],
            SportSelect:[],
            CourtNameSelect:[],
            CourtIdSelect:'',
        }
    }
    async getCourtReservation(SportNameSelected, DateSelected) {
        
        var CourtReservation_get = await axios.get(CourtReservationURL+'/'+SportNameSelected+'/'+DateSelected);
        // const CourtReservation_name = [];
        const CourtReservation_info = [];
        const SportNameSelected_get =SportNameSelected;
        for (const CourtReservation_Item of CourtReservation_get.data) {
            // CourtReservation_name.push(CourtReservation_Item.courtName);
            CourtReservation_info.push(CourtReservation_Item);
            // console.log(CourtReservation_Item.availableTime)
            // for (const availabletimeSlot of CourtReservation_Item.courtName) {
        }      
            
            // }
            console.log(CourtReservation_info)
            
            this.setState({
                // CourtName: CourtReservation_name,
                // showCourtMenu:true,
                CourtReservation:CourtReservation_info,
                SportSelect:SportNameSelected_get
                
                // CourtName: CourtN,
                
            });
            
            
        // SportName_info.push(CourtReservation.data[0].courtName);
         
        return CourtReservation_info;
    }
    async getCourtReservationCourt(CourtReservation_info) {
    
        // var CourtReservation = await axios.get(CourtReservationURL+'/'+SportNameSelected);
        const CourtReservation_name = [];
        const CourtReservation_Id = [];
        // const CourtReservation_info = [];
        
        for (const CourtReservation_Item of CourtReservation_info) {
            // CourtReservation_name.push(CourtReservation_Item.courtName);
            console.log(CourtReservation_Item);
            CourtReservation_Id.push(CourtReservation_Item.CourtId);
            CourtReservation_name.push(CourtReservation_Item.courtName);
            // console.log(CourtReservation_Item.availableTime)
            // for (const availabletimeSlot of CourtReservation_Item.courtName) {
                
            
            // }
        }
        
            this.setState({
                CourtName: CourtReservation_name,
                showCourtMenu:true,
                
                // CourtReservation:CourtReservation_info
                // CourtName: CourtN,
                
            });
            
        
        // SportName_info.push(CourtReservation.data[0].courtName);
         
        return CourtReservation_info;
    }
    async getCourtReservationTimeAndId(CourtReservation_info, Court_Select) {
    
        // var CourtReservation = await axios.get(CourtReservationURL+'/'+SportNameSelected);
        var CourtReservation_time = [];
        var Court_Select_value = [];
        var CourtReservation_id = [];
        // const CourtReservation_info = [];
        for (const CourtReservation_Item of CourtReservation_info) {
            if (CourtReservation_Item.courtName===Court_Select){
                CourtReservation_time = CourtReservation_Item.availableTime;
                
                CourtReservation_id = CourtReservation_Item.courtId;
                Court_Select_value = Court_Select;
            }
            // CourtReservation_info.push(CourtReservation_Item);
            // console.log(CourtReservation_Item.availableTime)
            // for (const availabletimeSlot of CourtReservation_Item.courtName) {
                
            
            // }
            this.setState({
                CourtTime:CourtReservation_time,
                // CourtReservation:CourtReservation_info
                // CourtName: CourtN,
                showTimeCard:true,
                CourtNameSelect:Court_Select_value,
                CourtIdSelect:CourtReservation_id
                
            });
            
        }
        // SportName_info.push(CourtReservation.data[0].courtName);
         
        return CourtReservation_time
    }
    async Insert_Reservation(Court_Id_Insert, User_Id_Insert, Begin_Time_Insert){
        const User_id = User_Id_Insert;
        const  Court_Id = Court_Id_Insert;
        const Begin_Time = Begin_Time_Insert;
        console.log("data", this.props)
        var pos = 0
        for (var i = 0; i < this.state.CourtTime.length; i++) {
            if (this.state.CourtTime[i] === Begin_Time_Insert){
                console.log(this.state.CourtTime[i]);
                pos = i
                // traverse all the positions, find position of canceled reservation
            }       
        }
        this.state.CourtTime.splice(pos,1);
        console.log(Court_Id);
        this.setState({   
            CourtTime:this.state.CourtTime   
        });
        await axios.get(InsertReservationURL,
            {
            params: {
                CourtId: Court_Id,
                UserId:User_id,
                BeginTime:Begin_Time
            }
        }
        
        );
        alert('Submitt Successfully!');
    }
    async componentDidMount()
     {
        var SportName = await getSportName();
        // var CourtN = await getCourtReservation(SportName)
        console.log(SportName)
        this.setState({
            SportNames: SportName,
            availableTime:[moment().format("YYYY-MM-DD"),moment().add(1, 'days').format("YYYY-MM-DD"),moment().add(2, 'days').format("YYYY-MM-DD"),moment().add(3, 'days').format("YYYY-MM-DD"),moment().add(4, 'days').format("YYYY-MM-DD"),moment().add(5, 'days').format("YYYY-MM-DD"),moment().add(6, 'days').format("YYYY-MM-DD")],
            
        });
    }
    render() {
    
        return (
            
            <Page> 
                
                <GatherSportNav  userid={this.state.userId}/>

                <div className="Header">
        <H2 color="lightBlue">Make a reservation</H2>

</div>
<div className="TimeSelection">
                
                <Dropdown
                      
                            color="lightBlue"
                            placement="bottom-start"
                            buttonText="ChooseTime"
                            buttonType="filled"
                            size="regular"
                            rounded={true}
                            block={false}
                            ripple="light">
                    
                {this.state.availableTime.map(oneTime=> (
                     
                        
                          <DropdownLink
                          href="#"
                          color="blue"
                          ripple="light"
                          onClick={async()=> {
                           // await this.getCourtReservation(SportName, this.state.TimeSelect)
                            //await this.getCourtReservationCourt(this.state.CourtReservation)
                            // alert(s)
                            this.setState({
                            
                                TimeSelect:oneTime,
                                showSportMenu:true,
                                showTimeCard:'None'
                            });
                          }}
            >
                {oneTime}
                      </DropdownLink>
    
                              
                        ))} 
                      
               
                            
                         </Dropdown>
                      
                    </div>
            <div className="SportSelection" style={{display:this.state.showSportMenu}}>
                
            <Dropdown
                  
                        color="lightBlue"
                        placement="bottom-start"
                        buttonText="ChooseSport"
                        buttonType="filled"
                        size="regular"
                        rounded={true}
                        block={false}
                        ripple="light">
                
            {this.state.SportNames.map(SportName=> (
                 
                    
                      <DropdownLink
                      href="#"
                      color="blue"
                      ripple="light"
                      onClick={async()=> {
                        await this.getCourtReservation(SportName,  this.state.TimeSelect)
                        await this.getCourtReservationCourt(this.state.CourtReservation)
                        // alert(s)
                   
                      }}
        >
            {SportName}
                  </DropdownLink>

                          
                    ))} 
                  
           
                        
                     </Dropdown>
                  
                </div>
                <div className="CourtSelecton" style={{display:this.state.showCourtMenu}}>
                <Dropdown
                 color="lightBlue"
                 placement="bottom-start"
                 buttonText="ChooseCourt"
                 buttonType="filled"
                 size="regular"
                 rounded={true}
                 block={false}
                 ripple="light"
             >
                {this.state.CourtName.map(CourtNamecontent=> (
                
                 <DropdownLink
                     href="#"
                     color="blue"
                     ripple="light"
                     onClick={async()=> {
                        
                        await this.getCourtReservationTimeAndId(this.state.CourtReservation,CourtNamecontent)
                        // alert(s)
                   
                      }}
                 >
                    {CourtNamecontent}
                 </DropdownLink>
            
                    
            //      <Button
            //      color="lightBlue"
            //      buttonType="link"
            //      size="regular"
            //      rounded={false}
            //      block={false}
            //      iconOnly={false}
            //      ripple="dark"
            //  >
            //      {buttoncontent}
            //  </Button>
 
                     
               ))}
                </Dropdown>
               </div>
               <div style={{display:this.state.showTimeCard}}>
                    {/* className="w-full md:w-6/12 lg:w-3/12 lg:mb-0 mb-12 px-4" */}
                    {this.state.CourtTime.map(time => (
                       
                        <Card  className="reservationcard">
                            {<CardImage className="mateImage" alt="Card Image" src={require('assets/img/'+this.state.SportSelect+'.jpg').default}/> }
                            <CardBody>
                                <H6 color="gray">{time} </H6>
                                <Paragraph color="blueGray">
                                {/* {mate.gender==='M'?'Male':'Female'} */}
                                </Paragraph>
                            </CardBody>
                            <CardFooter>
                <Button color="lightBlue" size="lg" ripple="light"
                
                onClick={async()=> {
                        // alert(this.state.CourtSelect);
                        // alert(time);
                        await this.Insert_Reservation(this.state.CourtIdSelect, this.state.userId, time);
                        //await this.getCourtReservationTime(this.state.CourtReservation,CourtNamecontent)

                   
                      }
    }
                    > 
                Reserve
                </Button>
            </CardFooter>
                    </Card>
                       
            
                    ))} 

                </div> 
               
                </Page>
                
        //     <Dropdown
        //     color="lightBlue"
        //     placement="bottom-start"
        //     buttonText="Sports"
        //     buttonType="filled"
        //     size="regular"
        //     rounded={false}
        //     block={false}
        //     ripple="light"
        // >

        //    <DropdownItem color="lightBlue" ripple="light">
        //    SportNames[i]
        //  </DropdownItem>
            
    
    
            
        //     <DropdownLink
        //         href="#"
        //         color="red"
        //         ripple="light"
        //         onClick={(e) => e.preventDefault()}
        //     >
        //     </DropdownLink>

        // </Dropdown>


        );
    }

}
export default Reservation;
