import React from 'react'
import PropTypes from 'prop-types'
import Button from '../../components/Button/Button'
import styles from './Home.module.scss'; 

const Home = props => {
  return (
    <div className={styles.content}>
      <h1 className={styles.title}> Home </h1>
      <Button 
        content="Click Here"
      />
    </div>
  )
}

Home.propTypes = {

}

export default Home
