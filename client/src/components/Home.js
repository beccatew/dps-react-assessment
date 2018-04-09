import React, { Component } from 'react';
import { Header, Segment, Divider, Grid, Image, Container } from 'semantic-ui-react';
import ReactMarkDown from 'react-markdown';
import axios from 'axios';
import beermain from '../images/beermain.jpg';

const background = {
  backgroundImage: 'url(' + beermain + ') noRepeat center center fixed',

};

class Home extends Component {
  render() {
    return(
      <div>
        <Image src={beermain} fluid />
      </div>
    )
  }
}

export default Home;
