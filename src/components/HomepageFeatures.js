import React from 'react';
import clsx from 'clsx';
import styles from './HomepageFeatures.module.css';

const DocIcon = ({color}) => (
  <svg className={styles.featureSvg} width="200" height="200" viewBox="0 0 25 25" fill-rule="evenodd" clip-rule="evenodd" preserveAspectRatio="none"><path style={{fill: color}} d="M22 24h-20v-24h14l6 6v18zm-7-23h-12v22h18v-16h-6v-6zm3 15v1h-12v-1h12zm0-3v1h-12v-1h12zm0-3v1h-12v-1h12zm-2-4h4.586l-4.586-4.586v4.586z"/></svg>
)

const FeatureList = [
  {
    title: 'Constitution',
    color: "yellowgreen",
    link: "constitution",
    icon: <DocIcon color="yellowgreen" />,
    description: (
      <>
        View the Constitution
      </>
    ),
  },
];

function Feature({image, icon, title, description, link, color}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <a href={link}>
        {icon}
        </a>
      </div>
      <div className="text--center padding-horiz--md">
        <a href={link}>
          <h3 style={{color: color}}>{title}</h3>
          <p style={{color: color}}>{description}</p>
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
