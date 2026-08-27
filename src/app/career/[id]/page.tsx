import { Metadata } from 'next';
import { careers } from '@/data/careers';
import CareerClient from './CareerClient';

export async function generateStaticParams() {
  return careers.map((career) => ({
    id: career.id,
  }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ id: string }> }
): Promise<Metadata> {
  const { id } = await params;
  const career = careers.find((c) => c.id === id);

  if (!career) {
    return {
      title: 'Career Not Found | Career Trade-Offs',
    };
  }

  return {
    title: `${career.name} Trade-Offs, Salary & Struggles | Career Trade-Offs`,
    description: career.description,
    openGraph: {
      title: `${career.name} Trade-Offs | Career Trade-Offs`,
      description: career.description,
      images: [
        {
          url: `/images/career_${career.id}.jpg`,
          width: 1200,
          height: 630,
          alt: career.name,
        }
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${career.name} Trade-Offs | Career Trade-Offs`,
      description: career.description,
      images: [`/images/career_${career.id}.jpg`],
    },
  };
}

export default async function CareerServerPage(
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const staticCareer = careers.find((c) => c.id === id) || null;
  return <CareerClient initialId={id} staticCareer={staticCareer} />;
}
