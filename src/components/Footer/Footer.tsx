import React from 'react';
import styles from './Footer.module.css';

const Footer = () => {
  return (
  <>
      <div className={styles['FooterBar']}>
          <div className={styles['topFooterWrap']}>
              <div className={styles['footerAbout']}>
                  <p>Logo</p>
                
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                    Duis mollis et sem sed sollicitudin. Donec non odio neque. 
                    Aliquam hendrerit sollicitudin purus, quis rutrum mi accumsan nec.
                  </p>             
              </div>
          </div>

          <div className={styles['bottomFooter']}>
              <div className={styles['copyright']}>D.Sullivan Realty - All rights Reserved</div>
              <div className={styles['socials']}>Social Media Links</div>
          </div>
        
      </div>
  </>

  )
}

export default Footer