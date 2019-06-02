import React from 'react'
import PropTypes from 'prop-types'
import VoteForm from '../../components/VoteForm/VoteForm'
import Results from '../../components/Results/Results'
import styles from './Home.module.scss'; 

const Home = props => {
  return (
    <div className={styles.content}>
      <h1 className={styles.title}> Eleições 2019</h1>
      <VoteForm/>
    </div>
  )
}

Home.propTypes = {

}

export default Home
