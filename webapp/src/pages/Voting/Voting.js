import React from 'react'
import PropTypes from 'prop-types'
import styles from './Voting.module.scss'; 
import VoteForm from '../../components/VoteForm/VoteForm'

const Voting = props => {
  return (
    <div className={styles.content}>
    <h1 className={styles.title}> Eleições 2019</h1>
    <VoteForm/>
  </div>
  )
}

Voting.propTypes = {

}

export default Voting
