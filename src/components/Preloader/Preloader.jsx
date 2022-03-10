import React from 'react';

import styles from './Preloader.module.pcss';

function Preloader() {
  return (
    <div className={styles.preloaderWrapper}>
      <span className={styles.preloader} />
      Пожалуйста, подождите...
    </div>
  );
}

export default Preloader;
