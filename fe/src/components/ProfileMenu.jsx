import React from "react";

import { Dropdown } from "react-bootstrap";

const ProfileMenu = (props) => {
    return (
        <React.Fragment>
            <Dropdown>
                <Dropdown.Toggle variant="warning" id="dropdown-basic">
                    Menu
  </Dropdown.Toggle>

                <Dropdown.Menu>
                    <Dropdown.Item href="/avatar">Change Avatar</Dropdown.Item>
                    <Dropdown.Item href="/tracks">See Tracks</Dropdown.Item>
                    <Dropdown.Item href="/playlists">Manage Playlists</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>;
        </React.Fragment>

    )
}

export default ProfileMenu;