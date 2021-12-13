import Card from '@material-tailwind/react/Card';
import CardHeader from '@material-tailwind/react/CardHeader';
import CardBody from '@material-tailwind/react/CardBody';
import H5 from '@material-tailwind/react/Heading5';
import InputIcon from '@material-tailwind/react/InputIcon';
import Button from '@material-tailwind/react/Button';
import Background from "../assets/img/sport.jfif";
import Page from 'components/login/Page';
import Container from 'components/login/Container';
import axios from "axios";
import {Component} from "react";
import {Link} from "react-router-dom";
const infoUrl = 'http://localhost:8080/register/saveUser';

async function getRegisInfo(fstName, eml, pwd) {
    const firstName = fstName;
    const email = eml;
    const password = pwd;
    // console.log(`${firstName} ${email} ${password}`);
    const regis_info = await axios.post(infoUrl +'/' + firstName + '/' + email + '/' + password);
    return regis_info.data;
}
class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            info: "",
            firstName: "",
            email: "",
            password: "",
            click: 0
        }
    }

    async getInfo(firstName, email, password) {
        const info = await getRegisInfo(firstName, email, password);
        this.setState({
            info: info,
            click: 1
        });
    }

    render() {
        return (
            <Page>
                <div
                    style={{
                        width: '100%',
                        height: '800%',
                        background:`url(${Background})`,
                        backgroundSize: 'cover'
                    }}
                >
                    <Container>
                        <div className="flex justify-center">
                            <div className="text-center my-8">
                                <Card>
                                    <CardHeader color="lightBlue">
                                        <H5 color="white" style={{marginBottom: 0}}>Register</H5>
                                    </CardHeader>
                                    <H5 color="black">{(this.state.info === "user with such email already exists"&& this.state.click===1)?'User With This Email Already Exists':''}</H5>
                                    <H5 color="black">{(this.state.info !== "user with such email already exists"&& this.state.click===1)?'Registration Success':''}</H5>
                                    <CardBody>
                                        <div className="text-left my-8">
                                            <InputIcon
                                                type="text"
                                                color="lightBlue"
                                                placeholder="Name"
                                                iconName="account_circle"
                                                onChange={event => this.setState({firstName: event.target.value})}
                                            />
                                            <InputIcon
                                                type="email"
                                                color="lightBlue"
                                                placeholder="Email Address"
                                                iconName="email"
                                                onChange={event => this.setState({email: event.target.value})}
                                            />
                                            <InputIcon
                                                type="password"
                                                color="lightBlue"
                                                placeholder="Password"
                                                iconName="lock"
                                                onChange={event => this.setState({password: event.target.value})}
                                            />
                                        </div>
                                        <div className="flex justify-center">
                                            <Button
                                                color="lightBlue"
                                                buttonType="link"
                                                size="lg"
                                                ripple="dark"
                                                onClick={async () => {
                                                    await this.getInfo(this.state.firstName, this.state.email, this.state.password);
                                                }}
                                            >
                                                Register
                                            </Button>
                                            <Link to="/login"><Button
                                                color="lightBlue"
                                                buttonType="link"
                                                size="lg"
                                                ripple="dark"
                                                >
                                                Login
                                            </Button></Link>
                                        </div>
                                    </CardBody>
                                </Card>
                            </div>
                        </div>
                    </Container>
                </div>
            </Page>
        );
    }
}
export default Register;
