import AddTurnForm from "./AddTypeTurn";
import AddScheduleForm from "./Addtimes";
import { BuildWebSite } from "./buildWebSite";
import './HomeAdmin.css'
import { CarryOutOutlined, HistoryOutlined, ThunderboltOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../Redux/store";
import { setUser } from "../../Redux/userSlice";
import { useState } from "react";

const HomeAdmin: React.FC = () => {
    const user = useSelector((state: RootState) => state.user)
    const [scrolled, setScrolled] = useState(false);
    const dispatch = useDispatch();
    dispatch(setUser());
    return (
        <>
            {user.token ? (<>
                <header className={scrolled ? 'hero1 scrolled ' : 'hero1'}>
                    <div className="content">
                        <h1>Online Appointment Booking</h1>
                        <p>Easily and quickly 24/7</p>
                    </div>
                </header>
                {/* <!-- Section C: Process --> */}
                <section id="home-c" className="text-center py-2">
                    <div className="container">
                        <div className='title'>
                            <h2 className="section-title">Turn management is easier than ever!</h2>
                            <div className="bottom-line"></div>
                        </div>
                        <div className="container">
                            <div className="process admin">
                                <div style={{ backgroundColor: 'rgb(212 212 212)', padding: 20 }}>
                                    <AddTurnForm />
                                    <h3> Add Or Remove Type Of Turn </h3>
                                    <p className="p-contant">
                                        Here you define your types of services,
                                        Duration of each service and the service provider,and price,
                                        And also the possibility of removing a services,
                                        This data will be updated on the website for all users
                                    </p>
                                </div>
                                <div style={{ backgroundColor: 'rgb(212 212 212)', padding: 20 }}>
                                    <AddScheduleForm />
                                    <h3>Add Opening Time</h3>
                                    <p className="p-contant">
                                        Here you define the operating hours of your business
                                        This data will be updated on the website for all users
                                    </p>
                                </div>
                                <div style={{ backgroundColor: 'rgb(212 212 212)', padding: 20 }}>
                                    <BuildWebSite />
                                    <h3> Set up your site </h3>
                                    <p className="p-contant">
                                        Here you define the website name, your name, contact methods and other data. Successfully!
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div id='flexButton'></div>
                        <section className="solutions flex-columns">
                            <div className="row">
                                <div className="column">
                                    <div className="column-1-admin">
                                    </div>
                                </div>
                                <div className="column">
                                    <div className="column-2 bg-primary">
                                        <h4>What you are looking for</h4>
                                        <h2>We provide a variety of services</h2>
                                        <p>We are glad that you are part of us - and thank you for joining our company, we are sure that your business management experience from now on will be very good and we wish you success!
                                            We are here to accompany you in any problem,
                                            Pleasant use!</p>
                                        <Link to='/TurnTable'><button className="btn btn-outline" >
                                            My Diary
                                        </button></Link>
                                    </div>
                                </div>
                            </div>
                        </section>
                        <div className="process admin">
                            <div>
                                <CarryOutOutlined className="process-icon my-2" />
                                <h3>Effective queue management</h3>
                                <p>"Effective queue management is crucial for service-oriented businesses.
                                    Efficiently handling appointments, changes, and cancellations is
                                    vital to avoid resource wastage and maintain customer
                                    satisfaction. Poor queue management can lead to lost
                                    revenue and a negative reputation. Smooth appointment
                                    scheduling enhances customer experience and strengthens
                                    the business's image."</p>
                            </div>
                            <div>
                                <HistoryOutlined className="fas process-icon" />
                                <h3>Availability from anywhere and at any time.</h3>
                                <p>The system is available 24 hours a day from any personal computer, tablet or smart cell phone connected to the Internet and allows you to easily and simply manage your business from anywhere at any time..</p>
                            </div>
                            <div>
                                <ThunderboltOutlined className="process-icon my-2" />
                                <h3>Flexibility and adaptability to any business.</h3>
                                <p>Receive immediate confirmation for your chosen appointment, providing you with peace
                                    of mind and assurance that your slot is secured without delay or uncertainty.</p>
                            </div>
                        </div>
                    </div>
                </section>
            </>) : (<Link to={'/Home'}></Link>)}</>
    );
}
export default HomeAdmin;