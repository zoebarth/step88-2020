import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { faShare } from '@fortawesome/free-solid-svg-icons';
import styles from './SavedTrips.module.css';

/**
 * Creates single saved trip.
 */
function SavedTrip({ name, id }) {
  return (
    <div className={styles.tripContainer}>
      <ListGroup.Item action href={`/route?id=${id}`} className={styles.listItem}>
        {name}
      </ListGroup.Item>
      <div className={styles.iconContainer}>
        <a href="/explore" title="Edit" className={styles.icon}>
          <FontAwesomeIcon icon={faPencilAlt} />
        </a>
        <a href="/" title="Share" className={styles.icon}>
          <FontAwesomeIcon icon={faShare} />
        </a>
      </div>
    </div>
  );
}

export default SavedTrip;
