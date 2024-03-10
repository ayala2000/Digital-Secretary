import * as React from 'react';
import './navbar.css';
import { ClockCircleOutlined } from '@ant-design/icons';
import axios from 'axios';
import config from '../config ';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const ResponsiveAppBarAdmin: React.FC = () => {
  const [webName, setWebName] = React.useState('');
  const [scrolled, setScrolled] = useState(false);
  async function getData() {
    const getBuild: any = await axios.get(`${config.api}/build`)
      .then((respons) => {
        setWebName(respons.data.webName);
        console.log(respons.data, "khkhkhk");

      })
    console.log(getBuild);
  }
  getData();
  useEffect(() => {
    window.onscroll = () => {
      if (window.pageYOffset > 100) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
  }, []);

  const handleScroll = (hash: string) => {
    const element = document.getElementById(hash.substring(1));
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 100,
        behavior: 'smooth',
      });
    }
  }

  function scrollToBottom(): void {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: 'smooth'
    });
  }

  return (
    <div id="home">
      <header >
        <div id="navbar" className={scrolled ? 'navbar' : 'navbar top'}>
          <h1 className="logo">
            <span className="text-primary">
              <ClockCircleOutlined style={{ marginRight: '0.5rem' }} /> {webName}
            </span>
          </h1>
          <nav>
            <ul>
              <li>
                <Link to="/homeAdmin" onClick={() => handleScroll('/homeAdmin')}>
                  Home
                </Link>
              </li>
              <li>
                <Link to="/TurnTable" onClick={() => handleScroll('/addTurnTurnTable')}>Turn Diary </Link>
              </li>
              <li>
                <a onClick={scrollToBottom}>About</a>
              </li>
              <li>
              </li>
            </ul>
          </nav>
        </div>
      </header>
    </div>
  );
}
export default ResponsiveAppBarAdmin;