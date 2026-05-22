import { Image, ImageType } from '@joejohnson-xyz/components';
import Markdown from 'react-markdown';
import styles from './home.module.scss';

const homePageProps = {
  imageUrl: '/images/profile.jpg',
  bio: `
  As a skilled Full Stack Software Engineer, I specialise in delivering high-performance, 
  user-centric applications.  Whilst my recent focus has been on frontend developent using React and Angular,
  I have a strong foundation in backend development, particularly with .NET Core and SQL databases.  As well as
  extensive experience debugging and optimising complex interconnected systems, ensuring they run efficiently
  and reliably.  I also strongly believe in the foundations of software development, such as clean code principles,
  design patterns, and best practices,  which I apply to all aspects of my work to ensure maintainability 
  and scalability.

  I have a particular passion for creating accessible, lightweight, and reusable components 
  that enhance user experience while ensuring compliance with accessibility standards. 
  I am dedicated to designing applications that are both intuitive and inclusive, 
  making them usable for a diverse range of users.

  In addition to my development expertise, I have significant experience using Azure DevOps 
  for streamlining development workflows. I am committed to writing clean, 
  maintainable code while fostering innovation and high-quality software delivery.
  `,
};

const Home = () => {
  return (
    <div className={styles['container']}>
      <Image
        imageUrl={homePageProps.imageUrl}
        altText="Porfile Image"
        imageType={ImageType.ROUND}
      ></Image>
      <section className={styles['content']}>
        <h1>Joseph Johnson</h1>
        <h2>Full Stack Software Engineer</h2>
        <p className={styles['bio']}>
          <Markdown>{homePageProps.bio}</Markdown>
        </p>
      </section>
    </div>
  );
};

export default Home;
