import { Component } from 'react';
import React from "react";
import { Link } from 'react-router-dom';
import './styles.courseSearch.css';
import TeamSection from 'components/landing/TeamSection';
import GatherSportNav from 'components/GatherSportNav';
import axios from 'axios';
import Page from 'components/login/Page';
import Button from "@material-tailwind/react/Button";
import Dropdown from "@material-tailwind/react/Dropdown"
import Icon from "@material-tailwind/react/Icon";
import H6 from '@material-tailwind/react/Heading6';
import LeadText from '@material-tailwind/react/LeadText';
import DropdownLink from "@material-tailwind/react/DropdownLink"



const courseURL = 'http://localhost:8080/coursesearch';
const sportURL = "http://localhost:8080/sport"

async function getSports(){
    console.log("get sport list");
    const sportList = await axios.get(sportURL);

    return sportList;
}


async function findAllCourse(){
    const courseListAll = await axios.get(courseURL + "/all");

    console.log(courseListAll);
    return courseListAll;
}

class CourseSearch extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            id: this.props.location.state.id,
            courseList: [],
            sportList: []
        })
        console.log(this.props.location.state.id)
    }
    // recommend courses by user's hobby
    async recommendCourseByHobby(userid){

        const courseListHobby = await axios.get(courseURL + "/hobby",{
            params:{
                id: userid
            }
        });
        this.setState({    
            courseList: courseListHobby.data  
        });
    }
    // recommend courses by user's mates' enrollments
    async recommendCourseByMates(userid){

        const courseListMates = await axios.get(courseURL + "/mates",
            {
                params:{
                    id : userid
                }
    
        });
    
        this.setState({
            courseList: courseListMates.data  
        })
    
    }
    // recommend courses by sports name
    async recommendCourseBySport(sportId){

        const courseListSport = await axios.get(courseURL + "/sport", {
            params:{
                sportId: sportId
            }
        });
        this.setState({
            courseList: courseListSport.data  
        })
    
    }
    async componentDidMount(){
        // extract params from url
        // let search = window.location.search;
        // let params = new URLSearchParams(search);
        // let id = params.get('id');
        // console.log(id);

        // call two functions and render the page
        // this.state.id = id;
        this.setState({
            sportList: await (await getSports()).data,
            courseList: await (await findAllCourse()).data
        });
    }

    render() {
        // console.log(this.state.reservations);
        // if (!this.state.reservations || this.state.reservations.length === 0) {
        //     return <div> Loading...</div>
        // }
        return (
            <Page> 
                
                <GatherSportNav userid={this.state.id}/>

                <TeamSection/>
                
                {/* <div className="Header">
        <H2 color="indigo">Select Your Course</H2>

</div> */}
            
            <div className="MateSelection">
                <Button
                    color="indigo"
                    buttonType="filled"
                    size="regular"
                    rounded={false}
                    block={false}
                    iconOnly={false}
                    ripple="light"
                    onClick={async()=> {
                        await this.recommendCourseByMates(this.state.id)
                        }}
                >
                    Sport mates
                </Button>
                <div className="HobbySelection">
                    <Button
                        color="indigo"
                        buttonType="filled"
                        size="regular"
                        rounded={false}
                        block={false}
                        iconOnly={false}
                        ripple="light"
                        onClick={async()=> {
                            await this.recommendCourseByHobby(this.state.id)
                        }}
                    >
                        hobby
                    </Button>
                </div>

            </div> 

                <div className="TypeSelection">
                    <Dropdown
                        color="indigo"
                        placement="bottom-start"
                        buttonText="Choose a sport"
                        buttonType="filled"
                        size="regular"
                        rounded={false}
                        block={false}
                        ripple="light"
                    >
                        {this.state.sportList.map(sport=>(
                            <DropdownLink
                            href="#"
                            color="lightBlue"
                            ripple="light"
                            onClick={async()=> {
                                await this.recommendCourseBySport(sport.sportId)
                                }}
                        >
                            {sport.sportName}
                        </DropdownLink>
                        ))}                      
                    </Dropdown>   
                </div>  
                <div height="500px">
                    <br></br>
                    
                </div>   

                <div className="courseList">
                    <div className="courseTitle">
                            <H6>Course Title</H6>
                    </div>
                    <div className="courseRating">
                            <H6>Rating</H6>
                    </div>
                    <div className="courseLink">
                    <H6>Link</H6>
                    </div>
                </div>
                <div>
                    {this.state.courseList.map((course)=> (
                        <div className="courseList">
                        <div className="courseTitle"><LeadText color="blue">{course.name}</LeadText>
                        </div>
                    <div className="courseRating"><LeadText color="lightBlue">{course.rating}</LeadText></div>
                    <div className="courseLink">
                    <Link to={
                        {
                            pathname:"course/" + course.courseId,
                            state: {
                                userid: this.state.id
                            }
                        }
                        }>
                    <Button
                        color="red"
                        buttonType="link"
                        size="regular"
                        rounded={true}
                        block={false}
                        iconOnly={true}
                        ripple="dark"
                        href={"course/" + course.courseId}
                    >
                        <Icon name="favorite" size="sm" />
                    </Button>
                    </Link>
                    </div>
                    </div>
                    ))}
                </div>
                </Page>
                

        );
    }
}
export default CourseSearch;