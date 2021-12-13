import { Component } from 'react';
import { Link } from 'react-router-dom';
import React from "react";
import Card from "@material-tailwind/react/Card";
import CardImage from "@material-tailwind/react/CardImage";
import CardBody from "@material-tailwind/react/CardBody";
import H6 from "@material-tailwind/react/Heading6";
import Paragraph from "@material-tailwind/react/Paragraph";
import Profile from 'assets/img/boy.jpeg';
import './styles.overview.css';
import GatherSportNav from 'components/GatherSportNav';
import axios from 'axios';
import Page from 'components/login/Page';
import Moment from 'moment'
import Image from "@material-tailwind/react/Image";
import Button from "@material-tailwind/react/Button";
import H1 from "@material-tailwind/react/Heading1";
import CardRow from "@material-tailwind/react/CardRow";
import CardHeader from "@material-tailwind/react/CardHeader";
import CardStatus from "@material-tailwind/react/CardStatus";
import CardStatusFooter from "@material-tailwind/react/CardStatusFooter";
import Icon from "@material-tailwind/react/Icon";
import StatusCard from 'components/landing/StatusCard';
import HeaderBackground from 'components/HeaderBackground';
import { info } from 'autoprefixer';


const overviewURL = 'http://localhost:8080/overview';
// send request to back-end for getting reservation of specific userid
async function getOverview_Res(userid){
    const reservations_back = await axios.get(overviewURL + "/reservation",
        {
            params:{
                id : userid
            }

    });
        
    console.log(reservations_back);     
    return reservations_back;
}

async function getOverview_AcceptedAppoint(userid){
    const appointments_accept = await axios.get(overviewURL + "/appointment/T", {
        params:{
            id: userid
        }
    })

    return appointments_accept;
}

async function getOverview_IncomingAppoint(userid){
    const appointments_incoming = await axios.get(overviewURL + "/appointment/F", {
        params:{
            id: userid
        }
    })

    return appointments_incoming;
}

async function getOverview_Enroll(userid){
    const enrollment_back = await axios.get(overviewURL + "/enrollment", {
        params:{
            id: userid
        }
    })

    return enrollment_back;
}

// send request to back-end for getting sportstar for all reservations
async function getReservationStar(){
    const reservationStarList = await axios.get(overviewURL + "/reservationstar")
    console.log(reservationStarList);
    return reservationStarList;
}

class Overview extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            id: this.props.location.state.id,
            reservations: [],
            reservationStarList: [],
            appointments_accept: [],
            appointments_incoming: [],
            enrollments:[]
        })
    }
    // send deleting request to back-end for canceling specific reservation
    async deleteReservation(reservationid_delete){
        await axios.post(overviewURL + "/reservation/cancel" + '/' + reservationid_delete)

        // update front-page when some reservation is canceled
        var pos = 0
        for (var i = 0; i < this.state.reservations.data.length; i++) {
            if (this.state.reservations.data[i].reservationId === reservationid_delete){
                pos = i
                // traverse all the positions, find position of canceled reservation
            }       
        }
        this.state.reservations.data.splice(pos,1)
        this.setState({       
            appointments_accept: await getOverview_AcceptedAppoint(this.state.id),
            appointments_incoming: await getOverview_IncomingAppoint(this.state.id)
        });
    }

    async componentDidMount(){
        // extract params from url
        // let search = window.location.search;
        // let params = new URLSearchParams(search);
        // let id = params.get('id');
        // call two functions and render the page
        this.setState({
            reservations: await getOverview_Res(this.state.id),
            enrollments: await getOverview_Enroll(this.state.id),
            reservationStarList: await getReservationStar(),
            appointments_accept: await getOverview_AcceptedAppoint(this.state.id),
            appointments_incoming: await getOverview_IncomingAppoint(this.state.id),

        });
        console.log("user" + this.state.id)
    }

    render() {
        console.log(this.state.reservations);
        if (!this.state.reservations || this.state.reservations.length === 0) {
            return <div></div>
        }
        return (
            <Page>
            <GatherSportNav userid={this.state.id}/>
            <HeaderBackground/>
            <div className="container max-w-7xl mx-auto px-4">
                <div className="flex flex-wrap relative z-50">
                    <StatusCard color="red" icon="stars" title="Reservation">
                        In GatherSport application, you can make reservation of courts on campus for 
                        time that suits you best!
                        <div className="redirectButtom">
                            <Link to={{
                                pathname:"/reservation",
                                state:{
                                    userid: this.state.id
                                }
                            }}>
                                <Button color="pink" 
                                    buttonType="link"
                                    size="lg"
                                    rounded={false}
                                    block={true}
                                    iconOnly={false}
                                    ripple="dark">
                                    Make a Reservation
                                </Button>
                            </Link>
                        </div>
                    </StatusCard>
                    <StatusCard
                        color="lightBlue"
                        icon="autorenew"
                        title="Course"
                    >
                        In order to better help sportfans get started with a sport, 
                        we provide you with diverse sports courses!
                        <div className="redirectButtom">
                            <Link to={{
                                pathname:"/coursesearch",
                                state:{
                                    id: this.state.id
                                }
                            }}>
                                <Button color="blue" 
                                    buttonType="link"
                                    size="lg"
                                    rounded={false}
                                    block={true}
                                    iconOnly={false}
                                    ripple="dark">
                                    Search for courses
                                </Button>
                            </Link>
                        </div>
                    </StatusCard>
                    <StatusCard
                        color="teal"
                        icon="fingerprint"
                        title="Appointment"
                    >
                        In-person appointments could be made with professional coaches
                        for detailed instructions, helping you become a sport star!
                        <div className="redirectButtom">
                            <Link to={{
                                pathname: "/appointment",
                                state:{
                                    userid: this.state.id
                                }
                            }}>
                                <Button color="teal" 
                                    buttonType="link"
                                    size="lg"
                                    rounded={false}
                                    block={true}
                                    iconOnly={false}
                                    ref={"/appointment"}
                                    ripple="dark">
                                    Get professional tutorials
                                </Button>
                            </Link>
                        </div>
                    </StatusCard>
                </div>
            </div>

            
            <div className="splitLine">
                <H1 color="red">Court Reservation</H1>
            </div>
            <div className="overviewSection">
                {this.state.reservations.data.map(reservation => (
                    <Card key={reservation.CourtId} className="reservationCard">
                    <CardImage className="mateImage" src={require('assets/img/'+reservation.userId+'.jpg').default} alt="Card Image"/>
        
                    <CardBody>
                        <H6 color="gray">{Moment(reservation.beginTime).format("DD-MMM-YYYY HH:mm:ss")}</H6>
                        <Paragraph color="gray">
                        {reservation.courtId}
                        </Paragraph>
                    </CardBody>
                <Button color="deepOrange" size="lg" ripple="light" onClick={async()=> {
                        await this.deleteReservation(reservation.reservationId)
                      }}>
                    Cancel Now
                </Button>
                </Card>
                ))}
            </div>
            

            
            <br></br>
            <br></br>
            <div className="splitLine">
                <H1 color="lightGreen">Course Enrollment</H1>
            </div>
            <div className="overviewSection">
                {this.state.enrollments.data.map(enrollment => (
                
                    <Card className="reservationCard">
                        <CardRow>
                            <CardHeader color="lightGreen" size="lg" iconOnly>
                                <Icon name="groups" size="5xl" color="white" />
                            </CardHeader>

                            <CardStatus title={enrollment.time} amount={enrollment.date} />
                        </CardRow>

                        <CardStatusFooter color="green" date={enrollment.name}>
                        </CardStatusFooter>
                    </Card>
                
                ))}
            <br></br>
            <br></br>
            </div>
            <div className="splitLine">
                <H1 color="deepPurple">Coach Appointment</H1>
            </div>
            
            <div className="overviewSection">

                <div>
                {this.state.appointments_accept.data.map(appointment => (
                
                    <Card className="reservationCard">
                        <CardRow>
                            <CardHeader color="indigo" size="lg" iconOnly>
                                <Icon name="groups" size="5xl" color="white" />
                            </CardHeader>

                            <CardStatus color="indigo" title={appointment.location} amount={appointment.teacherName} />
                        </CardRow>

                        <CardStatusFooter color="green" amount={Moment(appointment.time).format("YYYY-MMM-DD HH:mm:ss")}>
                        </CardStatusFooter>
                    </Card>
                
                ))}
            </div>
            </div>
            
            
           

            <div className="splitLine">
                <H1 color="teal">Who is the most active star?</H1>
            </div>

            <div className="overviewSection">
                {this.state.reservationStarList.data.map(star => (
                    <Card className="sportStarCard">
                    <Image className="mateImage" src={Profile} rounded={true}
            raised={false}
            alt="Rounded Image"/>
                    <CardBody>
                        <H6 color="gray">{star.name}</H6>
                        <Paragraph color="gray">{star.type} <br/>
                        {star.reservationTimes} Times !
                        </Paragraph>
                    </CardBody>
                </Card>
                ))}
            </div>
            {/* <DefaultFooter/> */}
        </Page>
        );
    }
}
export default Overview;