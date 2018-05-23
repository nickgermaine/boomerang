import React, {Component} from 'react';

class MailReply extends Component {
    constructor(props){
        super(props);

        this.state = {
            open: false
        }
    }

    render(){
        return (
            <div className="listview__item bg-white message-container" onClick={(e) => this.props.onClick(e)}>

                <i className="avatar-char bg-light-blue float-left">N</i>




                <div className="listview__content reply-content">
                    <div className="row">

                        <div className="col-sm-11">
                            <span className="hint">Reply</span>
                        </div>
                        <div className="col-sm-1 text-right">
                            <div className="actions">
                                <a href="#" className="zmdi zmdi-arrow-right actions__item"></a>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}

export default MailReply;