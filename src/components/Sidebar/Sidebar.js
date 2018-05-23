import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class Sidebar extends Component {
    componentWillMount(){
        console.log("getting folders for")
        this.props.getFolders(this.props.user);
    }

    mapFolders = () => {
        return this.props.folders.map((folder, index) => {
            if(folder.name !== 'INBOX' && folder.name !== 'Done'){

                let icon;

                switch(folder.name){
                    case 'Drafts':
                        icon = 'zmdi-email-open';
                        break;
                    case 'Trash':
                        icon = 'zmdi-delete';
                        break;
                    case 'Spam':
                        icon = 'zmdi-alert-octagon';
                        break;
                    case 'Sent':
                        icon = 'zmdi-mail-send';
                        break;
                    default:
                        icon = 'zmdi-folder';
                        break;
                }

                return (
                    <li key={index}><Link to={"/m/" + folder.name} className={(this.props.location.pathname == "/m/" + folder.name ? "active" : "")}>
                        <i className={"zmdi " + icon}></i> {folder.name}</Link>
                    </li>
                )
            }
        });
    }
    render(){
        return (
            <aside className={(this.props.mail.messages.length > 0) ? "sidebar" : "sidebar"}>
                <div className="scrollbar-inner">


                    <ul className="navigation">
                        <li><Link to="/m/inbox" className={(this.props.location.pathname == '/m/inbox' ? "active" : "")}>
                            <i className="zmdi zmdi-inbox text-primary"></i> Inbox</Link>
                        </li>
                        <li><Link to="/m/snoozed" className={(this.props.location.pathname == '/m/snoozed' ? "active" : "")}>
                            <i className="zmdi zmdi-time text-warning"></i> Snoozed</Link>
                        </li>
                        <li><Link to="/m/done" className={(this.props.location.pathname == '/m/done' ? "active" : "")}>
                            <i className="zmdi zmdi-check text-success"></i> Done</Link>
                        </li>
                        <li className="divider"></li>

                        {this.props.folders &&
                        this.mapFolders()
                        }


                    </ul>
                </div>
            </aside>
        )
    }
}

export default Sidebar;