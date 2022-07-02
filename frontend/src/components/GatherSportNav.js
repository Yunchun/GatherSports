import { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@material-tailwind/react/Navbar';
import NavbarContainer from '@material-tailwind/react/NavbarContainer';
import NavbarWrapper from '@material-tailwind/react/NavbarWrapper';
import NavbarBrand from '@material-tailwind/react/NavbarBrand';
import NavbarToggler from '@material-tailwind/react/NavbarToggler';
import NavbarCollapse from '@material-tailwind/react/NavbarCollapse';
import Dropdown from '@material-tailwind/react/Dropdown';
import Button from "@material-tailwind/react/Button"
import DropdownItem from '@material-tailwind/react/DropdownItem';
import { useEffect } from 'react';
import Nav from '@material-tailwind/react/Nav';
import NavLink from '@material-tailwind/react/NavLink';
import Icon from '@material-tailwind/react/Icon';
import axios from 'axios';

async function getNotification(userid) {
    var baseURL = "http://localhost:8080/match/mateRequest/";
    var notifications = await axios.get(baseURL+userid);
    return notifications.data;
}

async function getNotificationName(ids) {
    const names = [];
    var baseURL = 'http://localhost:8080/profile/';
    for (const id of ids) {
        let res = (await axios.get(baseURL+id)).data;
        let name = res[0]['firstName'] + ' ' + res[0]['lastName'];
        names.push(name);
    }
    return names;
}

async function getIsTeacher(id) {
    var baseURL = 'http://localhost:8080/profile/';
    const info = (await axios.get(baseURL+id)).data[0];
    return info.type==='T';
}


export default function GatherSportNav({userid}) {
    const updateURL = "http://localhost:8080/match/updateState"
    const [openNavbar, setOpenNavbar] = useState(false);
    if (!userid || userid.length===0) {
        userid = "24";
    }


    const [notificationId, setNotificationId] = useState('');
    const [notificationName, setNotificationName] = useState('');
    const [isTeacher, setIsTeacher] = useState(false);

    useEffect(() => {
    if (!isTeacher) {
        setTeacher();
    }
    if (!notificationId) {
        get();
    }
    });

  const get = async () => {
    const ids = await getNotification(userid);
    setNotificationId(ids);
    const names = await getNotificationName(ids);
    setNotificationName(names);
  };

  const setTeacher = async() => {
      setIsTeacher(await getIsTeacher(userid));
  }


  const updateState = async(name, state) => {
    // TODO: assume there is no notification with same name
    var i = notificationName.indexOf(name);
    await axios.put(updateURL, null,
        {
        params: {
            resid: userid,
            requestid: notificationId[i],
            res: state
        }
    });
    await get();
    }
    // console.log(isTeacher)
    console.log(userid);
    return (
        
        <Navbar navbar>
            <NavbarContainer>
                <NavbarWrapper>
                <Link to={{
                            pathname:isTeacher?'/teacheroverview':'/overview',
                            state: {
                                id: userid
                            }}}>
                        <NavbarBrand>gatherSports</NavbarBrand>
                    <NavbarToggler
                        onClick={() => setOpenNavbar(!openNavbar)}
                        // color="black"
                    />
                    </Link>
                </NavbarWrapper>

                <NavbarCollapse open={openNavbar}>
                    <Nav>
                        <div className="flex flex-col z-50 lg:flex-row lg:items-center">
                            {/* <Link to='/reservation'>
                                <NavLink
                                >
                                    <Icon name="book_online" size="2xl" />
                                     &nbsp;Reservation 
                                </NavLink>
                            </Link> */}

                            <Link to={{
                            pathname: "/match",
                            state: {
                                user: userid
                            }}}
                            style={{display:isTeacher?"none":"inline"}}>
                                <NavLink>
                                    <Icon name="accperson_add" size="2xl" />
                                    {/* &nbsp;People */}
                                </NavLink>  
                            </Link>

                            <Link to={{
                                pathname:'/coursesearch',
                                state: {
                                    id: userid
                                }}}>
                                <NavLink>
                                        <Icon name="computer" size="2xl" />
                                        {/* &nbsp;Course */}
                                </NavLink>
                            </Link>

                            <Link to={{
                                pathname:'/message',
                                state: {
                                    userid: userid
                                }}}
                                style={{display:isTeacher?"none":"inline"}}>
                                <NavLink>
                                    <Icon name="feed" size="2xl" />
                                    {/* &nbsp;Message  */}
                                </NavLink>
                            </Link>

                            <div className="text-white" style={{display:isTeacher?"none":"inline"}}>
                                <Dropdown
                                    color="transparent"
                                    size="regular"
                                    buttonType="link"
                                    buttonText={
                                        <div className="py-2.5 font-medium flex items-center">
                                            <Icon name="notifications" size="2xl" />
                                            <span className="ml-2">
                                             &nbsp;Friend Request
                                            </span>
                                        </div>
                                    }
                                    ripple="light"
                                >
                                    {notificationName?notificationName.map(
                                        name => (
                                            <DropdownItem color="lightBlue" key={name}>
                                            {name} &nbsp;

                                            <Button
                                                className="resLink"
                                                color="pink"
                                                buttonType="link"
                                                size="sm"
                                                rounded={false}
                                                block={false}
                                                iconOnly={true}
                                                ripple="dark"
                                                ref={(node) => {
                                                    if (node) {
                                                      node.style.setProperty("display", "inline-block", "important");
                                                      node.style.setProperty("float", "right", "important");
                                                    }
                                                  }}
                                                  onClick={() =>{updateState(name, 'Rej')}}
                                            ><Icon name="clear" size="sm" /></Button>

                                            <Button
                                                className="resLink"
                                                color="lightGreen"
                                                buttonType="link"
                                                size="sm"
                                                rounded={false}
                                                block={false}
                                                iconOnly={true}
                                                ripple="dark"
                                                ref={(node) => {
                                                    if (node) {
                                                      node.style.setProperty("display", "inline-block", "important");
                                                      node.style.setProperty("float", "right", "important");
                                                    }
                                                  }}
                                                onClick={async () =>{updateState(name, 'Acpt')}}
                                            ><Icon name="favorite" size="sm"/></Button>
                                            
                                        </DropdownItem>
                                        )
                                    ):""}

                                </Dropdown>
                            </div>

                            {/* if a user log in, show his/her firstname  */}
                            <Link to={{
                                pathname:'/profile',
                                state: {
                                    userid: userid
                                }}}>
                                <NavLink className="user_profile">
                                    <Icon name="account_circle" size="3xl"/>
                                    </NavLink>
                            </Link>

                        </div>
                    </Nav>
                </NavbarCollapse>
            </NavbarContainer>
        </Navbar>
    );
}
