import './Avatar.css';

interface AvatarProps {
  src?: string;
  initials?: string;
  size?: 'sm' | 'md' | 'lg';
  alt?: string;
}

export const Avatar = ({ src, initials, size = 'md', alt = '' }: AvatarProps) => (
  <div className={`avatar avatar--${size}`}>
    {src ? (
      <img src={src} alt={alt} className="avatar__img" />
    ) : (
      <span className="avatar__initials">{initials}</span>
    )}
  </div>
);
