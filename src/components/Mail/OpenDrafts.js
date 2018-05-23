import React, {Component} from 'react';
import Compose from './Compose';

class OpenDrafts extends Component {
    render(){
        return (
            <div className="drafts">
                {this.props.openDrafts.map((d, i) => {
                    return <Compose
                        key={i}
                        draft={d}
                        index={i}
                        cancelDraft={(e) => this.props.cancelDraft(i)}
                        sendMessage={(message, index, user) => this.props.sendMessage(message, index, user)}
                        user={this.props.user}
                        contacts={this.props.contacts}
                    />
                })}
            </div>
        )
    }
}

export default OpenDrafts;