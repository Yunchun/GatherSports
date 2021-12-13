/* eslint-disable max-classes-per-file */
/* eslint-disable react/no-unused-state */
import * as React from 'react';
import axios from 'axios';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Room from '@material-ui/icons/Room';
import classNames from 'clsx';
import moment from 'moment'
import H2 from "@material-tailwind/react/Heading2";
import GatherSportNav from 'components/GatherSportNav';
import { ViewState, EditingState } from '@devexpress/dx-react-scheduler';
import {
  Scheduler,
  Toolbar,
  MonthView,
  WeekView,
  ViewSwitcher,
  Appointments,
  AppointmentTooltip,
  AppointmentForm,
  DragDropProvider,
  EditRecurrenceMenu,
  AllDayPanel,
} from '@devexpress/dx-react-scheduler-material-ui';
import { connectProps } from '@devexpress/dx-react-core';
import { KeyboardDateTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import LocationOn from '@material-ui/icons/LocationOn';
import Notes from '@material-ui/icons/Notes';
import Close from '@material-ui/icons/Close';
import CalendarToday from '@material-ui/icons/CalendarToday';
import Create from '@material-ui/icons/Create';
import PersonIcon from '@material-ui/icons/Person';
import emailjs from 'emailjs-com';
import{ init } from 'emailjs-com';
//import { appointments } from '../../../demo-data/appointments';
const ReservationURL = 'http://localhost:8080/appointment/userid={id}';
const InsertAppointmentURL = 'http://localhost:8080/appointment/insertappointment';
function sendEmail(username, teacher_name, location) {
  init("user_TcaKIkCvpvX6KiytTdPXA");
  //e.preventDefault();    //This is important, i'm not sure why, but the email won't send without it
  var templateParams = {
    to_name: username,
    teacher_name: teacher_name,
    location: location
  };

  emailjs.send('service_txgagqb', 'template_d24psnh', templateParams)
      .then(function(response) {
        console.log('SUCCESS!', response.status, response.text);
      }, function(error) {
        console.log('FAILED...', error);
      });
}
async function Insert_Appointment(Student_id_Insert, Teacher_id_Insert, Link_Insert, ReservationId_Insert, Comment_Insert){
  const Student_id =Student_id_Insert
  const Teacher_id = Teacher_id_Insert;
  const  Link = Link_Insert;
  const ReservationId = ReservationId_Insert;
  const Comment = Comment_Insert?Comment_Insert:'';

  await axios.get(InsertAppointmentURL,
      {
        params: {
          StudentId: Student_id,
          TeacherId:Teacher_id,
          Link:Link,
          ReservationId:ReservationId,
          AppointmentType:"In-person",
          Comment:Comment,
          Accept:'F'
        }}

  );


}
async function get_Res(userid){
  const get_reservations = await axios.get(ReservationURL,
      {
        params:{
          id : userid
        }

      });
  //{ id:1,customField:'222',startDate: '2021-11-23T12:00', endDate: '2021-11-23T13:30', title: 'Fuck' , context:"GO", location:'Room 1', comment:"111"},
  const reservation_array = Array.from(get_reservations.data)
  //var keyMap = {
  //   "beginTime" : "startDate",
  ////   "endTime" : "endDate",
  //   "reservationId" :"id",
  //   "courtId":"location",
  //   "userId":"title",
  //};
  // for(var i = 0;i < reservation_array.length;i++){
  //  var obj = reservation_array[i];
  //  for(var key in obj){
  //            var newKey = keyMap[key];
  //            if(newKey){
  //                     obj[newKey] = obj[key];
  //                     delete obj[key];
  //              }
  //     }
//}
  console.log("data",reservation_array);
  return reservation_array;
}
const containerStyles = theme => ({
  container: {
    width: theme.spacing(68),
    padding: 0,
    paddingBottom: theme.spacing(2),
  },
  content: {
    padding: theme.spacing(2),
    paddingTop: 0,
  },
  header: {
    overflow: 'hidden',
    paddingTop: theme.spacing(0.5),
  },
  closeButton: {
    float: 'right',
  },
  buttonGroup: {
    display: 'flex',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 2),
  },
  button: {
    marginLeft: theme.spacing(2),
  },
  picker: {
    marginRight: theme.spacing(2),
    '&:last-child': {
      marginRight: 0,
    },
    width: '50%',
  },
  wrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: theme.spacing(1, 0),
  },
  icon: {
    margin: theme.spacing(2, 0),
    marginRight: theme.spacing(2),
  },
  textField: {
    width: '100%',
  },
  select: {
    width: '100%',
  },
});

class AppointmentFormContainerBasic extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      appointmentChanges: {},
      option: [

        { id: 1, text: "Yüksek" },
        { id: 2, text: "Orta" },
        { id: 3, text: "Düşük" }
      ],
    };

    this.getAppointmentData = () => {
      const { appointmentData } = this.props;
      return appointmentData;
    };
    this.getAppointmentChanges = () => {
      const { appointmentChanges } = this.state;
      return appointmentChanges;
    };

    this.changeAppointment = this.changeAppointment.bind(this);
    this.commitAppointment = this.commitAppointment.bind(this);
  }

  changeAppointment({ field, changes }) {
    const nextChanges = {
      ...this.getAppointmentChanges(),
      [field]: changes,
    };
    this.setState({
      appointmentChanges: nextChanges,
    });
  }

  commitAppointment(type) {
    const { commitChanges } = this.props;
    const appointment = {
      ...this.getAppointmentData(),
      ...this.getAppointmentChanges(),
    };
    if (type === 'deleted') {

      commitChanges({ [type]: appointment.id });
    } else if (type === 'changed') {
      commitChanges({ [type]: { [appointment.id]: appointment } });
    } else {
      commitChanges({ [type]: appointment });
    }
    this.setState({
      appointmentChanges: {},
    });
  }

  render() {
    const {
      classes,
      visible,
      visibleChange,
      appointmentData,
      cancelAppointment,
      target,
      onHide,
      teacher,
    } = this.props;
    const { appointmentChanges,
      selectteacher
    } = this.state;

    const displayAppointmentData = {
      ...appointmentData,
      ...appointmentChanges,
    };

    const isNewAppointment = appointmentData.id === undefined;
    const applyChanges = isNewAppointment
        ? () => this.commitAppointment('added')
        : () => this.commitAppointment('changed');

    const textEditorProps = field => ({
      variant: 'outlined',
      onChange: ({ target: change }) => this.changeAppointment({
        field: [field], changes: change.value,
      }),
      value: displayAppointmentData[field] || '',
      label: field[0].toUpperCase() + field.slice(1),
      className: classes.textField,
    });
    const SelectProps = field => ({
      variant: 'outlined',
      onChange: ({ target: change }) => this.changeAppointment({
        field: [field], changes: change['teacherRecommends'].value,
      }),
      //value: "2222"  || '',

      //value: ,
      label: field[0].toUpperCase() + field.slice(1),
      className: classes.select,
    });

    const pickerEditorProps = field => ({
      className: classes.picker,
      // keyboard: true,
      ampm: false,
      value: displayAppointmentData[field],
      onChange: date => this.changeAppointment({
        field: [field], changes: date ? date.toDate() : new Date(displayAppointmentData[field]),
      }),
      inputVariant: 'outlined',
      format: 'DD/MM/YYYY HH:mm',
      onError: () => null,
    });

    const cancelChanges = () => {
      this.setState({
        appointmentChanges: {},
      });
      visibleChange();
      cancelAppointment();
    };
    const handleChange = (event) => {

      this.setState({
        selectteacher: event,
      });
      this.changeAppointment({
        field: ['SelectedTeacherId'],
        changes: event,

      });
    };

    return (
        <new_appointments bugs={selectteacher}/>,
            <AppointmentForm.Overlay
                visible={visible}
                target={target}
                fullSize
                onHide={onHide}
            >
              <div>
                <div className={classes.header}>
                  <IconButton
                      className={classes.closeButton}
                      onClick={cancelChanges}
                  >
                    <Close color="action" />
                  </IconButton>
                </div>
                <div className={classes.content}>
                  <div className={classes.wrapper}>
                    <Create className={classes.icon} color="action" />
                    <TextField
                        {...textEditorProps('title')}
                    />
                  </div>
                  <div className={classes.wrapper}>
                    <CalendarToday className={classes.icon} color="action" />
                    <MuiPickersUtilsProvider utils={MomentUtils}>
                      <KeyboardDateTimePicker
                          label="Start Date"
                          {...pickerEditorProps('startDate')}
                      />
                      <KeyboardDateTimePicker
                          label="End Date"
                          {...pickerEditorProps('endDate')}
                      />
                    </MuiPickersUtilsProvider>
                  </div>
                  <div className={classes.wrapper}>
                    <LocationOn className={classes.icon} color="action" />
                    <TextField
                        {...textEditorProps('location')}
                    />
                  </div>
                  <div className={classes.wrapper}>
                    <PersonIcon className={classes.icon} color="action" />

                    <AppointmentForm.Select
                        label = {'22'}
                        availableOptions={displayAppointmentData['teacherRecommends'] }
                        onValueChange ={handleChange}
                        type = {'filledSelect'}
                        // {...SelectProps('teacherRecommends')}
                    />

                  </div>
                  <div className={classes.wrapper}>
                    <Notes className={classes.icon} color="action" />
                    <TextField
                        {...textEditorProps('notes')}
                        multiline
                        rows="6"
                    />
                  </div>
                </div>
                <div className={classes.buttonGroup}>

                  <Button
                      variant="outlined"
                      color="primary"
                      className={classes.button}
                      onClick={() => {
                        visibleChange();
                        applyChanges();
                        this.commitAppointment('deleted');

                      }}
                  >
                    {isNewAppointment ? 'Submit' : 'Submit'}
                  </Button>
                </div>
              </div>

            </AppointmentForm.Overlay>


    );
  }
}

const AppointmentFormContainer = withStyles(containerStyles, { name: 'AppointmentFormContainer' })(AppointmentFormContainerBasic);

const styles = theme => ({
  addButton: {
    position: 'absolute',
    bottom: theme.spacing(1) * 3,
    right: theme.spacing(1) * 4,
  },
});

/* eslint-disable-next-line react/no-multi-comp */
class new_appointments extends React.PureComponent {
  style = ({ palette }) => ({
    icon: {
      color: palette.action.active,
    },
    textCenter: {
      textAlign: 'center',
    },
    basketball: {
      background: 'url(https://drive.google.com/uc?id=1NW3IdaOy0wn2Z9lbLxl2GdBuQfybGvHO)',
    },

    football: {
      background: 'url(https://drive.google.com/uc?id=1eXFmXD1oxTGIUGvsF-0zRotbpE9NgK5t)',
    },
    badminton: {
      background: 'url(https://drive.google.com/uc?id=1QPkO3aRmcU006fyBZLGDo5he3MEFWl_P)',
    },

    figureskating: {
      background: 'url(https://drive.google.com/uc?id=1Jne8Tl7gydVaCWPYzh_evKYCgQ9zHYJo)',
    },

    swimming: {
      background: 'url(https://drive.google.com/uc?id=1jVyHsF8L8KujYI4q6IgaF017PCU4YgZ7)',
    },

    tennis: {
      background: 'url(https://drive.google.com/uc?id=1DbwV6wQC3qe0n2rgGtA1JNcTr-2VuY0O)',
    },
    volleyball: {
      background: 'url(https://drive.google.com/uc?id=1D23FrcH2qvJCGM0aNBC_aQbhQ-iWJHhU)',
    },
    sports: {
      background: 'url(https://drive.google.com/uc?id=1RAdlQMjgnT32y06dBNCs44Pu13AZY_L8)',
    },

    header: {
      height: '260px',
      backgroundSize: 'cover',
    },
    commandButton: {
      backgroundColor: 'rgba(255,255,255,0.65)',
    },
  });
  getSportName = (classes, sportName) => {
    if (sportName === 'Basketball') return classes.basketball;
    if (sportName === 'Football') return classes.football;
    if (sportName === 'Badminton') return classes.badminton;
    if (sportName === 'Figure Skating') return classes.figureskating;
    if (sportName === 'Swimming and Aquatics') return classes.swimming;
    if (sportName === 'Tennis') return classes.tennis;
    if (sportName === 'Volleyball') return classes.volleyball;
    return classes.sports;
  };
  Header = withStyles(this.style, { name: 'Header' })(({
                                                         children, appointmentData, classes, ...restProps
                                                       }) => (
      <AppointmentTooltip.Header
          {...restProps}
          className={classNames(this.getSportName(classes, appointmentData.sportName), classes.header)}
          appointmentData={appointmentData}
      >

      </AppointmentTooltip.Header>
  ));
  Content = withStyles(this.style, { name: 'Content' })(({
                                                           children, appointmentData, classes, ...restProps
                                                         }) => (
      <AppointmentTooltip.Content {...restProps} appointmentData={appointmentData}>
        <Grid container alignItems="center">
          <Grid item xs={2} className={classes.textCenter}>
            <Room className={classes.icon} />
          </Grid>
          <Grid item xs={10}>
            <span>{appointmentData.location}</span>
          </Grid>

        </Grid>
      </AppointmentTooltip.Content>
  ));
  CommandButton = withStyles(this.style, { name: 'CommandButton' })(({
                                                                       classes, ...restProps
                                                                     }) => (
      <AppointmentTooltip.CommandButton {...restProps} className={classes.commandButton} />
  ));
  constructor(props) {
    super(props);
    this.state = {
      id : this.props.location.state.userid,
      data : [
      ]
      ,
      currentDate: moment().format('YYYY-MM-DD'),
      confirmationVisible: false,
      editingFormVisible: false,
      deletedAppointmentId: undefined,
      editingAppointment: undefined,
      previousAppointment: undefined,
      addedAppointment: {},
      startDayHour: 9,
      endDayHour: 19,
      isNewAppointment: false,
      option: [

        { id: 1, text: "Yüksek" },
        { id: 2, text: "Orta" },
        { id: 3, text: "Düşük" }
      ],
    };

    this.toggleConfirmationVisible = this.toggleConfirmationVisible.bind(this);
    this.commitDeletedAppointment = this.commitDeletedAppointment.bind(this);
    this.toggleEditingFormVisibility = this.toggleEditingFormVisibility.bind(this);

    this.commitChanges = this.commitChanges.bind(this);
    this.onEditingAppointmentChange = this.onEditingAppointmentChange.bind(this);
    this.onAddedAppointmentChange = this.onAddedAppointmentChange.bind(this);
    this.appointmentForm = connectProps(AppointmentFormContainer, () => {
      const {
        editingFormVisible,
        editingAppointment,
        data,
        addedAppointment,
        isNewAppointment,
        previousAppointment,
      } = this.state;

      const currentAppointment = data
              .filter(appointment => editingAppointment && appointment.id === editingAppointment.id)[0]
          || addedAppointment;
      const cancelAppointment = () => {
        if (isNewAppointment) {
          this.setState({
            editingAppointment: previousAppointment,
            isNewAppointment: false,
          });
        }
      };

      return {
        visible: editingFormVisible,
        appointmentData: currentAppointment,
        commitChanges: this.commitChanges,
        visibleChange: this.toggleEditingFormVisibility,
        onEditingAppointmentChange: this.onEditingAppointmentChange,
        cancelAppointment,
      };
    });
  }

  componentDidUpdate() {
    this.appointmentForm.update();
  }

  onEditingAppointmentChange(editingAppointment) {
    this.setState({ editingAppointment });
  }

  onAddedAppointmentChange(addedAppointment) {
    this.setState({ addedAppointment });
    const { editingAppointment } = this.state;
    if (editingAppointment !== undefined) {
      this.setState({
        previousAppointment: editingAppointment,
      });
    }
    this.setState({ editingAppointment: undefined, isNewAppointment: true });
  }

  setDeletedAppointmentId(id) {
    this.setState({ deletedAppointmentId: id });
  }

  toggleEditingFormVisibility() {
    const { editingFormVisible } = this.state;
    this.setState({
      editingFormVisible: !editingFormVisible,
    });
  }

  toggleConfirmationVisible() {
    const { confirmationVisible } = this.state;
    this.setState({ confirmationVisible: !confirmationVisible });
  }


  async commitDeletedAppointment() {
    // Insert_Appointment(Student_id_Insert, Teacher_id_Insert, Link_Insert, ReservationId_Insert, Comment_Insert)
    const { data, deletedAppointmentId, id } = this.state;
    console.log(data)
    const delete_data = data.filter(appointment => appointment.id == deletedAppointmentId);
    //alert(select);
    // console.log(deletedAppointmentId)
    for (let i = 0; i < delete_data[0]['teacherRecommends'].length; i++) {
      if (delete_data[0]['teacherRecommends'][i]['id'] ==delete_data[0]['SelectedTeacherId']){
        console.log (delete_data[0]['teacherRecommends'][i]['text'])
        sendEmail(delete_data[0]['studentName'], delete_data[0]['teacherRecommends'][i]['text'], delete_data[0]['location'])
      }
    }


    await Insert_Appointment(this.state.id, delete_data[0]['SelectedTeacherId'], "Link_Insert", deletedAppointmentId, delete_data[0]['notes'])
    this.setState((state) => {

      const { data, deletedAppointmentId } = state;
      const nextData = data.filter(appointment => appointment.id !== deletedAppointmentId);

      return { data: nextData, deletedAppointmentId: null };
    });
    this.toggleConfirmationVisible();
  }

  async componentDidMount(){
    // extract params from url
    // let search = window.location.search;
    // let params = new URLSearchParams(search);
    const id = this.state.id;
    // call two functions and render the page
    this.setState({
      data: await get_Res(id),


    })}
  commitChanges({ added, changed, deleted }) {
    this.setState((state) => {
      let { data } = state;
      if (added) {
        const startingAddedId = data.length > 0 ? data[data.length - 1].id + 1 : 0;
        data = [...data, { id: startingAddedId, ...added }];
      }
      if (changed) {
        data = data.map(appointment => (
            changed[appointment.id] ? { ...appointment, ...changed[appointment.id] } : appointment));
      }
      if (deleted !== undefined) {
        this.setDeletedAppointmentId(deleted);
        this.toggleConfirmationVisible();
      }
      return { data, addedAppointment: {} };
    });
  }


  render() {

    const {
      currentDate,
      data,
      confirmationVisible,
      editingFormVisible,
      startDayHour,
      endDayHour,

    } = this.state;

    const { classes } = this.props;

    return (

        <Paper>
          <GatherSportNav userid={this.state.id}/>
          <div className="Header">
            <H2 color="lightBlue">Make an Appointment</H2>

          </div>
          <Scheduler
              data={data}
              height={660}
          >
            <ViewState
                currentDate={currentDate}
            />
            <EditingState
                onCommitChanges={this.commitChanges}
                onEditingAppointmentChange={this.onEditingAppointmentChange}
                onAddedAppointmentChange={this.onAddedAppointmentChange}
            />
            <MonthView
                startDayHour={startDayHour}
                endDayHour={endDayHour}
            />
            <WeekView

            />

            <AllDayPanel />
            <EditRecurrenceMenu />
            <Appointments />
            <AppointmentTooltip
                headerComponent={this.Header}
                contentComponent={this.Content}
                commandButtonComponent={this.CommandButton}
                showCloseButton
                showOpenButton
                //  showDeleteButton
            />
            <Toolbar />
            <ViewSwitcher />

            <AppointmentForm
                overlayComponent={this.appointmentForm}
                visible={editingFormVisible}
                onVisibilityChange={this.toggleEditingFormVisibility}
            />
            <DragDropProvider />
          </Scheduler>

          <Dialog
              open={confirmationVisible}
              onClose={this.cancelDelete}
          >
            <DialogTitle>
              Appointment Made
            </DialogTitle>
            <DialogContent>
              <DialogContentText>
                Appointment Made Successfully, Enjoy your time!
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={this.commitDeletedAppointment} color="secondary" variant="outlined">
                OK
              </Button>
            </DialogActions>
          </Dialog>


        </Paper>
    );
  }
}

export default withStyles(styles, { name: 'EditingDemo' })(new_appointments);