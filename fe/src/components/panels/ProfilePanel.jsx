import React, { Component } from 'react';
import { avatarUrl } from "../../helpers";
import { connect } from "react-redux";
import ProfileMenu from "../ProfileMenu";

class Profile extends Component {

    render() {
        return (
            <React.Fragment>
                <div className="dib fl">
                    
                </div>
                <article class="mw5 left ml5 bg-dark br3 pa3 pa4-ns mv3 ba b--white-10">
                    <div class="tc">
                        <img src={avatarUrl(this.props.user_id)} class="br-100 h4 w4 dib ba b--black-05 pa2" title="Photo of a kitty staring at you" />
                        <h1 class="f3 mb2">{this.props.user_name}</h1>
                        <ProfileMenu></ProfileMenu>
                    </div>

                </article>



            </React.Fragment>


        )
    }


}

const mapStateToProps = state => ({
    loggedIn: state.auth.loggedIn,
    user_id: state.auth.user_id,
    user_name: state.auth.user_name
});

export default connect(
    mapStateToProps,
    {}
)(Profile);
