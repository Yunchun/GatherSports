import Button from '@material-tailwind/react/Button';
import Image from '@material-tailwind/react/Image';
import H3 from '@material-tailwind/react/Heading3';
import H1 from "@material-tailwind/react/Heading1";
import Page from 'components/login/Page';
import Icon from '@material-tailwind/react/Icon';
import ProfilePicture from 'assets/img/profile.jpg';
import Background from 'assets/img/blue.jpeg';
import {Component} from "react";
import axios from "axios";
import InputIcon from "@material-tailwind/react/InputIcon";

const infoUrl = 'http://localhost:8080/profile';

async function getContInfo(id) {
    const userId = id;
    const prof_info = await axios.get(infoUrl +'/' + userId);
    return prof_info.data;
}

async function updContInfo(paths, param, id) {
    const prof_info = await axios.put(infoUrl + paths + param + '/' + id);
    return prof_info.data;
}

class Content extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: "",
            lastName: "",
            lstNm: "",
            gender: "",
            gd: "",
            age: 0,
            ag: "",
            phone: "",
            ph: "",
            location: "",
            loc: "",
            email: "",
            type: "",
            typ: "",
            id: this.props.userid,
        }
    }

    async getCnInfo(id) {
        // console.log(id)
        const info = await getContInfo(id);
        // console.log(info)
        this.setState({
            firstName: info[0].firstName,
            lastName: info[0].lastName,
            gender: info[0].gender,
            age: info[0].age,
            phone: info[0].phone,
            location: info[0].location,
            email: info[0].email,
            type: info[0].type
        });
    }

    async updCnInfo(paths, param, id) {
        await updContInfo(paths, param, id);
        if (paths === '/updateName/') {
            this.setState({
                lstNm: param
            });
        }
        else if (paths === '/updateGender/') {
            this.setState({
                gd: param
            });
        }
        else if (paths === '/updateAge/') {
            this.setState({
                ag: param
            });
        }
        else if (paths === '/updatePhone/') {
            this.setState({
                ph: param
            });
        }
        else if (paths === '/updateLocation/') {
            this.setState({
                loc: param
            });
        }
        else if (paths === '/updateUserType/') {
            this.setState({
                typ: param
            });
        }
    }

    async updInfo(paths, param, id) {
        await this.updCnInfo(paths, param, id);
        if (paths === '/updateName/') {
            this.setState({
                lastName: param
            });
        }
        else if (paths === '/updateGender/') {
            this.setState({
                gender: param
            });
        }
        else if (paths === '/updateAge/') {
            this.setState({
                age: param
            });
        }
        else if (paths === '/updatePhone/') {
            this.setState({
                phone: param
            });
        }
        else if (paths === '/updateLocation/') {
            this.setState({
                location: param
            });
        }
        else if (paths === '/updateUserType/') {
            this.setState({
                type: param
            });
        }
    }

     async componentDidMount() {
        await this.getCnInfo(this.props.userid);
     }

    render() {
        // console.log(this.props);
        return (
            <Page>
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
                    <div className="flex flex-wrap justify-center">
                        <div className="text-center my-8">
                            <Image
                                src={ProfilePicture}
                                alt="Profile picture"
                                rounded
                            />
                            <H1 color="blue">Your Profile Info</H1>
                            <H3 color="blue">{this.state.firstName}</H3>
                            <H3 color="blue">{this.state.lastName}</H3>
                            <div className="mb-2 flex items-center justify-center gap-2">
                                <Button
                                    color="lightBlue"
                                    ripple="light"
                                    onClick=
                                        {async () => {
                                            await this.updInfo("/updateName/",this.state.lstNm, this.state.id);
                                        }}>
                                    Update Last Name
                                </Button>
                            </div>
                            <InputIcon
                                iconName="face"
                                placeholder="LastName"
                                onChange={event => this.setState({lstNm: event.target.value})}/>
                            <div className="mb-2 text-orange-800 font-medium flex items-center justify-center gap-2">
                                <Icon name="location_city" size="3xl"/>
                                {this.state.location}
                            </div>
                            <div className="mb-2 flex items-center justify-center gap-2">
                                <Button
                                    color="orange"
                                    ripple="light"
                                    onClick=
                                        {async () => {
                                            await this.updInfo("/updateLocation/",this.state.loc, this.state.id);
                                        }}>
                                    Update Location
                                </Button>
                            </div>
                            <InputIcon
                                iconName="location_city"
                                placeholder="location"
                                onChange={event => this.setState({loc: event.target.value})}/>
                            {/* <div className="mb-2 text-indigo-800 font-medium flex items-center justify-center gap-2">
                                <Icon name="security" size="3xl"/>
                                UserId: {this.state.id}
                            </div> */}
                            <div className="mb-2 text-purple-800 font-medium flex items-center justify-center gap-2">
                                <Icon name="email" size="3xl"/>
                                {this.state.email}
                            </div>
                            <div className="mb-2 text-0.8xl font-medium flex items-center justify-center gap-2">
                                <Icon name="phone" size="3xl"/>
                                {this.state.phone}
                            </div>
                            <div className="mb-2 flex items-center justify-center gap-2">
                                <Button
                                    color="green"
                                    ripple="light"
                                    onClick=
                                        {async () => {
                                            await this.updInfo("/updatePhone/",this.state.ph, this.state.id);
                                        }}>
                                    Update Phone
                                </Button>
                            </div>
                            <InputIcon
                                iconName="phone"
                                placeholder="phone"
                                onChange={event => this.setState({ph: event.target.value})}/>
                            <div className="mb-2 text-0.8xl font-medium flex items-center justify-center gap-2">
                                <Icon name="perm_identity" size="3xl"/>
                                {this.state.gender==="F"?"Female":"Male"}
                            </div>
                            <div className="mb-2 flex items-center justify-center gap-2">
                                <Button
                                    color="green"
                                    ripple="light"
                                    onClick=
                                        {async () => {
                                            await this.updInfo("/updateGender/",this.state.gd, this.state.id);
                                        }}>
                                    Update Gender
                                </Button>
                            </div>
                            <InputIcon
                                iconName="perm_identity"
                                placeholder="gender"
                                onChange={event => this.setState({gd: event.target.value})}/>
                            <div className="mb-2 text-0.8xl font-medium flex items-center justify-center gap-2">
                                <Icon name="assignment_ind" size="3xl"/>
                                {this.state.type==="S"?"Student":"Teacher"}
                            </div>
                            <div className="mb-2 flex items-center justify-center gap-2">
                                <Button
                                    color="green"
                                    ripple="light"
                                    onClick=
                                        {async () => {
                                            await this.updInfo("/updateUserType/",this.state.typ, this.state.id);
                                        }}>
                                    Update User Type
                                </Button>
                            </div>
                            <InputIcon
                                iconName="assignment_ind"
                                placeholder="user type"
                                onChange={event => this.setState({typ: event.target.value})}/>
                            <div className="mb-2 text-0.8xl font-medium flex items-center justify-center gap-2">
                                <Icon name="cake" size="3xl"/>
                                {this.state.age}
                            </div>
                            <div className="mb-2 flex items-center justify-center gap-2">
                                <Button
                                    color="green"
                                    ripple="light"
                                    onClick=
                                        {async () => {
                                            await this.updInfo("/updateAge/",this.state.ag, this.state.id);
                                        }}>
                                    Update Age
                                </Button>
                            </div>
                            <InputIcon
                                iconName="cake"
                                placeholder="age"
                                onChange={event => this.setState({ag: event.target.value})}/>
                        </div>
                    </div>
                </div>
            </Page>
        );
    }
}
export default Content;
