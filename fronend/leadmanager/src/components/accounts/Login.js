import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { login } from "../../actions/auth";

class Login extends Component {
  state = {
    username: "",
    password: ""
  };

  static propTypes = {
    login: PropTypes.func.isRequired,
    isAthenticated: PropTypes.bool
  };

  onSubmit = e => {
    const { username, password } = this.state;
    e.preventDefault();
    this.props.login(username, password);

    this.setState({
      username: "",
      password: ""
    });
  };

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  render() {
    if (this.props.isAuthenticated) {
      return <Redirect to="/" />;
    }

    const { username, password } = this.state;

    return (
      <div className="container py-5">
        <div className="row">
          <div className="col-md-12">
            <div className="row">
              <div className="col-md-6 mx-auto">
                <div className="card border-secondary">
                  <div className="card-header">
                    <h3 className="mb-0 my-2">Sign In</h3>
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
                        <button
                          type="submit"
                          className="btn btn-success btn-lg float-right"
                        >
                          Login
                        </button>
                        <p>
                          Don't have an account ?{" "}
                          <Link to="/register">Register</Link>
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
  { login }
)(Login);
