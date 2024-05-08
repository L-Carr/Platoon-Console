import { Link } from 'react-router-dom';

const Footer = () => {
 
return(
    <>
    <footer style={{position: "fixed", bottom: 0, width: "100%", textAlign: "center", color: "grey", padding: "1rem"}}>
        All Rights Reserved | 
    <Link to="/policy" tag={Link} className="footerLink"> Privacy Policy</Link> | 
    <Link to="/disclaimer" tag={Link} className="footerLink"> Disclaimer</Link>
    </footer>
    </>
)
};

export default Footer;