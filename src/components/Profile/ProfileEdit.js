import React, {Component} from 'react';

class ProfileEdit extends Component {

    constructor(props){
        super(props);

        this.state = {
            name: this.props.profile.name,
            about: this.props.profile.about || ''
        }
    }
    render(){
        return (
            <div className="modal" id="modal-large" style={{display: "block"}}>
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title pull-left">Edit Profile</h5>
                        </div>
                        <div className="modal-body">
                            <div className="row">

                                <div className="col-md-6">
                                    <input className="form-control"
                                           value={this.state.name}
                                           onChange={(e) => this.setState({name: e.target.value})}
                                           placeholder="Name"
                                           />
                                </div>
                            </div>
                            <br />
                            <div className="row">
                                <div className="col-md-6">
                                <textarea
                                    value={this.state.about}
                                    onChange={(e) => this.setState({about: e.target.value})}
                                    placeholder={"About Me"}
                                    className="form-control"
                                ></textarea>
                                </div>
                            </div>


                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-link">Save changes</button>
                            <button type="button" className="btn btn-link" data-dismiss="modal" onClick={(e) => this.props.closeModal()}>Close</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ProfileEdit;