import { ContentTile } from '@joejohnson-xyz/components';
import { ImageType } from '@joejohnson-xyz/components';
import styles from '../../styles.module.scss';

const experienceProps = [
  {
    company: 'WooliesX',
    jobTitle: 'Full-stack Software Engineer',
    imageUrl: 'logos/wooliesx.png',
    startDate: '2021-01-01',
    description:
      'Focused on personalisation and content delivery for the Woolworths Online Store. I’ve contributed to major projects including a targeted video ad unit, migration of the website from Angular to React, contributing to the Woolworths Group Core Components library, and modernising content services. Skilled in React, Angular, Node.js, .NET Core, Azure DevOps, and Adobe Target. I also support team growth through onboarding, knowledge sharing, and technical leadership.',
  },
  {
    company: 'Quantum IT',
    jobTitle: 'Full-stack Software Engineer',
    imageUrl: 'logos/quantumit.png',
    startDate: '2018-02-01',
    endDate: '2020-10-01',
    description:
      'I worked across both frontend (Angular) and backend (.NET Core/.NET Framework, SQL Server) to build and maintain InPlace, a globally used student management system. I led key projects like site localisation for Welsh and Arabic, migrated legacy Razor pages to Angular, and consistently ranked highest in resolving client production issues. I also contributed to release management using Azure DevOps.',
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
