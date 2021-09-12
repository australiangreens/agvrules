import React from 'react';
import clsx from 'clsx';
import styles from './HomepageFeatures.module.css';

const FeatureList = [
  {
    title: '',
    description: '',
  },
  {
    title: 'By-laws',
    image: require('../../static/img/documents.png').default,
    description: (
      <>
        View the By-laws.
      </>
    ),
  },
  {
    title: '',
    description: '',
  },
];

function Feature({image, title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <a href='bylaws'>
        {image && <img className={styles.featureSvg} alt={title} src={image} /> }
        </a>
      </div>
      <div className="text--center padding-horiz--md">
        <a href='bylaws'>
          <h3>{title}</h3>
          <p>{description}</p>
        </a>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
