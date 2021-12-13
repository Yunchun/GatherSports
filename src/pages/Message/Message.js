import Page from 'components/login/Page';
import {Component} from "react";
import Card from '@material-tailwind/react/Card';
import CardBody from '@material-tailwind/react/CardBody';
import H3 from "@material-tailwind/react/Heading3";
import LeadText from "@material-tailwind/react/LeadText";
import axios from "axios";
import Background from 'assets/img/outlook.jpg';
import GatherSportNav from "../../components/GatherSportNav";
import Icon from "@material-tailwind/react/Icon";
import InputIcon from "@material-tailwind/react/InputIcon";
import Button from "@material-tailwind/react/Button";
const infoUrl = 'http://localhost:8080/message';

class Message extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allMsg: [],
            id: this.props.location.state.userid,
            title: "",
            content: ""
        }
        console.log(this.state.id);
    }

    async getAllMsg() {
        const allMsg = await axios.get(infoUrl + '/all');
        return allMsg;
    }

    async addMsg(title, content, id) {
        await axios.post(infoUrl + '/saveMsg/' + title + '/' + content + '/' + id);
        const allMsg = await this.getAllMsg();
        this.setState({
            allMsg: allMsg.data
        })
        console.log(this.state.allMsg)
    }

    async componentDidMount() {
        const allMsg = await this.getAllMsg();
        this.setState({
            allMsg: allMsg.data
        })
    }

    render() {
        return (
            <Page>
                <GatherSportNav userid={this.props.location.state.userid}/>
                <div 
                    style={{
                        width: '100%',
                        height: '2000px',
                        background:`url(${Background})`,
                        backgroundSize: 'cover',
                        position: "relative",
                        top: "-13px"
                    }}
                >
                    <div className="flex justify-center">
                        <div className="text-center my-8">
                            <H3 color="blue">Post Messages Here</H3>
                            <InputIcon
                                placeholder="title"
                                onChange={event => this.setState({title: event.target.value})}/>
                            <InputIcon
                                placeholder="Content"
                                onChange={event => this.setState({content: event.target.value})}/>
                        </div>
                    </div>
                    <div className="mb-2 flex items-center justify-center gap-2">
                        <Button
                            color="lightBlue"
                            ripple="light"
                            onClick=
                                {async () => {
                                    await this.addMsg(this.state.title, this.state.content, this.state.id);
                                }}>
                            Send
                        </Button>
                    </div>
                    <div className="flex justify-center">
                        <div className="text-center my-8">
                            {(!this.state.allMsg || this.state.allMsg.length === 0)?(<LeadText color="lightBlue">There is currently no messages. Please add some messages.</LeadText>):(
                                this.state.allMsg.map(msg => (
                                <Card className="msgCard">
                                    <CardBody>
                                        <H3 color="blue">{msg.title}</H3>
                                        <div className="mb-7 text-gray-700 flex items-center justify-center gap-2">
                                            <Icon name="face" size="3xl" color="indigo"/>
                                            {msg.firstName} {msg.lastName}
                                            <Icon name="email" size="3xl" color="orange"/>
                                            {msg.email}
                                            <Icon name="phone" size="3xl" color="teal"/>
                                            {msg.phone}
                                        </div>
                                        <div className="text-black-700 font-medium ">
                                            {msg.content}
                                        </div>
                                    </CardBody>
                                </Card>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </Page>
        )
    }
}
export default Message;
