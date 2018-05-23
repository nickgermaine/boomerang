import React, {Component} from 'react';

class Login extends Component {

    constructor(props){
        super(props);

        this.state = {
            email: '',
            password: '',
            regName: '',
            regEmail: '',
            regPassword: '',
            regTOS: false,
            regGender: '',
            regBirthdate: '',
        }
    }

    register = () => {
        let user = {
            email: this.state.regEmail,
            name: this.state.regName,
            birthdate: this.state.regBirthdate,
            gender: this.state.regGender,
            password: this.state.regPassword
        }

        this.props.onRegister(user);
    }

    login = () => {
        this.props.onLogin({email: this.state.email, password: this.state.password});
    }

    render(){
        let ready = (this.state.regName && this.state.regPassword && this.state.regTOS && this.state.regGender && this.state.regBirthdate);

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
                        <h1><a href="index.html">Material Admin 2.0</a></h1>
                    </div>

                    <form className="ml-auto">
                        <div className="row">
                            <div className="col-md-4">
                                <i className="zmdi zmdi-mail"></i>
                                <input
                                    className="search__text  display-inline"
                                    placeholder={"Email"}
                                    value={this.state.email}
                                    onChange={(e) => this.setState({email: e.target.value})}
                                />

                            </div>
                            <div className="col-md-4">
                                <input
                                    className="search__text form-inline display-inline"
                                    placeholder="Password"
                                    type="password"
                                    value={this.state.password}
                                    onChange={(e) => this.setState({password: e.target.value})}
                                />
                            </div>
                            <div className={"col-md-4"}>
                                <button
                                    className="btn btn-raised btn-default btn-md"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        this.login();
                                    }}
                                >Login</button>
                            </div>


                        </div>
                    </form>


                </header>



                <section className="content content--full">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-6">
                                <div className="card">
                                    <div className="card-header">
                                        <h2 className="card-title">The only ethical network</h2>

                                        <p>Join us today to start using the only social network with ethics.</p>

                                        <ul>
                                            <li>Your data will never be sold to the highest bidder (or any bidder)</li>
                                            <li>Your first-amendment rights apply here</li>
                                            <li>You will not be tracked</li>
                                            <li>We will never infringe on your right to privacy</li>
                                        </ul>
                                    </div>

                                    <div className="card-block">

                                    </div>
                                </div>
                            </div>
                            <div className="col-md-1"></div>
                            <div className={"col-md-5"}>
                                <h4>Sign up</h4>
                                <p>It's free, and we don't track you</p>
                                <br /><br />
                                <input
                                    className={"form-control"}
                                    placeholder={"Full Name"}
                                    value={this.state.regName}
                                    onChange={(e) => {
                                        this.setState({regName: e.target.value});
                                    }}
                                />
                                <br />
                                <input
                                    className={"form-control"}
                                    placeholder={"Email Address"}
                                    value={this.state.regEmail}
                                    onChange={(e) => {
                                        this.setState({regEmail: e.target.value});
                                    }}
                                />

                                <br />
                                <input
                                    className={"form-control"}
                                    type={"password"}
                                    placeholder={"Password"}
                                    value={this.state.regPassword}
                                    onChange={(e) => {
                                        this.setState({regPassword: e.target.value});
                                    }}
                                />
                                <br />

                                <select
                                    className="form-control"
                                    placeholder="Gender"
                                    value={this.state.regGender}
                                    onChange={(e) => {
                                        this.setState({regGender: e.target.value});
                                    }}
                                >
                                    <option>Male</option>
                                    <option>Female</option>
                                </select>

                                <br />

                                <input
                                    className="form-control"
                                    type="date"
                                       value={this.state.regBirthdate}
                                       onChange={(e) => {
                                            this.setState({regBirthdate: e.target.value})
                                        }}
                                       />

                                <br />

                                <div className="custom-control custom-checkbox">
                                    <input
                                        className="custom-control-input"
                                        id="tos"
                                        type="checkbox"
                                        checked={(this.state.regTOS)}
                                        onChange={(e) => {
                                            this.setState({regTOS: !this.state.regTOS});
                                        }}
                                    />
                                        <label className="custom-control-label" htmlFor="tos">I agree to the Terms of Service</label>
                                </div>

                                <br />
                                <div className="text-right">
                                    <button
                                        className="btn btn-primary"
                                        disabled={!ready}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            this.register();
                                        }}
                                    >Sign Up</button>
                                </div>
                            </div>
                        </div>
                    </div>



                    <footer className="footer hidden-xs-down">
                        <p>© Material Admin Responsive. All rights reserved.</p>

                        <ul className="nav footer__nav">
                            <a className="nav-link" href="">Homepage</a>

                            <a className="nav-link" href="">Company</a>

                            <a className="nav-link" href="">Support</a>

                            <a className="nav-link" href="">News</a>

                            <a className="nav-link" href="">Contacts</a>
                        </ul>
                    </footer>
                </section>
            </main>
        )
    }
}

export default Login;