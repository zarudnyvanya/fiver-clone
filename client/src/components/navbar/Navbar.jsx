import { useEffect, useState } from 'react'
import { Button } from '../ui/Button/Button'
import cn from 'classnames'
import styles from './Navbar.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { setModalAuth, setModalRegister } from '../../redux/modalSlice'
import { useLocation, useParams } from 'react-router-dom'

export const Navbar = () => {
  const [isScroll, setIsScroll] = useState(false)
  const [burgerIsOpen, setIsBurgerOpen] = useState(false)

  const dispatch = useDispatch()
  const { pathname } = useLocation()

  const scrollNavbar = () => {
    if (window.scrollY > 50) {
      setIsScroll(true)
    } else {
      setIsScroll(false)
    }
  }

  const handleBurger = () => {
    setIsBurgerOpen(!burgerIsOpen)
    document.body.classList.toggle('toggleScroll')
  }

  useEffect(() => {
    window.addEventListener('scroll', scrollNavbar)

    return () => {
      window.removeEventListener('scroll', scrollNavbar)
    }
  }, [])

  const navbarStyles = () => {
    if (isScroll) {
      return cn(styles.navbar, styles.navbar_active)
    } else {
      if (pathname === '/') {
        return cn(styles.navbar)
      }
      return cn(styles.navbar, styles.navbar_darkColor)
    }
  }

  return (
    <>
      {burgerIsOpen && <div onClick={handleBurger} className={styles.overlay}></div>}
      <div className={navbarStyles()}>
        <div className={styles.container}>
          <div className={styles.left}>
            <div
              onClick={handleBurger}
              className={isScroll ? cn(styles.burger, styles.burger_scroll) : styles.burger}
            >
              <span className={styles.burger__stick_top}></span>
              <span className={styles.burger__stick_middle}></span>
              <span className={styles.burger__stick_bottom}></span>
            </div>
            <h2 className={styles.logo}>fiverr</h2>
            <div className={styles.dot}></div>
          </div>
          <div className={styles.right}>
            <ul className={burgerIsOpen ? cn(styles.list, styles.open) : styles.list}>
              <li className={styles.item}>Fiverr Business</li>
              <li className={styles.item}>Explore</li>
              <li className={styles.item}>English</li>
              <li className={styles.item}>Become a Seller</li>
            </ul>
            <div className={styles.btns}>
              <Button onClick={() => dispatch(setModalRegister(true))}>Sign in</Button>
              <Button
                onClick={() => dispatch(setModalAuth(true))}
                white
                style={{
                  borderRadius: 5,
                  marginLeft: 10,
                }}
              >
                Join
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}