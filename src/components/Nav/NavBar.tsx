import React from 'react'
import styles from './Nav.module.css';
import { links } from './links.json';
import Logo from '../../assets/dsullivanrealty-logo.jpg'


type Link = {
  id: number;
  label: string;
  href: string;
}

const NavBar: React.FC<{}> = () => {
  return (
    <nav className={styles.navbar}>

      <div className={styles['logo-container']}>
        <img className={styles['logo-image']} src={Logo} alt="D.Sullivan Realty Logo" />
      </div>

      <div className={styles['links-container']}>
        {
          links.map((link: Link)=>{
            return (
              <div key={link.id} className={styles['link']}>
                  {console.log("The current value iterated in link is: " + JSON.stringify(link))}                <a href={link.href}>
                  {link.label}
                </a>
              </div>
            )
          })
        }

      </div>

    </nav>
  )
}

export default NavBar