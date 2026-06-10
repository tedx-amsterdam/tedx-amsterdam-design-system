import React from 'react';
import { Tag } from './Tag';
import styles from './MediaCard.module.css';

export interface MediaCardProps {
  /** Image URL. Falls back to the red-orange tile gradient. */
  image?: string;
  /** Corner category label, e.g. "NEWS" / "PODCAST". */
  category?: React.ReactNode;
  title: React.ReactNode;
  description?: React.ReactNode;
  /** Dated meta line (rendered with a red bullet). */
  date?: React.ReactNode;
  href?: string;
  /** CSS aspect-ratio for the image. @default "4 / 3" */
  ratio?: string;
  style?: React.CSSProperties;
}

/** Image-led blog / event card with corner category label. */
export function MediaCard({
  image,
  category,
  title,
  description,
  date,
  href = '#',
  ratio = '4 / 3',
  style,
}: MediaCardProps): React.ReactElement {
  return (
    <a
      href={href}
      className={styles.card}
      style={style}
    >
      <div
        className={styles.imgOuter}
        style={{ aspectRatio: ratio }}
      >
        <div
          className={styles.imgInner}
          style={{
            background: image ? `url(${image}) center / cover no-repeat` : 'var(--grad-tile)',
          }}
        />
        {category && (
          <span className={styles.category}>
            {category}
          </span>
        )}
      </div>

      <h3 className={styles.title}>
        {title}
      </h3>
      {description && (
        <p className={styles.description}>
          {description}
        </p>
      )}
      {date && (
        <Tag color="white" dot style={{ textTransform: 'none', letterSpacing: 0, fontWeight: 400, fontSize: 16 }}>
          {date}
        </Tag>
      )}
    </a>
  );
}
