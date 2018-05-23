import React, {Component} from 'react';

class AddPost extends Component {
    constructor(props){
        super(props);

        this.state = {
            type: 'status',
            content: '',
            background: '',
            status: '',
            privacy: ''
        }
    }

    renderStatusBox = () => {
        return (
            <div className="status-box">
                <textarea
                    className="form-control pd-15"
                    placeholder={"What's up?"}
                    value={this.state.content}
                    onChange={(e) => this.setState({content: e.target.value})}
                ></textarea>
            </div>
        )
    }

    savePost = () => {
        let newPost = {
            content: this.state.content,
            status: 'active',
            privacy: this.state.privacy,
            userId: this.props.user.userId,
            createdAt: new Date()
        }

        this.props.onAdd(newPost);
    }

    render(){

        return (
            <div className="card">

                    {(this.state.type === 'status') &&
                        this.renderStatusBox()
                    }
                <div className="">
                    <nav className="pd-15 post-buttons">

                        <div className="float-right">
                            <button className="btn btn-primary pull-right" onClick={this.savePost}>Post</button>
                        </div>

                        <button className="btn btn-default btn-transparent"><i className="zmdi zmdi-comment-text"></i></button>
                        <button className="btn btn-default btn-transparent"><i className="zmdi zmdi-collection-folder-image"></i></button>
                        <button className="btn btn-default btn-transparent"><i className="zmdi zmdi-collection-video"></i></button>

                    </nav>


                </div>

            </div>
        )
    }
}

export default AddPost;