'use client'

import { useEffect, useState } from 'react'
import { ChevronLeft, ChevronRight, X, Maximize2 } from 'lucide-react'
import { images as initialImages, type GalleryImage } from '@/lib/gallery-data'

type Copy = {
  eyebrow: string
  title: string
  titleEmphasis: string
  headerCopy: string
  date: string
  footerHint: string
  journal: string
  photoCount: string
}

export default function Page() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>(initialImages)
  const [copy, setCopy] = useState<Copy>({
    eyebrow: 'Konark Institute Of Science And Technology',
    title: 'SOLASTA',
    titleEmphasis: '',
    headerCopy: 'The Freshers Party Of,\nBatch 26. ',
    date: '19 SEP 2026 / KIST × GALLERY',
    footerHint: 'Thank You For Celebrating With Us.',
    journal: "GET In Touch",
    photoCount: `${initialImages.length} photographs`,
  })
  const activeImage = activeIndex === null ? null : galleryImages[activeIndex]
  useEffect(() => {
    if (activeIndex === null) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setActiveIndex(null)
      if (event.key === 'ArrowRight') setActiveIndex((activeIndex + 1) % galleryImages.length)
      if (event.key === 'ArrowLeft') setActiveIndex((activeIndex - 1 + galleryImages.length) % galleryImages.length)
    }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [activeIndex, galleryImages.length])

  return (
    <main className="gallery-shell">
      <header className="gallery-header">
        <div>
          <p className="eyebrow">{copy.eyebrow}</p>
          <h1>{copy.title} <em>{copy.titleEmphasis}</em></h1>
        </div>
        <p className="header-copy">{copy.headerCopy}</p>
      </header>

      <section className="gallery-intro">
        <span>{copy.date}</span>
        <span>{copy.photoCount}</span>
      </section>

      <section className="gallery-grid" aria-label="Photo gallery">
        {galleryImages.map((image, index) => (
          <button className={`gallery-card card-${index + 1}`} key={`${image.src}-${index}`} onClick={() => setActiveIndex(index)} style={{ '--image-width': image.width, '--image-height': image.height } as React.CSSProperties} aria-label={`View ${image.title} fullscreen`}>
            <img className="gallery-photo" src={image.src} alt={image.title} />
            <span className="card-caption">
              <strong>{image.title}</strong>
              <small>{image.detail}</small>
            </span>
            <span className="expand-icon" aria-hidden="true"><Maximize2 size={15} /></span>
          </button>
        ))}
      </section>

      <footer className="gallery-footer"><a className="journal-link" href="https://www.instagram.com/reel/DdYwxvXgfjW/?stkn=MXhpMW9jNjVubmVocg==" target="_blank" rel="noreferrer">{copy.journal}</a><span>{copy.footerHint}</span></footer>

      {activeImage && activeIndex !== null && (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label={`${activeImage.title} fullscreen view`} onClick={() => setActiveIndex(null)}>
          <button className="close-lightbox" onClick={() => setActiveIndex(null)} aria-label="Close fullscreen image"><X size={24} /></button>
          <button className="lightbox-arrow previous" onClick={(event) => { event.stopPropagation(); setActiveIndex((activeIndex - 1 + galleryImages.length) % galleryImages.length) }} aria-label="Previous image"><ChevronLeft size={30} /></button>
          <div className="lightbox-content" onClick={(event) => event.stopPropagation()}>
            <img className="lightbox-image" src={activeImage.src} alt={activeImage.title} />
            <div className="lightbox-caption"><span>{String(activeIndex + 1).padStart(2, '0')} / {String(galleryImages.length).padStart(2, '0')}</span><strong>{activeImage.title}</strong><small>{activeImage.detail}</small></div>
          </div>
          <button className="lightbox-arrow next" onClick={(event) => { event.stopPropagation(); setActiveIndex((activeIndex + 1) % galleryImages.length) }} aria-label="Next image"><ChevronRight size={30} /></button>
        </div>
      )}
    </main>
  )
}

