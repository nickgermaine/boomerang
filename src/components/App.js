import React, { Component } from 'react';
import logo from '../logo.svg';
import './App.css';
import SidebarContainer from '../containers/Sidebar/SidebarContainer';
import 'react-notifications/lib/notifications.css';
import {NotificationContainer} from 'react-notifications';

import HomeContainer from '../containers/Home/HomeContainer';
import ProfileContainer from '../containers/Profile/ProfileContainer';
import MailboxContainer from '../containers/Mail/MailboxContainer';
import OpenDraftContainer from '../containers/Mail/OpenDraftsContainer';

import {Link, Redirect, Route, Switch} from "react-router-dom";

class App extends Component {
  render() {


    let view = this.props.location.pathname.replace('/m/', '');
    let suffix = view.replace(view.charAt(0), '');
    let title = view[0].toUpperCase() + suffix;


    return (
        <main className="main">


            <header className="header">
                <div className="navigation-trigger hidden-xl-up" data-ma-action="aside-open" data-ma-target=".sidebar">
                    <div className="navigation-trigger__inner">
                        <i className="navigation-trigger__line"></i>
                        <i className="navigation-trigger__line"></i>
                        <i className="navigation-trigger__line"></i>
                    </div>
                </div>

                <div className="header__logo hidden-sm-down mr-auto">
                    <h1><a href="index.html">{title}</a></h1>
                </div>

                <form className="search">
                    <div className="search__inner">
                        <input type="text" className="search__text" placeholder="Search for people, files, documents..." />
                            <i className="zmdi zmdi-search search__helper" data-ma-action="search-close"></i>
                    </div>
                </form>

                <ul className="top-nav">


                    <li className="hidden-xl-up"><a href="" data-ma-action="search-open"><i className="zmdi zmdi-search"></i></a></li>

                    <li className="dropdown">
                    </li>


                    <li className="dropdown hidden-xs-down">
                        <a href="" data-toggle="dropdown"><i className="zmdi zmdi-more-vert"></i></a>

                        <div className="dropdown-menu dropdown-menu-right">

                            <a href="/logout" className="dropdown-item" onClick={(e) => {
                                e.preventDefault();
                                this.props.logout();

                            }}>Log Out</a>
                            <a href="" className="dropdown-item">Clear Local Storage</a>
                        </div>
                    </li>
                </ul>


            </header>

            <SidebarContainer user={this.props.user.user} location={this.props.location} />


            <section className="content">
                <Switch>
                    <Route
                        exact
                        path="/login"
                        render={
                            () => (
                                <Redirect
                                    to="/dashboard"
                                    component={HomeContainer}
                                />
                            )
                        }
                    />

                    <Route
                        exact
                        path="/signup"
                        render={
                            () => (
                                <Redirect
                                    to="/dashboard"
                                    component={HomeContainer}
                                />
                            )
                        }
                    />

                    <Route
                        exact
                        path="/"
                        render={
                            () => (
                                <Redirect
                                    to="/m/inbox"
                                    component={MailboxContainer}
                                />
                            )
                        }
                    />

                    <Route
                        exact
                        path="/profile/:username"
                        component={ProfileContainer}
                        />

                    <Route
                        exact
                        path="/profile"
                        component={ProfileContainer}
                    />

                    <Route
                        path="/m/:folder"
                        component={MailboxContainer}
                    />

                    <Route
                        exact
                        path="/m"
                        render={() => (
                            <Redirect
                                to="/m/inbox"
                                component={MailboxContainer}
                                />
                        )}
                        />

                </Switch>



                <OpenDraftContainer />

            </section>
        </main>
    );
  }
}

export default App;
