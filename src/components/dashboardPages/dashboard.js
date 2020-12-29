import React, { Component } from "react";
import GoogleMapReact from "google-map-react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { deviceList, deviceDetail } from "../../actions/actions";
import { Container, Row, Col, Form } from "react-bootstrap";
import Marker from "./marker";
class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      center: {
        lat: 22.757744444444445,
        lng: 72.64225777777777
      },
	  zoom: 12,
	  deviceDetails:null,
	  deviceGps:[]
    };

    navigator.geolocation.getCurrentPosition(this.showMap);
  }
  componentDidMount() {
    this.props.deviceList();
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.deviceDetaillist !== prevState.deviceDetails) {
      return {
		deviceDetails: nextProps.deviceDetaillist
	  }
	}
	return null
  }

  componentDidUpdate(prevProps, prevState){
	if(prevProps.deviceDetaillist !== this.props.deviceDetaillist){
		console.log(this.state)
		this.deviceDetail();
	}
  }

  getDeviceId = e => {
    let id = e.target.value;
    this.props.deviceDetail(id);
  };

  deviceDetail = () => {
    let result = this.state.deviceDetails['result'];
    result.map(res => {
		this.setState({deviceGps:[...res.gps]})
	});
	this.setState({zoom:22})
	console.log(this.state.zoom)
  };

  showMap = position => {
    const state = this.state;
    state.center["lat"] = position.coords.latitude;
    state.center["lng"] = position.coords.longitude;
    this.setState({ state });
  };


  render() {
    return (
      <Container fluid={true}>
        <Row>
          <Col md={8}>
            <GoogleMapReact
              style={{ height: "100vh", width: "100%" }}
              apiKey="AIzaSyDf4nIBlAk7u7z2kpZE-GkqM3W_8BM3Dk8"
              defaultCenter={this.state.center}
              defaultZoom={this.state.zoom}
            >
              <Marker
                text="My Marker"
                lat={this.state.center.lat}
                lng={this.state.center.lng}
              />
            </GoogleMapReact>
          </Col>
          <Col md={4}>
            <div className="listdevice">
              {this.props.lists !== null ? (
                this.props.lists.result.map((e, i) => {
                  return (
                    <Form.Check
                      className="radioSelector"
                      key={i}
                      type="radio"
                      name="device"
                      value={e.device}
                      label={e.device}
                      onChange={this.getDeviceId}
                    />
                  );
                })
              ) : (
                <h1>Loading ... </h1>
              )}
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}
const mapStateToProps = state => {
  return {
    lists: state.devicelist,
    deviceDetaillist: state.deviceDetail
  };
};
const mapDispatchToState = dispacth => {
  return bindActionCreators(
    {
      deviceList: deviceList,
      deviceDetail: deviceDetail
    },
    dispacth
  );
};
export default connect(
  mapStateToProps,
  mapDispatchToState
)(Dashboard);
