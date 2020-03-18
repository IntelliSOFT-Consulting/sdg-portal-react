import React from "react";
import $ from 'jquery';
import RadialMenu from "react-radial-menu"



class SdgLandingMenu extends React.Component{

    render() {
        const items = [
            {"href":"http://www.facebook.com", "image":"url(assets/img/a2063_icons/Aspiration_1.png)"},
            {"href":"http://www.reddit.com", "image":"url(examples/dist/images/social/reddit.png)"},
            {"href":"http://www.flickr.com", "image":"url(examples/dist/images/social/flickr.png)"},
            {"href":"http://www.google.com", "image":"url(examples/dist/images/social/googleplus.png)"},
            {"href":"http://www.linkedin.com", "image":"url(examples/dist/images/social/linkedin.png)"},
            {"href":"http://www.twitter.com", "image":"url(examples/dist/images/social/twitter.png)"},
            {"href":"http://www.twitter.com", "image":"url(examples/dist/images/social/twitter.png)"}
        ];
        
        const center = {
            "image": "url(examples/dist/images/social/share.png)"
        };
        // const {items, center} = this.props
        return <RadialMenu
                    items={items}
                    center={center}
      />
      }
}

export default SdgLandingMenu;