import React, {Component} from 'react';
import MailCard from './MailCard';

import colors from '../../utils/colors';
import Websocket from 'react-websocket';

const threads = [
    {
        subject: 'About that thing..',
        names: ['Someone', 'Raz', 'me'],
        time: new Date(),
        messages: [
            {
                from: 'someone@example.com',
                message: '<div>I really hope it works.</div>',
                time: new Date()
            },
            {
                from: 'me',
                message: '<div>It should.</div>',
                time: new Date()
            },
            {
                from: 'someone@example.com',
                message: '<div>Ill do it and well see.  Worst case scenario, it doesnt.  Then what?</div>',
                time: new Date()
            }
        ]
    },
    {
        subject: 'One more time.',
        names: ['A person', 'me'],
        time: new Date(),
        messages: [
            {
                from: 'someone@example.com',
                message: '<div>I really hope it works.</div>',
                time: new Date()
            },
            {
                from: 'me',
                message: '<div>It should.</div>',
                time: new Date()
            },
            {
                from: 'someone@example.com',
                message: '<div>Ill do it and well see.  Worst case scenario, it doesnt.  Then what?<br /><br /><p>I mean you could always write back to me you know.</p></div>',
                time: new Date()
            }
        ]
    }
]

class Mailbox extends Component {

    componentWillMount(){
        let box = this.props.match.params.folder;
        switch(box){
            case 'inbox':
                box = 'INBOX';
                break;
            default:
                box = box;
                break;
        }
        this.props.getMailboxMessages(box, this.props.user);
        let user = this.props.user;
        window.user = JSON.parse(JSON.stringify(this.props.user));
        let self = this;

        this.poll = setInterval(function(){
            self.props.poll(box, window.user, self.props.lastMessageCount);
        }, 30000)

        this.props.getContacts(this.props.user);
    }

    componentWillUnmount(){
        clearInterval(this.poll);

    }

    componentWillUpdate(nextProps){
        if(nextProps.match.params.folder !== this.props.match.params.folder){
            let box = nextProps.match.params.folder;
            switch(box){
                case 'inbox':
                    box = 'INBOX';
                    break;
                default:
                    box = box;
                    break;
            }
            this.props.getMailboxMessages(box, this.props.user);
        }
    }

    render(){

        let recentContacts = this.props.contacts.length < 5 ? this.props.contacts : this.props.contacts.slice(0, 4);


        return (
            <section className="">
                <div className="page-loader">
                    <div className="page-loader__spinner">
                        <svg viewBox="25 25 50 50">
                            <circle cx="50" cy="50" r="20" fill="none" stroke-width="2" stroke-miterlimit="10" />
                        </svg>
                    </div>
                </div>
                <div className="content__inner content__inner--md">

                    <Websocket url='ws://localhost:8888/nick'
                               onMessage={(data) => {

                                   console.log("Received", data);
                               }}/>

                    <div className="compose-init">

                        {recentContacts.map(c => {
                            return (
                                <i
                                    className={`avatar-char bg-${colors[c.email[0].toLowerCase()]}`}
                                    data-toggle="tooltip"
                                    data-placement="left"
                                    data-original-title={c.email}
                                    onMouseEnter={(e) => this.setState({nameHovered: true})}>{c.email[0].toUpperCase()}</i>
                            )
                        })}


                        <button className={"btn btn--icon btn-lg btn-danger compose-btn"}
                            onClick={(e) => this.props.requestDraftOpen({})}
                        ><span className="zmdi zmdi-plus"></span></button>
                    </div>

                    <div className="listview">
                    {
                        this.props.messages.length > 0 ?
                        this.props.messages.map((thread, i) => {
                            if(thread.type == 'header'){
                                return (
                                    <header key={i} className="content__title thread-divider">
                                        <h6 className="hint">{thread.label}</h6>


                                        <div className="actions">
                                            <a className="actions__item zmdi zmdi-refresh-alt" onClick={(e) => {
                                                let box = this.props.match.params.folder;
                                                switch(box){
                                                    case 'inbox':
                                                        box = 'INBOX';
                                                        break;
                                                    default:
                                                        box = box;
                                                        break;
                                                }
                                                this.props.getMailboxMessages(box, this.props.user);

                                            }}></a>
                                            <a href="" className="actions__item zmdi zmdi-check-all"></a>
                                        </div>
                                    </header>
                                    )

                            }else {
                                if (thread.messages.length > 0) {
                                    return (
                                        <MailCard
                                            thread={thread}
                                            key={i}
                                            index={i}
                                            user={this.props.user}
                                            getRelatedMessages={this.props.getRelatedMessages}
                                            markMessagesDone={this.props.markMessagesDone}
                                            loadingIndexes={this.props.loadingIndexes}
                                            addDraftReply={(message) => this.props.requestDraftOpen(message)}
                                            match={this.props.match}
                                            sendMessage={this.props.sendMessage}
                                        />
                                    )
                                }
                            }
                    })

                            : null }
                </div>
                </div>
            </section>
        )
    }
}

export default Mailbox;