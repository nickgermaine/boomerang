import React, {Component} from 'react';
import AddPost from '../General/AddPost';
import {Link} from 'react-router-dom';
import moment from 'moment';
import EditProfileContainer from '../../containers/Profile/EditProfileContainer';

class Profile extends Component {

    constructor(props){
        super(props);

        this.state = {
            editing: false
        }
    }

    componentWillMount(){
        if(this.props.match.params.username){
            this.props.loadProfile(this.props.match.params.username, this.props.user.userId);
        }else{
            this.props.loadProfile(null, this.props.user.userId);
        }

    }

    renderComments(comments){
        return comments.map((comment, i) => {
            let mine = (comment.userId === this.props.user.userId);

            return (
                <div className="comment" key={i}>
                    <div className="">

                        {(mine) &&
                            <div class="dropdown hidden-xs-down">
                                <a className="btn btn-light btn--icon" href="" data-toggle="dropdown"><i class="zmdi zmdi-more-vert"></i></a>

                                <div class="dropdown-menu dropdown-menu-right">

                                    <button href="" class="dropdown-item">Edit</button>
                                    <button href="" class="dropdown-item" onClick={(e)=> {
                                        this.props.deleteComment(comment.id);
                                    }}>Delete</button>
                                </div>
                            </div>
                        }
                        <h4 className="card-body__title comment-title">

                            <img src={(comment.user.Profile.image || '/img/avatar1.png')} className="comment-avatar" />
                            <Link to={`/profile/${comment.user.Profile.username || comment.user.Profile.id}`}>{comment.user.Profile.name}</Link><br />
                            <div className="post-time comment-time">
                                {moment(comment.createdAt).fromNow()}
                            </div>
                        </h4>
                    </div>
                    <div className="card-body post-content">
                        {comment.content}
                    </div>
                </div>
            )
        })
    }

    renderPosts(){
        return this.props.profile.user.Post.map((post, i) => {
            console.log("POST", post);
            return (
                <div className={"card"} key={i}>
                    <div className="">
                        <h4 className="card-body__title post-title">

                            <img src={(post.user.Profile.image || '/img/avatar1.png')} className="post-avatar" />
                            <Link to={`/profile/${post.user.Profile.username || post.user.Profile.id}`}>{post.user.Profile.name}</Link><br />
                            <div className="post-time">
                                {moment(post.createdAt).fromNow()}
                            </div>
                        </h4>
                    </div>
                    <div className="card-body post-content">
                        {post.content}
                    </div>
                    <div className="card-footer post-details">
                        <button className="btn btn-default btn-transparent"><i className="zmdi zmdi-thumb-up"></i> {post.Likes.length}</button>
                        <button className="btn btn-default btn-transparent"><i className="zmdi zmdi-comment-text"></i> {post.Comments.length}</button>
                    </div>
                    <div className="comments">
                        {this.renderComments(post.Comments)}

                        <form className="comment-form" onSubmit={(e) => {
                            e.preventDefault();
                            let content = this.refs['comment-' + post.id];
                            let comment = {
                                postId: post.id,
                                content: content.value,
                                userId: this.props.user.userId,
                                createdAt: new Date()
                            }

                            this.props.addComment(comment);
                            console.log(content.value);
                        }}>
                            <input className="hide" name="postId" value={post.id} />
                                <textarea className="form-control pd-15" name="content" ref={`comment-${post.id}`} placeholder="Write a comment"></textarea>
                                <button className="btn btn-default btn-transparent btn-round"><i className="zmdi zmdi-mail-send"></i></button>
                        </form>
                    </div>
                </div>
            )
        })
    }
    render(){

        let mine = (this.props.profile.userId === this.props.user.userId);

        return (
            <section className="">
                <div className="content__inner content__inner--md">
                    <header className="profile-header" style={(this.props.profile.cover) ? {background: this.props.profile.cover} : {}}>

                        <div className="profile-actions">
                            {mine &&
                            <button className="btn btn-light" onClick={(e) => this.setState({editing: true})}><i className="zmdi zmdi-edit"></i> Edit Profile</button>
                            }

                            {!mine &&
                            <button className="btn btn-primary"><i className="zmdi zmdi-plus"></i> Add Friend</button>
                            }
                        </div>

                        <div className="profile-img">
                            <img src={this.props.profile.avatar || '/img/avatar1.png'} />
                        </div>
                        <h2>{this.props.profile.name}</h2>
                    </header>


                    <div className="toolbar">
                        <nav className="toolbar__nav">
                            <a className="active" href="#">Posts</a>
                            <a href="profile-about.html">About</a>
                            <a href="#">Friends</a>
                            <a href="profile-photos.html">Photos</a>
                            <a href="#">Groups</a>
                        </nav>

                        <div className="actions">
                            <i className="actions__item zmdi zmdi-search" data-ma-action="toolbar-search-open"></i>
                        </div>

                        <div className="toolbar__search">
                            <input type="text" placeholder="Search..." />

                                <i className="toolbar__search__close zmdi zmdi-long-arrow-left" data-ma-action="toolbar-search-close"></i>
                        </div>
                    </div>

                    {this.state.editing &&
                        <EditProfileContainer
                            closeModal={(e) => this.setState({editing: false})}
                        />
                    }

                    <div className="row">
                        <div className="col-md-4">
                            <div className="card">
                                <div className="card-body">
                                    <h4 className="card-body__title mb-4">About</h4>
                                </div>
                            </div>
                            <div className="card">
                                <div className="card-body">
                                    <h4 className="card-body__title mb-4">Photos</h4>
                                </div>
                            </div>
                            <div className="card">
                                <div className="card-body">
                                    <h4 className="card-body__title mb-4">Friends</h4>
                                </div>
                            </div>
                        </div>


                        <div className="col-md-8">

                            <AddPost onAdd={this.props.addPost} user={this.props.user} />
                            <br />

                            {this.props.profile.user &&
                                this.renderPosts()}
                        </div>
                    </div>


                </div>

                <footer className="footer hidden-xs-down">
                    <p>© Material Admin Responsive. All rights reserved.</p>

                    <ul className="nav footer__nav">
                        <a className="nav-link" href="">Homepage</a>

                        <a className="nav-link" href="">Company</a>

                        <a className="nav-link" href="">Support</a>

                        <a className="nav-link" href="">News</a>

                        <a className="nav-link" href="">Contacts</a>
                    </ul>
                </footer>
            </section>
        )
    }
}

export default Profile;