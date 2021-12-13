import { Component } from 'react';
import React from "react";
import { Link } from 'react-router-dom';
import Card from "@material-tailwind/react/Card";
import CardImage from "@material-tailwind/react/CardImage";
import CardBody from "@material-tailwind/react/CardBody";
import H6 from "@material-tailwind/react/Heading6";
import Paragraph from "@material-tailwind/react/Paragraph";
import './styles.teacherOverview.css';
import GatherSportNav from 'components/GatherSportNav';
import axios from 'axios';
import Page from 'components/login/Page';
import Moment from 'moment'
import Button from "@material-tailwind/react/Button";
import H1 from "@material-tailwind/react/Heading1";
import Training from 'assets/img/Training.jpg';
import CardFooter from '@material-tailwind/react/CardFooter';
import TrainingCourse from 'assets/img/TrainingCourse.jpg';
import Background from "assets/img/sky.jpg";


import emailjs from 'emailjs-com';
import{ init } from 'emailjs-com';
const teacheroverviewURL = 'http://localhost:8080/teacher';
// send request to back-end for getting reservation of specific userid
function sendEmail(student_name, teacher_name, location, begin_time_insert,end_time_insert) {
    init("user_TcaKIkCvpvX6KiytTdPXA");
    //e.preventDefault();    //This is important, i'm not sure why, but the email won't send without it
    var templateParams = {
        to_name: student_name,
        teacher_name: teacher_name,
        location: location,
        begin_time:begin_time_insert,
        end_time: end_time_insert
    };

    emailjs.send('service_txgagqb', 'template_avndi0k', templateParams)
        .then(function(response) {
            console.log('SUCCESS!', response.status, response.text);
        }, function(error) {
            console.log('FAILED...', error);
        });
}

// send request to back-end for getting sportstar for all reservations
async function getAppointment_Accept(id){
    console.log(id);
    const appointmentsAccept = await axios.get(teacheroverviewURL + "/appointment" + "/T",{
        params:{
            teacherid: id
        }
    })
    console.log(appointmentsAccept);
    return appointmentsAccept;
}

async function getAppointment_Waiting(id){
    const appointmentWaiting = await axios.get(teacheroverviewURL + "/appointment" + "/F",{
        params:{
            teacherid: id
        }
    })

    return appointmentWaiting;
}

async function getCourse(id){
    const courses = await axios.get(teacheroverviewURL + "/course" , {
        params:{
            teacherId: id
        }
    })
    console.log(courses);
    return courses;
}


class TeacherOverview extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            id: this.props.location.state.id,
            appointments_accept: [],
            appointments_waiting: [],
            courses: []
        })
    }
    // send deleting request to back-end for canceling specific reservation
    async refuseAppointment(appointmentid_delete){

        await axios.delete(teacheroverviewURL + "/appointment/cancel/" + appointmentid_delete);

        var pos = 0
        for (var i = 0; i < this.state.appointments_waiting.length; i++) {
            if (this.state.appointments_waiting.appointmentId === appointmentid_delete){
                pos = i
                // traverse all the positions, find position of canceled reservation
            }
        }
        this.state.appointments_waiting.splice(pos,1)
        this.setState({
        });

    }

    async acceptAppointment(appointment_accept){
        //send put request to back-end to delete appointment in database
        await axios.put(teacheroverviewURL + "/appointment/accept/" + appointment_accept);

        //delete front-end elements in appointments_waiting
        var pos = 0
        for (var i = 0; i < this.state.appointments_waiting.length; i++) {
            if (this.state.appointments_waiting.appointmentId === appointment_accept){
                pos = i
                // traverse all the positions, find position of canceled reservation
            }
        }
        console.log(this.state.appointments_waiting[pos]);
        sendEmail(this.state.appointments_waiting[pos].studentName, this.state.appointments_waiting[pos].teacherName,
            this.state.appointments_waiting[pos].location, this.state.appointments_waiting[pos].time);

        this.state.appointments_waiting.splice(pos,1)

        this.setState({
            appointments_accept: await (await getAppointment_Accept(this.state.id)).data
        });
    }

    async componentDidMount(){
        // extract params from url
        // let search = window.location.search;
        // let params = new URLSearchParams(search);
        // let id = params.get('id');
        // console.log(id);
        // call two functions and render the page
        this.setState({
            appointments_waiting: await (await getAppointment_Waiting(this.state.id)).data,
            appointments_accept: await (await getAppointment_Accept(this.state.id)).data,
            courses: await (await getCourse(this.state.id)).data
        });

    }

    render() {
        if (!this.state.appointments_accept) {
            return <div>Loading</div>
        }
        return (
            <Page>
                <GatherSportNav userid={this.state.id}/>
                <div className = "bg"
                     style={{
                         width: '100%',
                         height: '2000px',
                         background:`url(${Background})`,
                         backgroundSize: 'cover',
                     }}
                >

                    <div className="splitLine">
                        <H1 color="indigo">Accepted Appointment</H1>
                    </div>
                    <div className="teacherOverviewSection">
                        {this.state.appointments_accept.map(appointment => (
                            <Card key={appointment.location} className="reservationCard">
                                <CardImage className="mateImage" src={Training} alt="Card Image"/>

                                <CardBody>
                                    <H6 color="gray">{Moment(appointment.time).format("DD-MMM-YYYY HH:mm:ss")}</H6>
                                    <Paragraph color="gray">
                                        {appointment.studentName}
                                    </Paragraph>
                                </CardBody>
                            </Card>
                        ))}
                    </div>

                    <div className="splitLine">
                        <H1 color="indigo">Waiting Appointment</H1>
                    </div>
                    <div className="teacherOverviewSection">
                        {this.state.appointments_waiting.map(appointment => (
                            <Card key={appointment.location} className="reservationCard">
                                <CardImage className="mateImage" src={Training} alt="Card Image"/>

                                <CardBody>
                                    <H6 color="gray">{Moment(appointment.time).format("DD-MMM-YYYY HH:mm:ss")}</H6>
                                    <Paragraph color="gray">
                                        {appointment.studentName}
                                    </Paragraph>
                                </CardBody>
                                <CardFooter>
                                    <div className="buttonGroup">
                                        <div className="acceptButton">

                                            <Button buttonType="filled"
                                                    color="green"
                                                    buttonType="filled"
                                                    size="regular"
                                                    rounded={true}
                                                    block={false}
                                                    iconOnly={false}
                                                    ripple="light"
                                                    onClick={async() => {await this.acceptAppointment(appointment.appointmentId)}}>
                                                Accept
                                            </Button>
                                        </div>
                                        <div className="refuseButton">
                                            <Button buttonType="filled"
                                                    color="red"
                                                    buttonType="filled"
                                                    size="regular"
                                                    rounded={false}
                                                    block={false}
                                                    iconOnly={false}
                                                    onClick={async()=> {
                                                        await this.refuseAppointment(appointment.appointmentId)
                                                    }}
                                                    ripple="light">
                                                Refuse
                                            </Button>
                                        </div>
                                    </div>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                    <div className="splitLine">
                        <H1 color="indigo">Courses</H1>
                    </div>
                    <div className="teacherOverviewSection">
                        {this.state.courses.map(course => (
                            <Card key={course} className="reservationCard">
                                <CardImage className="mateImage" src={TrainingCourse} alt="Card Image"/>

                                <CardBody>
                                    <H6 color="gray">{course.name}</H6>
                                    <Paragraph color="gray">
                                        {course.date} &nbsp; {course.time}
                                    </Paragraph>
                                </CardBody>
                                <div className="detailButton">
                                    <Link to={{
                                        pathname: "/course/" + course.courseId,
                                        state:{
                                            userid:this.state.id
                                        }
                                    }}>
                                        <Button color="lightGreen"
                                                buttonType="outline"
                                                size="lg"
                                                rounded={false}
                                                block={false}
                                                iconOnly={false}
                                                ref={"/course/"+course.courseId}
                                                ripple="light">
                                            view details
                                        </Button>
                                    </Link>
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>
            </Page>
        );
    }
}
export default TeacherOverview;