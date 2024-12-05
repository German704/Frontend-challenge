import React from 'react';

interface AvatarProps {
  name: string;
  size?: number;
}

const Avatar: React.FC<AvatarProps> = ({ name, size = 30 }) => {
  const getInitials = (name: string): string => {
    return name
      .split(' ')
      .map((word) => word[0].toUpperCase())
      .join('');
  };

  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
        backgroundColor: '#FFE0B2',
        color: '#CA4A02',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontWeight: 'bold',
        fontSize: size / 2.5,
        textTransform: 'uppercase',
      }}
    >
      {getInitials(name)}
    </div>
  );
};

export default Avatar;