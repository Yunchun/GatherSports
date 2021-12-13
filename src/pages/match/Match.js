import { Component } from 'react';
import React from "react";
import Card from '@material-tailwind/react/Card';
import CardImage from "@material-tailwind/react/CardImage";
import CardBody from '@material-tailwind/react/CardBody';
import Paragraph from '@material-tailwind/react/Paragraph';
import H6 from "@material-tailwind/react/Heading6";
import Dropdown from "@material-tailwind/react/Dropdown"
import DropdownItem from "@material-tailwind/react/DropdownItem"
import Input from "@material-tailwind/react/Input";
import Quote from "@material-tailwind/react/Quote"
import Button from "@material-tailwind/react/Button"
import LeadText from "@material-tailwind/react/LeadText";
import GatherSportNav from 'components/GatherSportNav';
import fakeProfile from 'assets/img/sport_girl.png';
import Page from 'components/login/Page';

import axios from 'axios';
import './styles.match.css';

const baseURL = 'http://localhost:8080/match';
const infoURL = 'http://localhost:8080/profile';


class Match extends Component {
    constructor(props) {
        super(props);
        // TODO
        this.state = {
            mates: [],
            age: '', 
            gender: '', 
            major: '',
            username: '',
            userid: this.props.location.state.user,
            friends: {}
        }
        // console.log(this.props)

        this.onAgeChange = this.onAgeChange.bind(this);
        this.onGenderChange = this.onGenderChange.bind(this);
        this.onMajorChange = this.onMajorChange.bind(this);
        this.searchByName = this.searchByName.bind(this);
    }
    async getUser(id) {
        var result = await axios.get(infoURL+'/'+id);
        // console.log(result.data[0].firstName + ' ' + result.data[0].lastName)
        this.setState({
            username: result.data[0].firstName + ' ' + result.data[0].lastName
        })
    }

    async getMates(search) {
        // TODO
        const id = this.props.location.state.user;
        // console.log(this.props.location.state.user);
        const mate_ids = await axios.get(baseURL+'/mates', 
            {
            params: {
                id: id,
                age: this.state.age, 
                gender: this.state.gender,
                major: this.state.major,
                search: search,
            }
        });
        const mates_info = [];
        
        for (const mate_id of mate_ids.data) {
            var result = await axios.get(infoURL+'/'+mate_id);
            mates_info.push(result.data[0]);
        }
        // console.log(mates_info);
        return mates_info;
    }

    async componentDidMount() {
        const mates = await this.getMates();
        await this.getUser(this.state.userid); // TODO
        await this.fetchReqSend();
        
        this.setState({
            mates: mates,
        });
    }

    async onAgeChange(val) {
        // console.log(`Change age param to ${val}`);

        this.setState({ age: val }, async () => {
            const mates = await this.getMates();
            this.setState({
                mates: mates,
            });
        })
    }

    async onGenderChange(val) {
        // console.log(`Change gender param to ${val}`);

        this.setState({ gender: val }, async () => {
            const mates = await this.getMates();
            this.setState({
                mates: mates,
            });
        })
    }

    async onMajorChange(val) {
        console.log(`Change major param to ${val}`);

        this.setState({ major: val }, async () => {
            const mates = await this.getMates();
            this.setState({
                mates: mates,
            });
        })
    }

    // async searchByName(event) {
    //     const text = event.target.value;
    //     const mates = await this.getMates();
    //     // filter the mates 
    //     const new_mates = mates.filter(mate => (mate.firstName + ' ' + mate.lastName).toLowerCase().indexOf(text) !== -1);
    //     this.setState({
    //         mates: new_mates,
    //     })

    // }

    async searchByName(event) {
        const text = event.target.value;

        const mates = await this.getMates(text);
        this.setState({
            mates: mates,
        })
    }

    async addFriend(receiverEmail) {
        // TODO
        await axios.post(baseURL + '/addfriend/', null,
        {
            params: {
                receiverEmail: receiverEmail,
                requestid: this.state.userid
            }
        });
    }

    async fetchReqSend() {
        const friendArr = (await axios.get(baseURL + "/reqSent/" + this.state.userid)).data;
        const friendDict = {};
        for (const f of friendArr) {
            friendDict[f.receiverid] = f.state;
        }
        console.log(friendDict);

        this.setState({
            friends: friendDict
        })
    }

    switchcase(id, email) {
        if (id in this.state.friends) {
            if (this.state.friends[id] === "Wait") {
                return (<Quote color="lightBlue" >
                        Request Sent
                        </Quote>)
            } else if (this.state.friends[id] === 'Rej') {
                return (<Quote color="blueGray" >
                 Rejected
                </Quote>);
            } 
            return (<Quote color="green" >
                Already Friends
                </Quote>);
        }
        return (
            <Button
            className="add-friend"
            color="lightBlue"
            buttonType="link"
            size="lg"
            rounded={false}
            block={false}
            iconOnly={false}
            ripple="dark"
            onClick={() =>{this.addFriend(email)}}
            >Add Friend</Button>
        )
    }

    render() {

        return (
            <Page> 
                <GatherSportNav userid={this.state.userid}/>
                <div className='filters'>

                <Dropdown
                    color="lightBlue"
                    placement="bottom-start"
                    buttonText="Age"
                    buttonType="link"
                    size="regular"
                    rounded={false}
                    block={false}
                    ripple="dark"
                >
                    <DropdownItem color="lightBlue" ripple="light" onClick={() => this.onAgeChange('similar')}>
                        Similar 
                    </DropdownItem>
                    <DropdownItem color="lightBlue" ripple="light" onClick={() => this.onAgeChange('nolimit')}>
                        No Limit
                    </DropdownItem>
                </Dropdown>

                <Dropdown
                    color="lightBlue"
                    placement="bottom-start"
                    buttonText="Gender"
                    buttonType="link"
                    size="regular"
                    rounded={false}
                    block={false}
                    ripple="dark"
                >
                    <DropdownItem color="lightBlue" ripple="light" onClick={() => this.onGenderChange('same')}>
                        Same 
                    </DropdownItem>
                    <DropdownItem color="lightBlue" ripple="light" onClick={() => this.onGenderChange('diff')}>
                        Different
                    </DropdownItem>
                    <DropdownItem color="lightBlue" ripple="light" onClick={() => this.onGenderChange('')}>
                        No Limit
                    </DropdownItem>
                </Dropdown>
                
                <Dropdown
                    color="lightBlue"
                    placement="bottom-start"
                    buttonText="Major"
                    buttonType="link"
                    size="regular"
                    rounded={false}
                    block={false}
                    ripple="dark"
                >
                    <DropdownItem color="lightBlue" ripple="light" onClick={() => this.onMajorChange('same')}>
                        Same 
                    </DropdownItem>
                    <DropdownItem color="lightBlue" ripple="light" onClick={() => this.onMajorChange('diff')}>
                        Different
                    </DropdownItem>
                    <DropdownItem color="lightBlue" ripple="light" onClick={() => this.onMajorChange('')}>
                        No Limit
                    </DropdownItem>
                </Dropdown>

                <Input
                    type="text"
                    color="lightBlue"
                    size="lg"
                    outline={false}
                    placeholder="Search by user name"
                    onChange={this.searchByName}
                />

                </div>

                <div className='mateSection'>
                {(!this.state.mates || this.state.mates.length === 0)?(<LeadText color="lightBlue">There is currently no recommendation based on your record. Please fill out more information or remove some filter for better recommendation.</LeadText>):(
                    this.state.mates.map(mate => (
                        <Card key={mate.email} className="mateCard">
                            <CardImage className="mateImage" alt="Card Image" src={fakeProfile} />
                            <CardBody>
                                <H6 color="gray">{mate.firstName} {mate.lastName}</H6>
                                <Paragraph color="blueGray">
                                {mate.gender==='M'?'Male':'Female'} &nbsp;&nbsp;

                                {mate.age}
                                </Paragraph>
                                
                            </CardBody>
                            {this.switchcase(mate.userId, mate.email)}
                            
                            
                            {/* // {mate.userId in this.state.friends?
                            // this.state.friends[mate.userId].state === "Wait"?
                            // "Request Sent"
                            // :this.state.friends[mate.userId].state === "Rej"?
                            // "Rejected":
                            // "Already Friend"
                            // :
                            // } */}
                            
                    </Card>
                    ))

                )}
                </div>

                 
            
            </Page>
        );
    }
}
export default Match;