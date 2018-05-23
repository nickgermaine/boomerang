import React, {Component} from 'react';
import MailMessage from './MailMessage';
import MailReply from './MailReply';
import Compose from './Compose';
import colors from '../../utils/colors';

class MailCard extends Component {
    constructor(props){
        super(props);
        this.state = {
            nameHovered: false,
            open: false,
            itemHovered: false,
            replying: false,
            checked: false
        }
    }

    getMessageDetails = () => {
        this.setState({open: !this.state.open});
        this.props.getRelatedMessages(this.props.index,
            this.props.thread.messages[this.props.thread.messages.length - 1].headers.References,
            this.props.user,
            this.props.thread.messages[this.props.thread.messages.length - 1].headers['Message-ID'],
            this.props.match.params.folder);
    }

    renderListItem = () => {

        let from = []

        this.props.thread.messages.map(msg => {
            if(msg.headers.From.indexOf('<') > -1){
                if(from.indexOf(msg.headers.From.split(' <')[0]) === -1) {
                    from.push(msg.headers.From.split(' <')[0]);
                }
            }else{
                if(from.indexOf(msg.headers.From) === -1){
                    from.push(msg.headers.From);
                }
            }
        });

        let fromLetter = from[0][0];
        let fromColor = colors[fromLetter.toLowerCase()];

        let seen = (this.props.thread.messages[this.props.thread.messages.length - 1].flags.indexOf('\\Seen') > -1);
        let subject = this.props.thread.messages[this.props.thread.messages.length - 1].headers.Subject;
        return (
            <div className={(seen) ? "listview__item bg-white message-list-item" : "listview__item bg-white message-list-item unseen"}
                 onMouseEnter={(e) => this.setState({itemHovered: true})}
                onMouseLeave={(e) => this.setState({itemHovered: false})}
            >

                {(this.state.nameHovered || this.state.checked) ?
                    <div className="custom-control custom-checkbox" onMouseLeave={(e) => this.setState({nameHovered: false})}>
                        <input className="custom-control-input" id="customCheck15" type="checkbox" checked={this.state.checked}
                        onChange={(e) => {
                            this.setState({checked: !this.state.checked});
                        }
                        }
                        />
                        <label className="custom-control-label" htmlFor="customCheck1"></label>
                    </div>
                    :
                    <i className={`avatar-char bg-${fromColor}`} onMouseEnter={(e) => this.setState({nameHovered: true})}>{fromLetter}</i>

                }




                <div className="listview__content message-preview">
                    <div className="row">
                        <div className="col-sm-2" onClick={(e) => this.getMessageDetails()}>
                            <h4 className="card-body__title">
                                {from.join(', ')}
                            </h4>
                        </div>
                        <div className="col-sm-7" onClick={(e) => this.getMessageDetails()}>
                            <span className="card-body__title subject">
                                {subject || '(no subject)'} <i className="zmdi zmdi-minus"></i>
                            </span> <span className="message-preview-content">{this.props.thread.messages[this.props.thread.messages.length - 1].BODY.plain.data}...</span>

                        </div>
                        <div className="col-sm-3 text-right">
                            <div className={(this.state.itemHovered) ? "actions" : "actions scale0"}>
                                <a className="actions__item zmdi zmdi-time"></a>
                                <a className="actions__item zmdi zmdi-delete"></a>
                                <a className={this.props.thread.messages[this.props.thread.messages.length - 1].flags.indexOf('DONE') > -1 ? "actions__item zmdi zmdi-check text-success" : "actions__item zmdi zmdi-check"}onClick={(e) => {
                                    e.preventDefault();
                                    let ids = this.props.thread.messages.map(msg => {
                                        return msg.headers['Message-ID'];
                                    })

                                    this.props.markMessagesDone(ids, this.props.user);
                                }}></a>
                                <a className="actions__item zmdi zmdi-more-vert" data-toggle="dropdown"></a>
                                <div className="dropdown-menu dropdown-menu-right"><a href="/logout" className="dropdown-item">Log Out</a><a href="" className="dropdown-item">Clear Local Storage</a></div>

                            </div>
                        </div>
                    </div>
                </div>

            </div>

        )
    }

    renderCard = () => {
        return (
            <div className="card open">
                <div className="card-body padding-10" >
                    <div className="row">
                        <div className="col-sm-6" onClick={(e) => this.setState({open: !this.state.open})}>
                            <span className="subject-lg">
                            {this.props.thread.messages[this.props.thread.messages.length - 1].headers.Subject || '(no subject)'}
                            </span>
                        </div>
                        <div className="col-sm-6 text-right">
                            <div className={"actions"}>
                                <a className="actions__item zmdi zmdi-time"></a>
                                <a className="actions__item zmdi zmdi-delete"></a>
                                <a className="actions__item zmdi zmdi-check" onClick={(e) => {
                                    e.preventDefault();
                                    let ids = this.props.thread.messages.map(msg => {
                                        return msg.headers['Message-ID'];
                                    })

                                    this.props.markMessagesDone(ids, this.props.user);
                                }}></a>
                                <a className="actions__item zmdi zmdi-more-vert" data-toggle="dropdown"></a>
                                <div className="dropdown-menu dropdown-menu-right"><a href="/logout" className="dropdown-item">Log Out</a><a href="" className="dropdown-item">Clear Local Storage</a></div>

                            </div>
                        </div>
                    </div>
                </div>
                    <div className="row">
                        <div className="listview col-sm-12">

                            {this.props.loadingIndexes.indexOf(this.props.index) > -1 ?
                                <div>
                                    <div className="loader">
                                        <div className="page-loader__spinner">
                                            <svg viewBox="25 25 50 50">
                                                <circle cx="50" cy="50" r="20" fill="none" stroke-width="2" stroke-miterlimit="10" />
                                            </svg>
                                        </div>
                                    </div>
                                    <MailMessage open={true} loading={true} message={this.props.thread.messages[this.props.thread.messages.length - 1]} />
                                </div>
                                : this.props.thread.messages.map((message, i) => {
                                    return <MailMessage loading={false} key={i} open={(i == this.props.thread.messages.length - 1)} message={message} />
                                })

                            }

                            {(this.state.replying) ?
                                <div className="inline-reply">
                                    <div className="listview__item bg-white message-container">

                                        <i className="avatar-char bg-light-blue float-left">{this.props.user.username[0]}</i>




                                        <div className="listview__content reply-content">
                                            <div className="row">

                                                <div className="col-sm-12">
                                                    <Compose sendMessage={this.props.sendMessage} inline={true} draft={this.props.thread.messages[this.props.thread.messages.length - 1]} user={this.props.user} />
                                                </div>

                                            </div>
                                        </div>

                                    </div>

                                </div>
                                :
                                <MailReply
                                    onClick={(e) => {
                                        //this.props.addDraftReply(this.props.thread.messages[this.props.thread.messages.length - 1]);
                                        this.setState({replying: true})
                                    }}/>
                            }
                        </div>
                    </div>
                </div>

        )
    }
    render(){
        return (
            <div>
                {(this.state.open) ?
                    this.renderCard()
                    :
                    this.renderListItem()
                }
            </div>


        )
    }
}

export default MailCard;