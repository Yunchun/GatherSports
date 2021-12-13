import Card from '@material-tailwind/react/Card';
import CardHeader from '@material-tailwind/react/CardHeader';
import CardBody from '@material-tailwind/react/CardBody';
import H5 from '@material-tailwind/react/Heading5';
import InputIcon from '@material-tailwind/react/InputIcon';
import Button from '@material-tailwind/react/Button';
import Page from 'components/login/Page';
import Container from 'components/login/Container';
import axios from "axios";
import {Component} from "react";
import {Link} from "react-router-dom";
import Background from "../assets/img/swim.jpg";
const infoUrl = 'http://localhost:8080/login';

async function getUserId(eml, pwd) {
    // TODO: change email, password to props later
    const email = eml;
    const password = pwd;
    const user_info = await axios.get(infoUrl +'/' + email + '/' + password);
    return user_info.data;
}


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            info: "",
            email: "",
            password: "",
            click: 0
        }
        this.getId = this.getId.bind(this);
    }

    async getId(email, pwd) {
        const info = await getUserId(email, pwd);
        if (info !== "email or password is wrong") {
            this.setState({
                info: info,
                click: 1
            });
        }
        // console.log(this.state.info)
    }

    render() {
        const ConditionalLink = ({ children, condition}) => (condition)
            ? <Link to={{
                pathname:'/profile',
                state:{
                    userid:this.state.info
                }
            }}>{children}</Link>
            : <>{children}</>;
        return (
            <Page>
                <div
                    style={{
                        width: '100%',
                        height: '800px',
                        background:`url(${Background})`,
                        backgroundSize: 'cover'
                    }}
                >
                    <Container>
                        <div className="flex justify-center">
                            <div className="text-center my-8">
                                <Card>
                                    <CardHeader color="lightBlue" size="lg">
                                        <H5 color="white" style={{marginBottom: 0}}>Login</H5>
                                    </CardHeader>
                                    <H5 color="black">{(this.state.info === "")?'Enter Right Password':''}</H5>
                                    <H5 color="black">{(this.state.info !== "")?'Welcome Back':''}</H5>
                                    <CardBody>
                                        <div className="text-left my-8">
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
                                        <div className="mb-2 flex items-center justify-center gap-2">
                                            <ConditionalLink to="/profile" condition={this.state.info !== ""}><Button
                                                color="lightBlue"
                                                buttonType="link"
                                                size="lg"
                                                ripple="dark"
                                                onClick={async () => {
                                                    await this.getId(this.state.email, this.state.password);
                                                }}
                                            >
                                                Get Started
                                            </Button></ConditionalLink>
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
export default Login;
