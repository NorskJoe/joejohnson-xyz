import { ContentTile } from '@joejohnson-xyz/components';
import { ImageType } from '@joejohnson-xyz/components';
import styles from './experience.module.scss';

const experienceProps = [
  {
    company: 'WooliesX',
    jobTitle: 'Full-stack Software Engineer',
    imageUrl: 'logos/wooliesx.png',
    startDate: '2021-01-01',
    description:
      'Work across several different services and areas on the Woolworths Online store, primarily working on content personalisation and automation, as well as optimising and adding new features to the store locator, integrating with 3rd party advertisers, and writing a new recipes module.  Working primarily with Angular7+, JavaScript, Adobe Target, React, and .NET. Deploying and monitoring using Microsoft Azure DevOps.',
  },
  {
    company: 'Quantum IT',
    jobTitle: 'Full-stack Software Engineer',
    imageUrl: 'logos/quantumit.png',
    startDate: '2018-02-01',
    endDate: '2020-10-01',
    description:
      'Writing new features, fixing bugs, and diagnosing production issues for a student placement management system.  The product was used internationally by over 100 institutions catering to admin, staff, and student users.  Working in .Net, AngularJS, and Angular 6+, and helping maintain build and release pipelines in Microsoft Azure.',
  },
];

const formatDate = (date: string): string => {
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short' };
  return new Date(date).toLocaleDateString('en-AU', options);
}

const getEndDate = (date: string | undefined): string => {
  if (date) {
    return formatDate(date);
  }
  return 'Present';
};

const Experience = () => {
  return (
    <div className={styles['page-container']}>
      <div className={styles['grid-container']}>
        {experienceProps.map((item, index) => (
          <ContentTile
            key={index}
            title={item.company}
            subTitle={item.jobTitle}
            summary={`${formatDate(item.startDate)} - ${getEndDate(item.endDate)}`}
            bodyText={item.description}
            imageUrl={item.imageUrl}
            imageType={ImageType.LOGO}
          />
        ))}
      </div>
    </div>
  );
};

export default Experience;
