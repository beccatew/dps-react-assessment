import React from 'react';
import { Container, Grid, Card, Button, Modal, Image, Header, Divider, Input } from 'semantic-ui-react';
import { connect } from 'react-redux';
import axios from 'axios';
import beerpic from '../images/beerpic.jpg';

const cardStyle = {
  display: 'block',
  height: '380px',
  width: '250px',
};

const content = {
  textAlign: 'center',
  marginBottom: '15px',
};

const button = {
  display: 'flex',
  textAlign: 'center',
};

const name = {
  display: 'flex',
  textAlign: 'left',
  alignItems: 'center',
  height: '50px',
};


class Beers extends React.Component {
  state = {
    beers: [],
    visible: [],
    search: [],
   }

  componentDidMount() {
    axios.get('/api/all_beers')
      .then( res => {
        let beers = res.data.entries;
        this.setState({ beers })
  }).catch(err => {
    console.log("Error! Oopsies")
  });
}

  handleChange = (e) => {
    this.setState({ search: e.target.value }, () => {
      this.updateVisible()
    });
  }

  updateVisible = () => {
    let { search, beers } = this.state;
    let results;
    if (search.length === 0)
      this.setState({ visible: beers });
    else if (search.length > 3 ) {
      axios.get(`/api/search?term=${search}`)
        .then( res => this.setState({ visible: res.data }) )
    }
  }


render() {
  let beers = this.state.beers;
  return (
      <Container>

        <Input fluid noResultsDescription
          value={this.state.search}
          onChange={this.handleChange}
          icon={{ name: 'search', circular: true }}
          placeholder="Search Beers..."
        />

        <Header width={16} style={{display: "flex", justifyContent: "center", fontSize: "10vw", color: "white"}}>Beer!</Header>

        <Grid>
          { beers.map(b =>
            <Grid.Column computer={4} tablet={16} mobile={16}>
              <Grid.Row itemsPerRow={4}>
              <Card style={cardStyle}>
                <Card.Content style={content}>
                  <h4 style={name}>{b.name}</h4>
                  <Divider />
                  <Card.Meta>{b.style.category.name}</Card.Meta>
                  <br />
                  <Image wrapped size='medium' src={beerpic} />
                  <br />
                  <br />
                  <Modal trigger={<Button>More Info</Button>}>
                    <Modal.Content image>
                    <Image wrapped size='medium' src={beerpic} />
                      <Modal.Description>
                        <Header>{b.name}</Header>
                        <p><b>ABV% {b.abv}</b></p>
                        <h3>{b.style.short_name}</h3>
                        <p>{b.description}</p>
                      </Modal.Description>
                    </Modal.Content>
                  </Modal>
                </Card.Content>
              </Card>
              </Grid.Row>
            </Grid.Column>
            )
          }
      </Grid>
     </Container>
    );
  }
}

export default connect()(Beers);
