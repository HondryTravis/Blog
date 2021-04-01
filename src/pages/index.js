import React from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './styles.module.css';

const features = [
  {
    title: '积累',
    imageUrl: 'images/default/undraw_docusaurus_mountain.svg',
    description: (
      <span>
        平时一些常用的技能的总结，防止遗忘
      </span>
    ),
  },
  {
    title: '关于学习',
    imageUrl: 'images/default/undraw_docusaurus_tree.svg',
    description: (
      <span>
        螺旋式提升，一些阅读，一些实践，一些总结，持续更新
      </span>
    ),
  },
  {
    title: '开源贡献',
    imageUrl: 'images/default/undraw_docusaurus_react.svg',
    description: (
      <span>
        热爱开源，忠于开源
      </span>
    ),
  },
];

function Feature({imageUrl, title, description}) {
  const imgUrl = useBaseUrl(imageUrl);
  return (
    <div className={clsx('col col--4', styles.feature)}>
      {imgUrl && (
        <div className="text--center">
          <img className={styles.featureImage} src={imgUrl} alt={title} />
        </div>
      )}
      <h3 className="text--center">{title}</h3>
      <p>{description}</p>
    </div>
  );
}

function Home() {
  const context = useDocusaurusContext();
  const {siteConfig = {}} = context;
  console.log(styles.getStarted,)
  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="主页">
      <header className={clsx('hero hero--primary', styles.heroBanner)}>
        <div className="container">
          <h1 className="hero__title">{siteConfig.title}</h1>
          <p className="hero__subtitle">{siteConfig.tagline}</p>
          <div className={styles.buttons}>
            <Link
              className={clsx(
                'button button--outline button--info button--lg',
                styles.getStarted,
              )}
              to={useBaseUrl('docs/')}>
              快速阅读
            </Link>
          </div>
        </div>
      </header>
      <main>
        {features && features.length > 0 && (
          <section className={styles.features}>
            <div className="container">
              <div className="row">
                {features.map((props, idx) => (
                  <Feature key={idx} {...props} />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
    </Layout>
  );
}

export default Home;
