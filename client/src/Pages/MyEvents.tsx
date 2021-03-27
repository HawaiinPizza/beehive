import React from "react";
import "../CSS/Events/MyEvents.css";
import EventList from "../Components/Events/EventsList";
import EventsForm from "../Components/Events/EventsForm";
import EmailModal from "../Components/EmailEvent";
import EventEdit from "../Components/Events/EventsEdit";
import EventMemberModal from "../Components/Events/EventMemberModal";
import TransferManagerModal from "../Components/TransferManagerModal";
import ConfirmationModal from "../Components/ConfirmationModal";
import * as API from "../api/Event";
import { store, redux_index, redux_members, redux_transfer } from "../store";

interface MemberInfo {
  id: number;
  firstname: string;
  lastname: string;
  points: number;
  attended: boolean;
}

interface EventInfo {
  name: string;
  address: string;
  time: string;
  date: string;
  description: string;
  id: number;
  members: Array<MemberInfo> | null;
}

async function reload(id: number) {
  const tmp = await API.getEventManager(id);
  const myevents = tmp["events"]
  const members = tmp["eventmembers"]
  // console.log("MY STUFF", id)
  // console.log(myevents, id)
  // console.log("THE MEMBERS", members)

  if (myevents === undefined) {
          return [];
  } else {
          let events: any = {};
          myevents.forEach((i: any) => {
                  var date_obj = new Date(i.Time);
                  let _date =
                          +(+date_obj.getMonth()) +
                          "/" +
                          date_obj.getDay() +
                          "/" +
                          date_obj.getFullYear();
                  let minute = date_obj.getMinutes();
                  let hour = date_obj.getHours();
                  let _hour = ("0" + hour).slice(-2);
                  let _minute = ("0" + minute).slice(-2);
                  let _time = _hour + ":" + _minute;
                  let _id = i.id;

                  let tmp_event = {
                          name: i.Name,
                          description: i.Description,
                          address: i.Address,
                          time: _time,
                          date: _date,
                          members:null,
                          // members: Array<MemberInfo>({
                          //   id: i.userid,
                          //   firstname: i.firstname,
                          //   lastname: i.firstname,
                          //   points: i.points,
                          // }),
                          id: _id,
                  };
                  events[i.id] = tmp_event;

          })
          if(members!==undefined){
                  members.forEach((i:any)=>{
                          if(events[i.id].members == null){
                                  events[i.id].members= Array<MemberInfo>({ id: i.userid, firstname: i.firstname, lastname: i.lastname, points: i.points, attended:i.attended})
                          }
                          else{
                                  events[i.id].members.push({ id: i.userid, firstname: i.firstname, lastname: i.lastname, points: i.points, attended:i.attended})
                          }
                  })
          }
          console.log(events)
          console.log(Object.values(events))
  return Object.values(events) as Array<EventInfo>;
  }
}


function MyEvents(props: { id: any }) {
  const [events, setEvents] = React.useState(Array<EventInfo>());
  const [eventIndex, setEventIndex] = React.useState(-1);
  const [showEventEditModal, setShowEventEditModal] = React.useState(false);
  const [showEventMemberModal, setShowEventMemberModal] = React.useState(false);
  const [showEmailModal, setShowEmailModal] = React.useState(false);
  const [checkReload, setReload] = React.useState(false);
  const [
    showTransferManagerModal,
    setShowTransferManagerModal,
  ] = React.useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = React.useState(
    false
  );
  const [curEvent, setCurEvent] = React.useState({
    name: "",
    address: "",
    time: "",
    date: "",
    description: "",
  });

        React.useEffect(() => {
                reload(props.id).then((res) => setEvents(res));
        }, [eventIndex, checkReload]);

  const toggleEmailModal = () => {
    setShowEmailModal(!showEmailModal);
  };

  const toggleEventEditModal = () => {
    setShowEventEditModal(!showEventEditModal);
  };

  const toggleEventMemberModal = () => {
    setShowEventMemberModal(!showEventMemberModal);
  };

  const toggleTransferManagerModal = () => {
    setShowTransferManagerModal(!showTransferManagerModal);
  };

  const toggleConfirmationModal = () => {
    setShowConfirmationModal(!showConfirmationModal);
  };

  const selectEvent = (i: number) => {
    let index = i === undefined ? 0 : i;
    setEventIndex(index);
    i === undefined
      ? setCurEvent({
          name: "",
          address: "",
          time: "",
          date: "",
          description: "",
        })
      : setCurEvent({
          name: events[index].name,
          address: events[index].address,
          time: events[index].time,
          date: events[index].date,
          description: events[index].description,
        });
    store.dispatch(redux_index(i));
    store.dispatch(redux_transfer(events[index].id));
  };

  const addEvent = async (
    name: string,
    address: string,
    time: string,
    date: string,
    description: string
  ) => {
    let [month, day, year] = date.split("-").map((i) => parseInt(i));
    let [hour, minute] = time.split(":").map((i) => parseInt(i));
    let thedate = new Date(year, month - 1, day, hour - 5, minute);
    let _tmp = await API.newEvent(
      name,
      description,
      address,
      thedate,
      props.id
    );
    console.log("BIG TAIL")
    console.log(_tmp)
    console.log("BIG TAIL")
    const e = events.slice();
    e.push({
      name,
      address,
      time,
      date,
      description,
      id: _tmp.id,
      members: null,
    });
    console.log(_tmp)
    setEvents(e);
    setEventIndex(events.length);
    setCurEvent({
      name: name,
      address: address,
      time: time,
      date: date,
      description: description,
    });
  };

  const editEvent = async (
    name: string,
    address: string,
    time: string,
    date: string,
    description: string
  ) => {
    if (events[eventIndex] !== undefined) {
      let [month, day, year] = date.split("-").map((i) => parseInt(i));
      let [hour, minute] = time.split(":").map((i) => parseInt(i));
      let thedate = new Date(year, month - 1, day, hour - 5, minute);
      await API.update(
        events[eventIndex].id,
        name,
        description,
        address,
        thedate
      );
      const e = events.slice();
      e[eventIndex].name = name;
      e[eventIndex].address = address;
      e[eventIndex].time = time;
      e[eventIndex].date = date;
      e[eventIndex].description = description;
      setEvents(e);
      setCurEvent({
        name: events[eventIndex].name,
        address: events[eventIndex].address,
        time: events[eventIndex].time,
        date: events[eventIndex].date,
        description: events[eventIndex].description,
      });
    }
  };

  const removeEvent = async (i: number) => {
    if (events[i] !== undefined) {
      await API.Delete(events[i].id);
      const e = events.slice();
      e.splice(i, 1);
      setEvents(e);
      setEventIndex(-1);
    }

    setCurEvent({
      name: "",
      address: "",
      time: "",
      date: "",
      description: "",
    });
  };

  return (
    <div className="MyEvents">
      <EmailModal showModal={showEmailModal} setShowModal={setShowEmailModal} />
      <EventEdit
        showModal={showEventEditModal}
        setShowModal={setShowEventEditModal}
        editEvent={editEvent}
        curEvent={curEvent}
        setCurEvent={setCurEvent}
      />
      <EventMemberModal
        showModal={showEventMemberModal}
        setShowModal={setShowEventMemberModal}
        members={ events[eventIndex]!==undefined ?  events[eventIndex].members : null}
      />
      <TransferManagerModal
        showModal={showTransferManagerModal}
        setShowModal={setShowTransferManagerModal}
         setReload={setReload}
        event={ events[eventIndex]!==undefined ?  events[eventIndex].id : null}
         reload={checkReload}
      />
      <ConfirmationModal
        showModal={showConfirmationModal}
        setShowModal={setShowConfirmationModal}
        removeFunction={() => {
          removeEvent(eventIndex);
        }}
      />
      <div className="MyEvents-EventList">
        <EventList
          eventList={events}
          selectEvent={selectEvent}
          addEvent={addEvent}
        />
      </div>
      <div className="MyEvents-EventForm">
        {eventIndex > events.length - 1 || eventIndex < 0 ? (
          <EventsForm
            name={""}
            address={""}
            time={""}
            date={""}
            description={""}
            removeEvent={() => {
              removeEvent(eventIndex);
            }}
            toggleEmailModal={toggleEmailModal}
            toggleEventEditModal={toggleEventEditModal}
            toggleEventMemberModal={toggleEventMemberModal}
            toggleTransferManagerModal={toggleTransferManagerModal}
            toggleConfirmationModal={toggleConfirmationModal}
          />
        ) : (
          <EventsForm
            name={events[eventIndex].name}
            address={events[eventIndex].address}
            time={events[eventIndex].time}
            date={events[eventIndex].date}
            description={events[eventIndex].description}
            removeEvent={() => {
              removeEvent(eventIndex);
            }}
            toggleEmailModal={toggleEmailModal}
            toggleEventEditModal={toggleEventEditModal}
            toggleEventMemberModal={toggleEventMemberModal}
            toggleTransferManagerModal={toggleTransferManagerModal}
            toggleConfirmationModal={toggleConfirmationModal}
          />
        )}
      </div>
    </div>
  );
}

export default MyEvents;
