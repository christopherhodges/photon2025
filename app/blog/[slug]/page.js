import AuthoredBy from '@/app/components/AuthoredBy';
import ContentfulImage from '@/app/components/ContentfulImage';
import CrumbList from '@/app/components/CrumbList';
import Footer from '@/app/components/Footer';
import RichText from '@/app/components/RichText';
import Testimonials from '@/app/components/Testimonials';
import { getFooter } from '@/lib/contentful/footer';
import { getPost } from '@/lib/contentful/posts';
import { buildMetadata } from '@/lib/metadata';
import { notFound } from 'next/navigation';

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const { page } = await getPost(slug);

  if (!page) return {};

  return buildMetadata({
    title: page.title,
    description: page.subtitle,
    image: page.coverImage,
    type: 'article',
    path: `/blog/${slug}`,
  });
}
export default async function Post({ params }) {
  params = await params;
  const { slug } = params;
  const { page } = await getPost(slug, false);
  const [footer] = await Promise.all([getFooter()]);

  const crumbs = page.crumbListCollection?.items ?? [];

  if (!page) return notFound();

  return (
    <>
      <main className="l-main">
        <div className="single-entry">
          <div className="l-container l-container--sm pt-[133px]">
            <header className="mb-[40px] flex flex-col gap-[40px]">
              {crumbs.length !== 0 && (
                <CrumbList
                  borderStyles="first:border-[#DBDBDB] first:border-2 bg-[#E8EAF0] first:bg-transparent"
                  crumbs={crumbs}
                />
              )}
              <h1 className="text-[38px]">{page.title}</h1>
              <p className="text-[24px] text-[var(--med-gray)]">
                {page.subtitle}
              </p>
              <AuthoredBy
                name={page.author}
                image={page.authorImage}
                date={page.date}
              />
              <ContentfulImage
                className="rounded-[16px]"
                src={page.coverImage.url}
                alt={page.coverImage.title}
                width={page.coverImage.width}
                height={page.coverImage.height}
              />
            </header>
          </div>
          {page.featuredTestimonial && (
            <Testimonials
              className="mx-auto max-w-[1440px] p-[20px] lg:p-[40px]"
              items={[page.featuredTestimonial]}
            />
          )}
          <div className="basic-content">
            <div className="l-container">
              <RichText
                key={page.sys.id}
                document={page.content.json}
                links={page.content.links}
              />
            </div>
          </div>
        </div>
      </main>
      <Footer footer={footer} />
    </>
  );
}
