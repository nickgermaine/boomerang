import React, {Component} from 'react';
import moment from 'moment';
import Lightbox from 'react-image-lightbox';
import $ from 'jquery';

class MailMessage extends Component {
    constructor(props){
        super(props);

        this.state = {
            open: this.props.open,
            lightboxOpen: false,
            photoIndex: 0,
            replying: false
        }


    }


    frameLoaded = (obj) => {
        let parser = new DOMParser();
        let el = parser.parseFromString(obj.target.innerHTML, "text/html");
        //obj.target.style.height = obj.target.contentWindow.document.body.scrollHeight + 'px';
    }

    render(){

        let images = (this.props.message.attachments) ? this.props.message.attachments.map(a => {
            if(a.type.indexOf('image') > -1) {
                return 'data:image/png;base64,' + a.data;
            }
        }) : []

        let attachments = (this.props.message.attachments) ? this.props.message.attachments.map(a => {
            if(a.type.indexOf('image') == -1){

                return {name: a.name, data: 'data:' + a.type.split(';')[0] + ';base64,' + a.data};

            }
        }) : []

        return (
            <div className="listview__item bg-white message-container">

                    <i className="avatar-char bg-light-blue float-left">{this.props.message.headers.From[0]}</i>




                    <div className="listview__content message-content">
                        <div className="row">

                            <div className="col-sm-12">
                                <h4 className="card-body__title small-title">
                                    <div className="float-right hint"></div>
                                    {this.props.message.headers.From}
                                </h4>
                                {this.props.message.BODY.html ?
                                    (this.props.message.BODY.html.data.indexOf('<style') > -1) ?
                                            <iframe className="safe-frame" onLoad={(e) => this.frameLoaded(e)} src={"data:text/html;charset=utf-8," + escape(this.props.message.BODY.html.data.replace(new RegExp('href=', 'g'), 'target="_blank" href='))} />
                                        :
                                            <div dangerouslySetInnerHTML={{__html: this.props.message.BODY.html.data.replace(new RegExp('href=', 'g'), 'target="_blank" href=')}}></div>
                                    :
                                    (this.props.message.BODY.plain) ?
                                    <div dangerouslySetInnerHTML={{__html: this.props.message.BODY.plain.data.replace(new RegExp('\r\n', 'g'), '<br />').replace(new RegExp('href=', 'g'), 'target="_blank" href=')}}></div>
                                        : <div>Nothing</div>
                                }

                                {this.props.message.attachments &&
                                    <div>
                                        {
                                            images.map((a, i) => {
                                                if(a) {
                                                    return <img
                                                        onClick={(e) => this.setState({
                                                            lightboxOpen: true,
                                                            photoIndex: i
                                                        })}
                                                        className="attachment-img" src={a}/>
                                                }
                                            })}

                                        {
                                            attachments.map((a, i) => {
                                                if(a) {
                                                    return <a onClick={e => {
                                                        e.preventDefault();
                                                        let link = document.createElement('a');
                                                        link.href = a.data;
                                                        link.download = a.name;
                                                        document.body.appendChild(link);
                                                        link.click();
                                                        link.remove();
                                                    }}
                                                              download={a.name}>

                                                <span className="attachment-container"><i
                                                    className="zmdi zmdi-download"></i>
                                                    <span className={"attachment-name"}>{a.name}</span>
                                                </span>
                                                    </a>
                                                }
                                        })
                                        }
                                    </div>
                                }

                                {this.state.lightboxOpen && (
                                    <Lightbox
                                        mainSrc={images[this.state.photoIndex]}
                                        nextSrc={images[(this.state.photoIndex + 1) % images.length]}
                                        prevSrc={images[(this.state.photoIndex + images.length - 1) % images.length]}
                                        onCloseRequest={() => this.setState({ lightboxOpen: false })}
                                        onMovePrevRequest={() =>
                                            this.setState({
                                                photoIndex: (this.state.photoIndex + images.length - 1) % images.length,
                                            })
                                        }
                                        onMoveNextRequest={() =>
                                            this.setState({
                                                photoIndex: (this.state.photoIndex + 1) % images.length,
                                            })
                                        }
                                    />
                                )}

                            </div>
                        </div>
                    </div>

            </div>
        )
    }
}

export default MailMessage;