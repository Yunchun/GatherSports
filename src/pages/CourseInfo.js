import Card from '@material-tailwind/react/Card';
import { Component } from 'react';
import CardImage from '@material-tailwind/react/CardImage';
import CardBody from '@material-tailwind/react/CardBody';
import Icon from '@material-tailwind/react/Icon';
import H4 from '@material-tailwind/react/Heading4';
import Button from "@material-tailwind/react/Button"
import LeadText from '@material-tailwind/react/LeadText';
import Page from 'components/login/Page';
import Sport from 'assets/img/sport.png';
import GatherSportNav from 'components/GatherSportNav';
import { EditText, EditTextarea } from 'react-edit-text';
import 'react-edit-text/dist/index.css';
import Rating from '@mui/material/Rating';
import axios from 'axios';
import Background from "../assets/img/blue.jpeg";


const courseURL = 'http://localhost:8080/course/';
const updateURL = 'http://localhost:8080/course/update/';


class CourseInfo extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            description: '',
            sportId: '',
            rating: '',
            teacherId:'',
            courseId: this.props.match.params.id,
            registered: false,
            userid: this.props.location.state.userid,
            editing: false
        }

        this.register = this.register.bind(this);
        this.updateRegisterState = this.updateRegisterState.bind(this);
        this.changeDesc = this.changeDesc.bind(this);
        this.edit = this.edit.bind(this);
        this.save = this.save.bind(this);
    }
    async getCouseInfo() {

        var course = await axios.get(courseURL + this.state.courseId);
        return course.data;
    }

    async componentDidMount() {
        // TODO
        var userid = this.state.userid;

        var course = await this.getCouseInfo();
        // make description a list of paragraphs
        var description = course.description.split(/\n/);

        this.setState({
            name: course.name,
            description: description,
            rating: course.rating,
            sportId: course.sportId,
            teacherId: course.teacherId,
            userid: userid,
        })
        await this.updateRegisterState();
    }
    async updateRegisterState() {
        // TODO
        var studentId = this.state.userid;
        var count = (await axios.get(courseURL + 'fetch/' + this.state.courseId + '/' + studentId)).data;
        var registered = count >= 1
        this.setState({
            registered: registered
        })
    }

    async register(event) {
        // TODO
        var studentId = this.state.userid;
        if (!this.state.registered) {
            await axios.post(courseURL + 'enroll/' + this.state.courseId + '/' + studentId);
            await this.updateRegisterState();
        }
    }

    edit(event) {
        this.setState({
            editing: !this.state.editing
        })
    }
    async save(event) {
        // concatenation desc and save it to the backend 
        const desc = this.state.description.join('\n');
        const name = this.state.name;
        await axios.put(updateURL+"desc/"+this.state.courseId, null, {
            params: {
                desc: desc
            }
        })
        await axios.put(updateURL+"title/"+this.state.courseId, null, {
            params: {
                title: name
            }
        })
        this.setState({
            editing: !this.state.editing
        })
    }

    changeDesc(event, i) {
        var description = this.state.description;
        description[i] = event.value;
        this.setState({
            description: description
        })
    }

    changeTitle(event) {
        this.setState({
            name: event.value
        })
    }

    render() {
        if (this.state.description.length === 0) {
            return (
                <Page>
                    <GatherSportNav userid={this.state.userid}/>
                    Loading...
                </Page>
            )
        }

        // student view / teacher view 
        return (
            <Page>
                <GatherSportNav userid={this.state.userid}/>
                <div className
                     style={{
                         width: '100%',
                         height: '2000%',
                         background:`url(${Background})`,
                         backgroundSize: 'cover',
                         position: "relative",
                         top: "-13px"
                     }}
                >
                <div className="flex flex-wrap items-center mt-10 mb-10">
                    <div className="w-full md:w-5/12 px-4 mx-auto">
                        <div className="text-blue-gray-800 p-3 text-center inline-flex items-center justify-center w-16 h-16 mb-6 shadow-lg rounded-full bg-white">
                            <Icon name="people" size="3xl" />
                        </div>

                        <H4 color="gray">
                            {this.state.editing?'':this.state.name}

                            <EditText defaultValue={this.state.name}
                                      style={{display: this.state.editing===false?"none":"block"}}
                                      onSave={(e) => this.changeTitle(e)}
                            />
                        </H4>


                        {this.state.description.map((desc,index) => (
                            <LeadText color="black" key={desc}>

                                {this.state.editing===false?desc:''}

                                <EditTextarea defaultValue={desc}
                                              style={{display: this.state.editing===false?"none":"block"}}
                                              onSave={(e) => this.changeDesc(e, index)}
                                />

                            </LeadText>
                        ))}

                    </div>

                    <div className="w-full md:w-4/12 px-4 mx-auto flex justify-center mt-24 lg:mt-0">
                        <Card>
                            <CardImage alt="Card Image" src={Sport} />
                            <CardBody>

                                <Rating name="read-only" value={this.state.rating} readOnly precision={0.1}/> {this.state.rating}
                                {parseInt(this.state.teacherId) === parseInt(this.state.userid)?
                                    this.state.editing?
                                        <Button
                                            className="register"
                                            color="green"
                                            buttonType="link"
                                            size="lg"
                                            rounded={false}
                                            block={false}
                                            iconOnly={false}
                                            ripple="dark"
                                            onClick={this.save}
                                        >
                                            Save<Icon name="save" />
                                        </Button>:
                                        <Button
                                            className="register"
                                            color="green"
                                            buttonType="link"
                                            size="lg"
                                            rounded={false}
                                            block={false}
                                            iconOnly={false}
                                            ripple="dark"
                                            onClick={this.edit}
                                        >
                                            Edit<Icon name="edit" />
                                        </Button>:
                                    this.state.registered?<Button
                                        className="register"
                                        color="grey"
                                        buttonType="link"
                                        size="lg"
                                        rounded={false}
                                        block={false}
                                        iconOnly={false}
                                        ripple="dark"
                                    >
                                        Registered<Icon name="favorite" />
                                    </Button>:<Button
                                        className="register"
                                        color="lightBlue"
                                        buttonType="link"
                                        size="lg"
                                        rounded={false}
                                        block={false}
                                        iconOnly={false}
                                        ripple="dark"
                                        onClick={this.register}
                                    >
                                        Register<Icon name="favorite" />
                                    </Button>}


                            </CardBody>
                        </Card>
                    </div>
                </div>
                </div>
            </Page>
        );
    }
}

export default CourseInfo;