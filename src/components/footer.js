import React from "react";
import {Container} from "reactstrap";

class Footer extends React.Component{
    render(){
        return(
            <>
                <footer className="footer text-center mt-2">

			        <img alt="..." src={require("../assets/img/brand/banner.png")} className="img-fluid"></img>
                    <p className="text-center">
                        For general and media enquiries write to: <a href="mailto:africasdgindex@sdgcafrica.org">africasdgindex@sdgcafrica.org</a>
                    </p>
                    <p>

                        <a href="https://twitter.com/sdgcafrica" target="_blank"><i className="fa fa-twitter"></i></a>&nbsp;&nbsp;&nbsp;&nbsp;
                        <a href="https://www.facebook.com/SDGCAfrica" target="_blank"><i className="fa fa-facebook-f"></i></a>&nbsp;&nbsp;&nbsp;&nbsp;
                        <a href="https://www.youtube.com/channel/UCf-dFkCW1W0g2CVDAZfLMAw" target="_blank"><i className="fa fa-youtube"></i></a>
                        
                    </p>

                </footer>
            </>
        );
    }
}

export default Footer;

