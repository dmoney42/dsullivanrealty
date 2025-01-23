import React from 'react'
import styles from './Nav.module.css';
import { links } from './links.json';
import Logo from '../../assets/dsullivanrealty-logo.jpg'
import { useSelector } from 'react-redux';


type Link = {
  id: number;
  label: string;
  href: string;
}

const NavBar: React.FC<{}> = () => {

  const {currentUser} = useSelector((state) => state.user);

  return (
    <nav className={styles.navbar}>

      <div className={styles['logo-container']}>
        <img className={styles['logo-image']} src={Logo} alt="D.Sullivan Realty Logo" />
      </div>

      <div className={styles['links-container']}>
        {
          links.map((link: Link,index)=>{
            return (
              <div key={index} className={styles['link']}>
                <a href={link.href}>
                  {link.label}
                </a>
              </div>
            )
          })
        }

        <div>

          {
            currentUser ? (
              <>
              {//console.log("Avatar URL:", currentUser.avatar)
              }
              
              {//console.log("Current User:", currentUser)
                }
              <div className={styles['profileImageContainer']}>
                <a href="/profile"><img src={currentUser.user.avatar} alt="avatar" /></a>
              </div> 
            </>
              
            ) : (
              
              <div className='link'>
                <a href="/sign-in">Sign In</a>
              </div>

            )
          }
        </div>

      </div>

    </nav>
  )
}

export default NavBar