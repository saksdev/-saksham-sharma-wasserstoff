import './Ticket.css';
import Logo from '../assets/ticket.png';
import Profile from '../assets/profile.png';

export default function Ticket({ data: { name, email, username } }) {
  return (
    <>
      <h1>
        Congrats, <span className='textcolor'>{name}! </span> <br /> Your ticket is ready.
      </h1>
      <p>
        We've emailed your ticket to <br />
        <span className='textcolor'>{email} </span>and will send updates as<br /> the event approaches.
      </p>
      <div className="cardWrap">
        <div className="card cardLeft">
          <div className="cardLeft-one">
            <img alt="Coding Conf Logo" src={Logo} />
            <span>Coding Conf</span>
          </div>
          <span>Dec 21, 2025 / Delhi, India</span>
          <div className="cardLeft-two">
            <img src={Profile} alt="Profile" />
            <div id="profile">
              <p>{name}</p>
              <span>@{username}</span>
            </div>
          </div>
        </div>

        <div className="card cardRight">
          <p>#43984</p>
        </div>
      </div>
    </>
  );
}