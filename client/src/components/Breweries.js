import React from 'react';
import { Container, Grid, Card, Button, Modal, Image, Header, Divider, Input } from 'semantic-ui-react';
import { connect } from 'react-redux';
import axios from 'axios';
import beerpic from '../images/beerpic.jpg';
import fillImage from '../images/fillImage.jpg';

const cardStyle = {
  display: 'block',
  height: '50%',
  width: '80%',
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


class Breweries extends React.Component {
  state = {
    breweries: [],
    visible: [],
    search: [],
   }

  componentDidMount() {
    axios.get('/api/all_breweries')
      .then( res => {
        let breweries = res.data.entries;
        this.setState({ breweries })
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
    let { search, breweries } = this.state;
    let results;
    if (search.length === 0)
      this.setState({ visible: breweries });
    else if (search.length > 3 ) {
      axios.get(`/api/search?term=${search}`)
        .then( res => this.setState({ visible: res.data }) )
    }
  }


render() {
  let breweries = this.state.breweries;
  return (
      <Container>
        <Input fluid noResultsDescription
          value={this.state.search}
          onChange={this.handleChange}
          icon={{ name: 'search', circular: true }}
          placeholder="Search Beers..."
        />

        <Header width={16} style={{display: "flex", justifyContent: "center", fontSize: "5vw", color: "white"}}>The Best Breweries Around</Header>

        <Grid>
          { breweries.map(d =>
            <Grid.Column computer={4} tablet={16} mobile={16}>
              <Grid.Row itemsPerRow={4}>
              <Card style={cardStyle}>
                <Card.Content style={content}>
                  <Image style={{width: "100%"}} src={ d.images? d.images.square_large : fillImage } />
                  <h4 style={name}>{d.name_short_display}</h4>
                  <Divider />
                  <Card.Meta>{d.brand_classification}</Card.Meta>
                  <Modal trigger={<Button>More Info</Button>}>
                    <Modal.Content image>
                    <Image src={beerpic} />
                      <Modal.Description>
                        <Header>{d.name}</Header>
                        <h4>Brewery Type: {d.brand_classification}</h4>
                        <p><b>Established: {d.established}</b></p>
                        <p>{d.description}</p>
                        <Image src={ d.images? d.images.square_large : fillImage } />
                        <Button href={d.website}>Website</Button>
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

export default connect()(Breweries);
