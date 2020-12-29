import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { loginauth, logOut } from "../actions/actions";
import { Button, Container, Row, Col } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      error: ""
    };
    this.props.logOut();
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    if(nextProps.tokeProps && nextProps.tokeProps['error'] !== prevState.error){
      return{
        error:nextProps.tokeProps['error']
      }
    }
    return null
  }
 
  componentDidUpdate(prevProps, prevState){
    if(prevProps.tokeProps !== this.props.tokeProps){
      this.renderRedirect()
    }
  }

  renderRedirect = () => {
    let tokeProps = this.props.tokeProps;
    if (tokeProps && tokeProps.token) {
      localStorage.setItem("token", tokeProps.token);
    }
    let storedToken = localStorage.getItem("token");
    if (storedToken && storedToken != "undefined") {
     return <Redirect to="/" />
    } else {
      return <Redirect to="/login" />;
    }
  };
  login = fields => {
    this.props.loginauth(fields);
  };
  render() {
    return (
      <Container>
        {this.renderRedirect()}
        <Row className="justify-content-md-center rows">
          <Col xs="12" md="6" lg="6">
            <Formik
              initialValues={{
                username: "",
                password: ""
              }}
              validationSchema={Yup.object().shape({
                username: Yup.string()
                  .required("usernameis required")
                  .required("username is required"),
                password: Yup.string()
                  .min(6, "Password must be at least 6 characters")
                  .required("Password is required")
              })}
              onSubmit={fields => {
                this.login(fields);
              }}
              render={({ errors, status, touched }) => (
                <Form id="formContent">
                  <div className="form-group">
                    <label htmlFor="username"> Username </label>{" "}
                    <Field
                      name="username"
                      type="text"
                      className={
                        "form-control" +
                        (errors.username && touched.username
                          ? " is-invalid"
                          : "")
                      }
                    />{" "}
                    <ErrorMessage
                      name="username"
                      component="div"
                      className="invalid-feedback"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="password"> Password </label>{" "}
                    <Field
                      name="password"
                      type="password"
                      className={
                        "form-control" +
                        (errors.password && touched.password
                          ? " is-invalid"
                          : "")
                      }
                    />{" "}
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="invalid-feedback"
                    />
                  </div>
                  <div className="form-group">
                    <button type="submit" className="btn btn-primary mr-2">
                      {" "}
                      Login{" "}
                    </button>{" "}
                    <p className="error"> {this.state.error? this.state.error:null} </p>
                  </div>
                </Form>
              )}
            />
          </Col>{" "}
        </Row>{" "}
      </Container>
    );
  }
}
const mapStateToProps = state => {
  return {
    tokeProps: state.loginauth
  };
};
const mapDispatchToState = dispacth => {
  return bindActionCreators(
    {
      loginauth: loginauth,
      logOut: logOut
    },
    dispacth
  );
};
export default connect(
  mapStateToProps,
  mapDispatchToState
)(Login);
