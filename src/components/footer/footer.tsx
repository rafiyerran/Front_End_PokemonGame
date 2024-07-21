import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faGoogle, faInstagram, faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';
import '../footer/footerstyles.css';

const Footer = () => {
    return (
        <div className='footer-container'>
            <div className='social-icons'>
                <a href='https://www.facebook.com/' target='_blank' rel='noopener noreferrer'>
                    <FontAwesomeIcon icon={faFacebook} size='2x' />
                </a>
                <a href='https://x.com/' target='_blank' rel='noopener noreferrer'>
                    <FontAwesomeIcon icon={faTwitter} size='2x' />
                </a>
                <a href='https://www.google.com/' target='_blank' rel='noopener noreferrer'>
                    <FontAwesomeIcon icon={faGoogle} size='2x' />
                </a>
                <a href='https://www.instagram.com/' target='_blank' rel='noopener noreferrer'>
                    <FontAwesomeIcon icon={faInstagram} size='2x' />
                </a>
                <a href='https://www.linkedin.com/in/rafiyerran/' target='_blank' rel='noopener noreferrer'>
                    <FontAwesomeIcon icon={faLinkedin} size='2x' />
                </a>
                <a href='https://github.com/rafiyerran' target='_blank' rel='noopener noreferrer'>
                    <FontAwesomeIcon icon={faGithub} size='2x' />
                </a>
            </div>
            <div className='footer-text'>
                ©2024 Revision Legal. All Rights Reserved.
            </div>
        </div>
    );
}

export default Footer;
