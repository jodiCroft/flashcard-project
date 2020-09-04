import React from "react";
import CreateSet from "./CreateSet";
import CardsContainer from "./CardsContainer";
import Home from "./Home";
import Header from "./Header";
import Login from "./Login";
import MyIndex from "./MyIndex";
import SignUp from "./SignUp";
import StudySet from "./StudySet";
import Browse from "./Browse";
import { Route, withRouter } from "react-router-dom";

import "../App.css";
import { render } from "react-dom";

class App extends React.Component {
  state = {
    currentUser: "",
  };

  componentDidMount() {
    console.log(this.props);
    fetch("http://localhost:3000/is_logged_in", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((response) => {
        if (response.success === true) {
          this.setState({ currentUser: response.user });
        }
        console.log(this.state.currentUser);
        this.props.history.push(`/home`);
      });
  }

  handleLogin = (e) => {
    e.preventDefault();
    fetch("http://localhost:3000/login", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        username: e.target.username.value,
        password: e.target.password.value,
      }),
    })
      .then((res) => res.json())
      .then((user) => {
        this.setState({ currentUser: user.user });
      })
      .then(this.props.history.push("/home"));
  };

  handleLogout = () => {
    fetch("http://localhost:3000/logout", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    }).then(this.setState({ currentUser: "" }));
  };

  createCardSet = (e) => {
    e.preventDefault();

    if (this.state.currentUser.id) {
      fetch("http://localhost:3000/cardsets", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          user_id: this.state.currentUser.id,
          title: e.target.title.value,
          subject: e.target.subject.value,
          description: e.target.description.value,
        }),
      })
        .then((res) => res.json())
        .then((cardset) => {
          this.props.history.push(`/cardset/${cardset.id}/createcards`);
        });
    }
    // else this.props.history.push("/login");
  };

  // postToUserCardsets = (id) => {
  //   fetch("http://localhost:3000/user_cardsets", {
  //     method: "POST",
  //     credentials: "include",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Accept: "application/json",
  //     },
  //     body: JSON.stringify({
  //       user_id: this.state.currentUser.id,
  //       cardset_id: id,
  //     }),
  //   });
  // };

  signUp = (e) => {
    e.preventDefault();
    // fetch POST to new user and then return that new user and send them to login to be auto logged in
  };

  // isLoggedIn = () => {
  //   if (!this.state.currentUser.id) {
  //     this.props.history.push("/login");
  //   }
  // };

  render() {
    return (
      <div>
        <Header
          currentUser={this.state.currentUser}
          handleLogout={this.handleLogout}
        />
        <Route
          path="/home"
          component={() => <Home currentUser={this.state.currentUser} />}
        />

        <Route
          path="/sign-up"
          component={() => (
            <SignUp
              currentUser={this.state.currentUser}
              handleLogin={this.signUp}
            />
          )}
        />

        <Route
          path="/login"
          component={() => <Login handleLogin={this.handleLogin} />}
        />

        <Route
          path="/my-index"
          component={() => (
            <MyIndex
              currentUser={this.state.currentUser}
              // cardsets={this.state.cardsets}
            />
          )}
        />

        <Route path="/browse" component={() => <Browse />} />

        {/* <Route path={`/cardset/:id/study`} component={() => <StudySet />} /> */}

        <Route
          path="/cardset/create"
          component={() => (
            <CreateSet
              currentUser={this.state.currentUser}
              createCardSet={this.createCardSet}
            />
          )}
        />
        <Route
          path={`/cardset/:id/createcards`}
          component={() => <CardsContainer />}
        />

        {/* TEST FORM FOR CREATE FLASHCARDS: */}
        {/* <div>
          <form onSubmit={(e) => this.handleCreate(e)} className="CreateSet">
            <label>
              Set Title:
              <input type="text" name="title" />
            </label>
            <label>
              Description:
              <input type="text" name="description" />
            </label>
            <label>
              Subject:
              <input type="text" name="subject" />
            </label>
            <div>
              <h4>Front:</h4>
              <textarea name="front"></textarea>
              <h4>Back:</h4>
              <textarea name="back"></textarea>
              <h4>Hint:</h4>
              <textarea name="hint"></textarea>
            </div>

            <input type="submit" value="Submit" />
          </form>
        </div>
        <div>Log In Form:</div>
        <div>
          <form onSubmit={(e) => this.handleLogin(e)}>
            <label>User Name</label>
            <input type="text" name="username" />
            <label>Password</label>
            <input type="password" name="password" />
            <input type="submit" value="Log In" />
          </form>
          <button onClick={this.handleLogout}>Log Out</button>
        </div> */}
      </div>
    );
  }
}

export default withRouter(App);
