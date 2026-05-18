import { motion } from 'framer-motion';
import { SectionHeading } from '@/components/public/SectionHeading';
import { useProjects } from '@/hooks/queries';

export function GallerySection() {
  const { data: projects } = useProjects();

  const imgs = projects?.filter((p) => p.thumbnailUrl) ?? [];

  return (
    <section id="gallery" className="relative scroll-mt-28 px-4 py-24 md:px-8">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Gallery"
          title="Visual artifacts from shipped builds."
          subtitle="Thumbnails populate automatically when you attach previews in the admin panel."
        />

        {imgs.length === 0 ? (
          <div className="glass rounded-[2rem] p-10 text-center text-sm text-slate-400">
            Upload project thumbnails in Admin → Projects to activate this masonry showcase.
          </div>
        ) : (
          <div className="columns-2 gap-4 md:columns-3">
            {imgs.map((p, idx) => (
              <motion.figure
                key={p._id}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.04 }}
                className="mb-4 break-inside-avoid overflow-hidden rounded-3xl border border-white/10"
              >
                <img
                  src={p.thumbnailUrl}
                  alt={p.name}
                  loading="lazy"
                  className="w-full object-cover transition duration-700 hover:scale-[1.03]"
                />
              </motion.figure>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
