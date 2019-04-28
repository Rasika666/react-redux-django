import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { register } from "./../../actions/auth";
import { createMessage } from "./../../actions/messages";

class Register extends Component {
  state = {
    username: "",
    email: "",
    password: "",
    password2: ""
  };

  static propTypes = {
    register: PropTypes.func.isRequired,
    isAthenticated: PropTypes.bool
  };

  onSubmit = e => {
    e.preventDefault();
    const { username, email, password, password2 } = this.state;
    if (password !== password2) {
      this.props.createMessage({
        passwordNotMatch: "Password don not match"
      });
    } else {
      //new user details
      const newUser = {
        username,
        password,
        email
      };
      this.props.register(newUser);
    }

    //clear the feilds
    this.setState({
      username: "",
      email: "",
      password: "",
      password2: ""
    });
  };

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  render() {
    if (this.props.isAuthenticated) {
      return <Redirect to="/login" />;
    }

    const { username, email, password, password2 } = this.state;

    return (
      <div className="container py-5">
        <div className="row">
          <div className="col-md-12">
            <div className="row">
              <div className="col-md-6 mx-auto">
                <div className="card border-secondary">
                  <div className="card-header">
                    <h3 className="mb-0 my-2">Sign Up</h3>
                  </div>
                  <div className="card-body">
                    <form
                      className="form"
                      autoComplete="off"
                      onSubmit={this.onSubmit}
                    >
                      <div className="form-group">
                        <label htmlFor="inputName">Username</label>
                        <input
                          type="text"
                          className="form-control"
                          name="username"
                          placeholder="username"
                          value={username}
                          onChange={this.onChange}
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="inputEmail3">Email</label>
                        <input
                          type="email"
                          className="form-control"
                          name="email"
                          placeholder="email@gmail.com"
                          required=""
                          value={email}
                          onChange={this.onChange}
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="inputPassword3">Password</label>
                        <input
                          type="password"
                          className="form-control"
                          name="password"
                          placeholder="password"
                          title="At least 6 characters with letters and numbers"
                          required=""
                          value={password}
                          onChange={this.onChange}
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="inputVerify3">Verify</label>
                        <input
                          type="password"
                          className="form-control"
                          name="password2"
                          placeholder="password (again)"
                          required=""
                          value={password2}
                          onChange={this.onChange}
                        />
                      </div>
                      <div className="form-group">
                        <button
                          type="submit"
                          className="btn btn-success btn-lg float-right"
                        >
                          Register
                        </button>
                        <p>
                          Already have an account ?{" "}
                          <Link to="/login">Login</Link>
                        </p>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  { register, createMessage }
)(Register);
