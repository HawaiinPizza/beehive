import React from "react";
import TwitterLogo from "../../Images/Twitter_Social_Icon_Rounded_Square_Color.png";
import FacebookLogo from "../../Images/f_logo_RGB-Blue_58.png";
import { FacebookShareButton, TwitterShareButton } from "react-share";
import "../../CSS/Events/EventsForm(view-only).css";
import "../../CSS/Events/EventsForm(NonMember).css";
import { EventInfo } from "../../Interfaces";

interface IProps {
  event: EventInfo;
}

function EventsForm({ event }: IProps) {
  const quote = `Come join me at the ${event.title} event!`;
  const hashtags = ["BeeHive"];

  function getFormattedDate(event: EventInfo) {
    let month =
      event.date.getMonth() + 1 < 10
        ? "0" + (event.date.getMonth() + 1)
        : event.date.getMonth() + 1;

    let day =
      event.date.getDate() < 10
        ? "0" + event.date.getDate()
        : event.date.getDate();

    let year =
      event.date.getFullYear() < 10
        ? "0" + event.date.getFullYear()
        : event.date.getFullYear();

    return `${month}/${day}/${year}`;
  }

  function getFormattedTime(event: EventInfo) {
    let hour =
      event.date.getHours() < 10
        ? "0" + event.date.getHours()
        : event.date.getHours();
    let minute =
      event.date.getMinutes() < 10
        ? "0" + event.date.getMinutes()
        : event.date.getMinutes();

    return `${hour}:${minute}`;
  }

  return (
    <div className="EventsForm-view-only">
      <div className="EventsForm-view-only-Top">
        <div className="EventsForm-view-only-NameAddressTimeDateGroup">
          <div className="EventsForm-view-only-NameDiv">
            <label className="EventsForm-view-only-NameLabel">Name</label>
            <div className="EventsForm-view-only-Name">{event.title}</div>
          </div>
          <div className="EventsForm-view-only-AddressTimeDateGroup">
            <div className="EventsForm-view-only-AddressTimeDateLabel">
              <label className="EventsForm-view-only-AddressLabel">
                Address
              </label>
              <label className="EventsForm-view-only-TimeLabel">Time</label>
              <label className="EventsForm-view-only-DateLabel">Date</label>
            </div>
            <div className="EventsForm-view-only-AddressTimeDateInfo">
              <div className="EventsForm-view-only-Address">
                {event.address}
              </div>
              <div className="EventsForm-view-only-Time">
                {getFormattedTime(event)}
              </div>
              <div className="EventsForm-view-only-Date">
                {getFormattedDate(event)}
              </div>
            </div>
          </div>
        </div>
        <div className="EventsForm-view-only-SocialMediaButtons">
          <TwitterShareButton
            url="http://localhost:3000/"
            title={quote}
            hashtags={hashtags}
          >
            <img
              alt="Twitter Icon"
              className="EventsForm-SocialMediaButtons-Twitter"
              src={TwitterLogo}
            />
          </TwitterShareButton>
          <FacebookShareButton
            url="https://www.google.com/"
            quote={quote}
            hashtag="#BeeHive"
          >
            <img
              alt="Facebook Icon"
              className="EventsForm-SocialMediaButtons-Facebook"
              src={FacebookLogo}
            />
          </FacebookShareButton>
        </div>
      </div>
      <div className="EventsForm-view-only-DescriptionDiv">
        <label className="EventsForm-view-only-DescriptionLabel">
          Description
        </label>
        <div className="EventsForm-NonMember-Description">
          {event.description}
        </div>
      </div>
    </div>
  );
}

export default EventsForm;
