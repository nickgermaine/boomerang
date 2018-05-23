import React, {Component} from 'react';

import LoginContainer from "../containers/Login/LoginContainer";
import App from "./App";

/**
 *
 * @param authorized
 */
class Top extends Component {
    renderContent = () => {
        const {
            auth: {authorized},
            sidebar
        } = this.props;

        if (authorized) {
            return (
                <App user={this.props.auth} location={this.props.location} logout={() => this.props.logout()}/>

            );
        }

        return (
            <LoginContainer pathname={this.props.location.pathname}/>
        );
    };

    render() {

        if (!this.props._persist.rehydrated) {
            return null;
        }

        let theme = 'blue';

        switch(this.props.location.pathname){
            case '/m/done':
                theme = 'green';
                break;
            case '/m/snoozed':
                theme = 'orange';
                break;
            default:
                theme = 'blue';
                break;
        }

        return (
            <div data-ma-theme={theme}>

                {this.renderContent()}
            </div>
        );
    }
}

Top.propTypes = {};

export default Top;
