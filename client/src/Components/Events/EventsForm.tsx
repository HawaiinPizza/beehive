import React from "react";
import TwitterLogo from "../../Images/Twitter_Social_Icon_Rounded_Square_Color.png";
import FacebookLogo from "../../Images/f_logo_RGB-Blue_58.png";
import EmailModal from "../EmailModal";
import EventEdit from "./EventsEdit";
import "../../CSS/Events/EventsForm.css";

interface EventInfo {
  name: string;
  address: string;
  time: string;
  date: string;
  description: string;
  removeEvent: () => void;
}

function EventsForm({
  name,
  address,
  time,
  date,
  description,
  removeEvent,
}: EventInfo) {
  const [showEmailModal, setShowEmailModal] = React.useState(false);
  const [showEventEditModal, setShowEventEditModal] = React.useState(false);

  const toggleEmailModal = () => {
    setShowEmailModal(!showEmailModal);
  };

  const toggleEventEditModal = () => {
    setShowEventEditModal(!showEventEditModal);
  };

  return (
    <div className="EventsForm">
      <EmailModal showModal={showEmailModal} setShowModal={setShowEmailModal} />
      <EventEdit
        showModal={showEventEditModal}
        setShowModal={setShowEventEditModal}
      />
      <div className="EventsForm-Top">
        <div className="EventsForm-NameAddressTimeDateGroup">
          <div className="EventsForm-NameDiv">
            <label className="EventsForm-NameLabel">Name</label>
            <div className="EventsForm-Name">{name}</div>
          </div>
          <div className="EventsForm-AddressTimeDateGroup">
            <div className="EventsForm-AddressTimeDateLabel">
              <label className="EventsForm-AddressLabel">Address</label>
              <label className="EventsForm-TimeLabel">Time</label>
              <label className="EventsForm-DateLabel">Date</label>
            </div>
            <div className="EventsForm-AddressTimeDateInfo">
              <div className="EventsForm-Address">{address}</div>
              <div className="EventsForm-Time">{time}</div>
              <div className="EventsForm-Date">{date}</div>
            </div>
          </div>
        </div>
        <div className="EventsForm-SocialMediaButtons">
          <img
            className="EventsForm-SocialMediaButtons-Twitter"
            src={TwitterLogo}
          />
          <img
            className="EventsForm-SocialMediaButtons-Facebook"
            src={FacebookLogo}
          />
        </div>
      </div>
      <div className="EventsForm-DescriptionDiv">
        <label className="EventsForm-DescriptionLabel">Description</label>
        <div className="EventsForm-Description">{description}</div>
      </div>
      <div className="EventsForm-Bottom">
        <div className="EventsForm-BrightButtonGroup">
          <button
            className="EventsForm-BrightButton"
            onClick={toggleEventEditModal}
          >
            Edit Event
          </button>
          <button className="EventsForm-BrightButton">Members</button>
          <button
            className="EventsForm-BrightButton"
            onClick={toggleEmailModal}
          >
            Email Members
          </button>
        </div>
        <div className="EventsForm-DarkButtonGroup">
          <button className="EventsForm-DarkButton" onClick={removeEvent}>
            Delete Event
          </button>
        </div>
      </div>
    </div>
  );
}

export default EventsForm;
