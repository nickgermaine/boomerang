import React, {Component} from 'react';
import { WithContext as ReactTags } from 'react-tag-input';

// Require Editor JS files.
import 'froala-editor/js/froala_editor.pkgd.min.js';

// Require Editor CSS files.
import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/froala_editor.pkgd.min.css';

// Require Font Awesome.
import 'font-awesome/css/font-awesome.css';
import $ from 'jquery';

import FroalaEditor from 'react-froala-wysiwyg';
window.$ = $;

class Compose extends Component {


    messageTemplate = {
        headers: {
            To: [],
            From: '',
            Subject: '',
            References: ''
        },
        body: []
    }

    constructor(props){
        super(props);

        this.config = {
            placeholder: "Say something",
            toolbarBottom: true,
            toolbarButtons: ['send', 'insertFile', 'bold', 'italic', 'underline', '|', 'color', 'fontSize', 'fontFamily', 'insertImage'],
            autoFocus: (this.props.draft.BODY)
        }

        $.FroalaEditor.DefineIconTemplate('material_design', '<i class="zmdi zmdi-[NAME]"></i>');
        $.FroalaEditor.ICON_DEFAULT_TEMPLATE = 'material_design';


        $.FroalaEditor.DefineIcon('bold', {NAME: 'format-bold'});
        $.FroalaEditor.DefineIcon('insertFile', {NAME: 'attachment'});
        $.FroalaEditor.DefineIcon('italic', {NAME: 'format-italic'});
        $.FroalaEditor.DefineIcon('underline', {NAME: 'format-underlined'});
        $.FroalaEditor.DefineIcon('color', {NAME: 'format-color-text'});
        $.FroalaEditor.DefineIcon('fontSize', {NAME: 'format-size'});

        // Define an icon.
        $.FroalaEditor.DefineIcon('send', { NAME: 'arrow-right'})

        // Define a button.
        $.FroalaEditor.RegisterCommand('send', {
            // Button title.
            title: 'Send',
            text: 'Send',

            // Specify the icon for the button.
            // If this option is not specified, the button name will be used.
            icon: 'send',

            // Save the button action into undo stack.
            undo: true,

            // Focus inside the editor before the callback.
            focus: true,

            // Show the button on mobile or not.
            showOnMobile: true,

            // Refresh the buttons state after the callback.
            refreshAfterCallback: true,

            // Called when the button is hit.
            callback: function () {
                // The current context is the editor instance.
                this.sendMessage();
            },

            // Called when the button state might have changed.
            refresh: function ($btn) {
                // The current context is the editor instance.
                console.log (this.selection.element());
            }
        })

        let db = null;
        let model = '';
        if(this.props.draft.BODY){
            db = this.props.draft;

            if(db.BODY.html.data){
                model = '<br /><br /><blockquote>' + this.props.draft.BODY.html.data.replace(new RegExp('\r\n', 'g'), '<br />') + '</blockquote>';
            }else if(db.BODY.plain.data){
                model = '<br /><br /><blockquote>' + this.props.draft.BODY.plain.data.replace(new RegExp('\r\n', 'g'), '<br />') + '</blockquote>';
            }
        }

        this.state = {
            open: true,
            model: model,
            to: (this.props.draft.headers) ? [{id: 2, text: this.props.draft.headers.From}] : [],
            from: this.props.user.username,
            body: [],
            subject: (this.props.draft.headers) ? this.props.draft.headers.Subject : ''
        }
    }

    sendMessage = () => {
        console.log("Sending message");

        let message = this.messageTemplate;
        message.headers['To'] = this.state.to.map(t => {
            return t.email;

        }).join(' ');
        message.headers['Subject'] = this.state.subject;
        message.body.push(this.state.model);
        message.body.push(this.state.model);

        if(this.props.draft.headers){
            message.headers['References'] = this.props.draft.headers['References'] + " " + this.props.draft.headers['Message-ID'];
            message.headers['Subject'] = this.props.draft.headers['Subject'];
        }


        this.props.sendMessage(message, this.props.index, this.props.user);
    }


    handleModelChange = (model) => {
        this.setState({
            model: model
        });
    }

    updateState = (e, key) => {
        this.setState({[key]: e.target.value});
    }

    render(){
        return (
            <div className="draft">
                <div className="card">
                    <div className="card-header">
                        <div className="row">
                            <div className="col-sm-3">
                                <i className="zmdi zmdi-email-open"></i>
                            </div>
                            <div className="col-sm-9 text-right">
                                <div className="actions">
                                    <a className="actions__item" onClick={(e) => {
                                        e.preventDefault();
                                        this.setState({open: !this.state.open});
                                    }}><i className="zmdi zmdi-window-minimize"></i></a>

                                    <a className="actions__item" onClick={(e) => {
                                        e.preventDefault();
                                        this.props.cancelDraft(this.props.i);
                                    }}><i className="zmdi zmdi-close"></i></a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={(this.state.open) ? "card-body no-padding" : "card-body no-padding scale0"}>
                        <div className="to-container">
                            <ReactTags
                                classNames={{activeSuggestion: 'active'}}
                                placeholder={"To"}
                                tags={this.state.to || []}
                                       suggestions={this.props.contacts || []}
                                       handleDelete={(i) => {
                                           console.log(i);
                                           if(i > -1) {
                                               this.setState({to: this.state.to.filter((t, index) => index !== i)})
                                           }
                                       }}
                                       handleAddition={(tag) => {
                                           let tags = this.state.to;
                                           console.log("to", tags);
                                           console.log("adding tag", tag);

                                           tags.push(tag);
                                            this.setState({to: tags})
                                       }}
                                        />

                        </div>
                        <div className="subject-container">
                            <input
                                className="form-control"
                                placeholder={"Subject"}
                                value={this.state.subject}
                                onChange={(e) => this.updateState(e, 'subject')}
                            />
                        </div>
                        <div className="body-container">
                            <FroalaEditor
                                config={this.config}
                                options={{autoFocus: (this.props.draft.BODY), height: (this.props.inline) ? '100px' : ''}}
                                model={this.state.model}
                                onModelChange={this.handleModelChange}
                            />
                            <button className="btn btn-info" onClick={(e) => this.sendMessage()}>Send</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Compose;