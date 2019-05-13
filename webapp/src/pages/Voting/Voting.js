import React from 'react'
import PropTypes from 'prop-types'
import styles from './Voting.module.scss'; 

const Voting = props => {
  return (
    <div className={styles.content}>
      <div className={styles.candidate_info}>
        <p className={styles.office}>
          Deputado Federal
        </p>
        <div className={styles.candidate_number}>
        </div>
      </div>
    </div>
  )
}

Voting.propTypes = {

}

export default Voting
