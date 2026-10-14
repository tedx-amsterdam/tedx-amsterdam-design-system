import React from 'react';
import { cn } from '../utils/cn';
import { Badge } from './Badge';
import { Tag } from './Tag';
import styles from './MediaCard.module.css';

export interface MediaCardProps extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'title'> {
  /** Image URL. Falls back to the red-orange tile gradient. */
  image?: string;
  /** Alt text for the image. Leave empty when the title already says what the image shows. @default "" */
  imageAlt?: string;
  /** Category in a `Badge` in the image's corner, e.g. "News" or "Podcast". */
  category?: React.ReactNode;
  title: React.ReactNode;
  /** Short excerpt below the title. */
  description?: React.ReactNode;
  /** Meta line with a red dot, such as the date. */
  date?: React.ReactNode;
  /** CSS aspect-ratio for the image. @default "4 / 3" */
  ratio?: string;
}

/** Image-led blog / event card: photo with a category badge, uppercase title, excerpt and a dated meta line. */
export function MediaCard({
  image,
  imageAlt = '',
  category,
  title,
  description,
  date,
  href = '#',
  ratio = '4 / 3',
  className,
  style,
  ...rest
}: MediaCardProps): React.ReactElement {
  return (
    <a
      href={href}
      className={cn(styles.card, className)}
      style={style}
      {...rest}
    >
      <div className={styles.media} style={{ aspectRatio: ratio }}>
        {image && <img src={image} alt={imageAlt} loading="lazy" decoding="async" className={styles.img} />}
        {typeof category === 'string' ? (
          <Badge label={category} className={styles.category} />
        ) : (
          category && <span className={styles.category}>{category}</span>
        )}
      </div>
      <div className={styles.body}>
        <div className={styles.text}>
          <h3 className={styles.title}>{title}</h3>
          {description && <p className={styles.description}>{description}</p>}
        </div>
        {date && <Tag dot>{date}</Tag>}
      </div>
    </a>
  );
}
