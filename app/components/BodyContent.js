import CardGrid from '@/app/components/CardGrid';
import FeaturedArticles from '@/app/components/FeaturedArticles';
import FeaturedContent from '@/app/components/FeaturedContent';
import LogoGrid from '@/app/components/LogoGrid';
import RichText from '@/app/components/RichText';
import SectionHeader from '@/app/components/SectionHeader';
import Testimonials from '@/app/components/Testimonials';
import ThreeColumnContent from '@/app/components/ThreeColumnContent';
import TwoColumnContent from '@/app/components/TwoColumnContent';

const BodyContent = ({ bodyContent }) => {
  return (
    <>
      {bodyContent?.items.map(section => {
        if (section.__typename === 'ComponentLogoCarousel') {
          const logos = section.logosCollection.items;
          return (
            <LogoGrid
              className="bg-[var(--light-gray)]"
              key={section.sys.id}
              title={section.sectionTitle}
              logos={logos}
            />
          );
        } else if (section.__typename === 'ComponentSectionHeading') {
          return (
            <SectionHeader
              key={section.sys.id}
              title={section.title}
              subtitle={section.subtitle}
            />
          );
        } else if (section.__typename === 'ComponentCardGrid') {
          return (
            <CardGrid
              key={section.sys.id}
              layout="left-tall"
              cards={section.cardCollection.items}
            />
          );
        } else if (section.__typename === 'ComponentCaseStudiesSlider') {
          return (
            <FeaturedContent
              key={section.sys.id}
              sectionTitle={section.title}
              sectionSubtitle={section.subtitle}
              crumb={section.crumb}
              buttonLabel={section.buttonText}
              buttonLink={section.buttonLink}
              items={section.caseStudiesCollection.items}
            />
          );
        } else if (section.__typename === 'TestimonialSlider') {
          return (
            <Testimonials
              className="mx-auto max-w-[1440px] p-[20px] lg:p-[40px]"
              key={section.sys.id}
              items={section.testimonialsCollection.items}
            />
          );
        } else if (section.__typename === 'ComponentFeaturedPost') {
          return (
            <FeaturedArticles
              key={section.sys.id}
              sectionTitle={section.title}
              crumb={section.crumb}
              items={section.postsCollection.items}
            />
          );
        } else if (section.__typename === 'Component2Columns') {
          return (
            <TwoColumnContent
              key={section.sys.id}
              crumb={section.crumb}
              title={section.title}
              content={section.content}
              img1={section.featureImage1}
              img2={section.featureImage2}
              textPlacement={section.textPlacement}
            />
          );
        } else if (section.__typename === 'Component3Columns') {
          console.log(section);
          return (
            <>
              {section.columns === 2 && (
                <CardGrid
                  key={section.sys.id}
                  layout="two-up"
                  cards={section.cardsCollection.items}
                />
              )}

              {section.columns !== 2 && (
                <ThreeColumnContent
                  key={section.sys.id}
                  crumb={section.mainCrumb}
                  cards={section.cardsCollection.items}
                />
              )}
            </>
          );
        } else if (section.__typename === 'ComponentBasicContent') {
          return (
            <div key={section.sys.id} className="basic-content">
              <div className="l-container">
                <RichText
                  key={section.sys.id}
                  document={section.content.json}
                />
              </div>
            </div>
          );
        }
      })}
    </>
  );
};

export default BodyContent;
