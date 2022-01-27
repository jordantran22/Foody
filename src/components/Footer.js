import React from 'react'

const Footer = () => {
    return (
        <footer>
            <div class="section-title"> Contact Us! </div>
            <div> Want to learn more about Foody? Contact us through social media! </div>
            <div> You can find out links down below <i class='bx bx-down-arrow-alt' ></i> </div>
            <div className="footer-socials">
                    <a class="social-link" href="#"><i className='bx bxl-github social-icon'></i></a>
                    <a class="social-link" href="#"><i className='bx bxl-linkedin-square social-icon' ></i> </a>
                    <a class="social-link" href="#"><i className='bx bx-mail-send social-icon' ></i></a>
            </div>
            <div> Copyright &copy; 2021, Foody </div>
        </footer>
    )
}

export default Footer
