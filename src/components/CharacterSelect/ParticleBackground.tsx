import React, { useMemo } from 'react';
import styled, { keyframes } from 'styled-components';

interface ParticleBackgroundProps {
  accentColor?: string;
}

const particleFloat = keyframes`
  0% {
    transform: translateY(0) translateX(0);
    opacity: 0;
  }
  10% {
    opacity: 0.8;
  }
  90% {
    opacity: 0.4;
  }
  100% {
    transform: translateY(-100vh) translateX(20px);
    opacity: 0;
  }
`;

const ParticleContainer = styled.div`
  position: absolute;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
  z-index: 0;

  @media (prefers-reduced-motion: reduce) {
    display: none;
  }
`;

interface ParticleProps {
  $x: number;
  $y: number;
  $size: number;
  $duration: number;
  $delay: number;
  $opacity: number;
  $color: string;
}

const Particle = styled.div<ParticleProps>`
  position: absolute;
  left: ${({ $x }) => $x}%;
  top: ${({ $y }) => $y}%;
  width: ${({ $size }) => $size}px;
  height: ${({ $size }) => $size}px;
  background: ${({ $color }) => $color};
  opacity: ${({ $opacity }) => $opacity};
  animation: ${particleFloat} ${({ $duration }) => $duration}s ${({ $delay }) => $delay}s linear infinite;
  box-shadow: 0 0 ${({ $size }) => $size * 3}px ${({ $color }) => $color};
`;

const ParticleBackground: React.FC<ParticleBackgroundProps> = ({ accentColor = 'rgba(255, 140, 0, 0.5)' }) => {
  const particles = useMemo(
    () =>
      Array.from({ length: 30 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: 50 + Math.random() * 60,
        size: Math.random() * 2.5 + 0.5,
        duration: Math.random() * 14 + 8,
        delay: Math.random() * 10,
        opacity: Math.random() * 0.35 + 0.05,
      })),
    []
  );

  return (
    <ParticleContainer>
      {particles.map((p) => (
        <Particle
          key={p.id}
          $x={p.x}
          $y={p.y}
          $size={p.size}
          $duration={p.duration}
          $delay={p.delay}
          $opacity={p.opacity}
          $color={accentColor}
        />
      ))}
    </ParticleContainer>
  );
};

export default ParticleBackground;
