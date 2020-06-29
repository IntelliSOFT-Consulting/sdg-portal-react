import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class Footer extends React.Component{
    render(){
        return(
            <>
                <footer className="footer text-center">

			        <img alt="..." src={require("../assets/img/brand/banner.png")} className="img-fluid"></img>
                    <p className="text-center">
                        For general and media enquiries write to: <a href="mailto:africasdgindex@sdgcafrica.org">africasdgindex@sdgcafrica.org</a>
                    </p>
                    <p>

                        <a href="https://twitter.com/sdgcafrica" target="_blank" rel="noopener noreferrer" className="twitter-icon"><FontAwesomeIcon icon={['fab', 'twitter']} size="lg" color="bright-blue"></FontAwesomeIcon></a>&nbsp;&nbsp;&nbsp;&nbsp;
                        <a href="https://www.facebook.com/SDGCAfrica" target="_blank" rel="noopener noreferrer" className="facebook-icon"><FontAwesomeIcon icon={['fab', 'facebook']} size="lg" color="light-blue"></FontAwesomeIcon></a>&nbsp;&nbsp;&nbsp;&nbsp;
                        <a href="https://www.youtube.com/channel/UCf-dFkCW1W0g2CVDAZfLMAw" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={['fab', 'youtube']} size="lg" color="red"/></a>
                        
                    </p>

                </footer>
            </>
        );
    }
}

export default Footer;

