import React from 'react';
import styles from './Footer.module.css';
import Logo from '../../assets/dsullivanrealty-logo.jpg';


const Footer = () => {
  return (
  <>
      <div className={styles['FooterBar']}>
          <div className={styles['footerAboutWrap']}>
            <div className="footerLogo"><img src={Logo} alt="" /></div>
              <div className="footerAbout">
                <p>Lorem ipsum dolor sit amet, consectetur 
                  adipiscing elit. Duis mollis et sem sed 
                  sollicitudin. Donec non odio neque. 
                  Aliquam hendrerit sollicitudin purus, 
                  quis rutrum mi accumsan nec.
                </p>
                <p>Copyright - D.Sullivan Realty</p>
              </div>
          </div>

          <div className={styles['footerNavWrap']}>
                <ul>
                  <li>Home</li>
                  <li>About</li>
                  <li>Properties</li>
                  <li>Contact</li>
                </ul>
          </div>
        
      </div>
  </>

  )
}

export default Footer