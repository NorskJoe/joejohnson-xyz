import { Image, ImageType } from '@joejohnson-xyz/components';
import Markdown from 'react-markdown';
import styles from './home.module.scss';

const homePageProps = {
  imageUrl: '/images/profile.jpg',
  bio: `As a skilled Full Stack Software Engineer, I specialise in delivering high-performance, user-centric applications with a strong focus on frontend technologies like React and Angular. With a solid background in .NET Core and SQL databases, I bring comprehensive expertise to both client-side and server-side development.

I have a particular passion for creating accessible, lightweight, and reusable components that enhance user experience while ensuring compliance with accessibility standards. I am dedicated to designing applications that are both intuitive and inclusive, making them usable for a diverse range of users.

In addition to my frontend expertise, I have significant experience using Azure DevOps for streamlining development workflows. I am committed to writing clean, maintainable code while fostering innovation and high-quality software delivery.`,
};

const Home = () => {
  return (
    <div className={styles['container']}>
      <Image
        imageUrl={homePageProps.imageUrl}
        altText="Porfile Image"
        imageType={ImageType.ROUND}
      ></Image>
      <section>
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
