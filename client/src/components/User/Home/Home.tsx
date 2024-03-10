import { Link } from 'react-router-dom';
import './Home.css';
import { useState } from 'react';
import { CalendarFilled,  CheckCircleFilled, ClockCircleFilled, DoubleRightOutlined,ExperimentFilled, FieldTimeOutlined, ThunderboltOutlined } from '@ant-design/icons';
import { CloudOutlined, Mail } from '@mui/icons-material';
import config from '../../config ';
import axios from 'axios';
const Home: React.FC = () => {
    const [myText, setMyText] = useState('');
    const [scrolled, setScrolled] = useState(false);

    async function getData() {
        const getBuild: any = await axios.get(`${config.api}/build`)
            .then((respons) => {
                setMyText(respons.data.myText);

            })
        console.log(getBuild);
    }
    getData();

    return (
        <>
            <header className={scrolled ? 'hero scrolled' : 'hero user'}>
                <div className="content">
                    <h1>Online Appointment Booking</h1>
                    <p>Easily and quickly 24/7</p>
                </div>
            </header>
            {/* <!-- Section C: Process --> */}
            <section id="home-c" className="text-center py-2">
                <div className="container">
                    <div className='title'>
                        <h2 className="section-title">Invite turn is easier than ever</h2>
                        <div className="bottom-line"></div>
                        <p className="lead"> Everything in one place and easily, booking and canceling a turn and viewing your personal diary
                        </p>
                    </div>
                    <section className="solutions flex-columns">
                        <div className="row">
                            <div className="column">
                                <div className="column-1">
                                </div>
                            </div>
                            <div className="column">
                                <div className="column-2 bg-primary">
                                    <h4>What you are looking for</h4>
                                    <h2>We provide a variety of services</h2>
                                    <p>{myText}</p>
                                    <Link to='/addTurn'><button className="btn btn-outline" >
                                        Add Service
                                    </button></Link>
                                </div>
                            </div>
                        </div>
                    </section>
                    <div className="process">
                        <div>
                            <FieldTimeOutlined className="process-icon my-2" />
                            <h3>Availability 24/7</h3>
                            <p>With our website, you have the flexibility to browse through available appointments,
                                pick the one that suits your schedule best,
                                and make changes if needed, all at your fingertips.</p>
                        </div>
                        <div>
                            <CloudOutlined className="fas process-icon" />
                            <h3>Online</h3>
                            <p>Easily book appointments anytime, anywhere,
                                avoiding phone calls and waiting times,
                                ensuring you can schedule your appointments efficiently and effortlessly.</p>
                        </div>
                        <div>
                            <Mail className="process-icon my-2" />
                            <h3>Mail Confirmation</h3>
                            <p>Receive immediate confirmation for your chosen appointment, providing you with peace
                                of mind and assurance that your slot is secured without delay or uncertainty.</p>
                        </div>
                        <div>
                            <ThunderboltOutlined className="process-icon my-2" />
                            <h3>Empowerment</h3>
                            <p>Take control of your appointments by accessing our intuitive platform, where you can manage, reschedule, or cancel bookings
                                according to your needs, empowering you to stay organized.</p>
                        </div>
                    </div>
                </div>
            </section>

                     {/* <!-- Section B: Stats --> */}
            <section id="home-b" className="text-center py-2">
                <div className="stats">
                    <div>
                        <ul>
                            <li className='icon'><ExperimentFilled /></li>
                            <li className="stats-title">Treatment Selection</li>
                            <li className="stats-number">1 <DoubleRightOutlined /></li>
                        </ul>
                    </div>
                    <div>
                        <ul>
                            <li className='icon'><CalendarFilled /></li>
                            <li className="stats-title">Date Selection</li>
                            <li className="stats-number">2 <DoubleRightOutlined /></li>
                        </ul>
                    </div>
                    <div>
                        <ul>
                            <li className='icon'><ClockCircleFilled /></li>
                            <li className="stats-title">Time Selection</li>
                            <li className="stats-number">3 <DoubleRightOutlined /></li>
                        </ul>
                    </div>
                    <div>
                        <ul>
                            <li className='icon'><CheckCircleFilled /></li>
                            <li className="stats-title">Saving</li>
                            <li className="stats-number">4 <DoubleRightOutlined /></li>
                        </ul>
                    </div>
                </div>
            </section>
        </>
    );
}
export default Home;