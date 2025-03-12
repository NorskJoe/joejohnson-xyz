import { ContentTile } from '@joejohnson-xyz/components';
import { ImageType } from '@joejohnson-xyz/components';

const projectProps = [
  {
    name: 'Simply Books',
    tags: [
      {
        name: '.Net Core',
      },
      {
        name: 'Angular 9',
      },
      {
        name: 'SQL Server',
      },
      {
        name: 'Web API',
      },
    ],
    description:
      'Web app to track which books you have read.  The user is able to view history, add new books, and give them ratings.  The main purpose of this project was to replace an excel document I was using to do the same thing.',
    imageUrl: '/images/simply-books.gif',
  },
  {
    name: 'Gear Ratios',
    link: 'https://bike.joejohnson.xyz/custom',
    tags: [
      {
        name: 'Angular 15',
      },
      {
        name: 'storybook.js',
      },
    ],
    description:
      'Web app to input bicycle gears, and calculate the ratios/speed for the given inputs.  The main purpose of this project was to use storybook to facilitate component driven development.',
    imageUrl: '/images/gear-ratio.gif',
  },
  {
    name: 'Flutter Promo Carousel',
    tags: [
      {
        name: '.Net Core',
      },
      {
        name: 'Flutter',
      },
      {
        name: 'Web API',
      },
    ],
    description:
      'Small proof of concept mobile app built using Flutter and Dart.  Allows user authentication and will display promotions based on user settings.  The main purpose of this project was to try out mobile development.',
    imageUrl: '/images/flutter-carousel.gif',
  },
];

const Projects = () => {
  return (
    <>
      {projectProps.map((item, index) => (
        <ContentTile
          key={index}
          title={item.name}
          imageUrl={item.imageUrl}
          imageType={ImageType.SQUARE_ZOOM}
          ctaUrl={item.link}
          bodyText={item.description}
          tags={item.tags.map((tag) => ({ name: tag.name, size: 'small' }))}
        />
      ))}
    </>
  );
};

export default Projects;
