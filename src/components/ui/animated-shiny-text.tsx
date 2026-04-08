import * as React from 'react';
import { motion, Variants } from 'framer-motion';

interface AnimatedTextProps extends React.HTMLAttributes<HTMLDivElement> {
  text: string;
  gradientColors?: string;
  gradientAnimationDuration?: number;
  hoverEffect?: boolean;
  textStyle?: React.CSSProperties;
}

export const AnimatedText = React.forwardRef<HTMLDivElement, AnimatedTextProps>(
  (
    {
      text,
      gradientColors = 'linear-gradient(90deg, #8b0000, #ff5252, #ffffff, #ff5252, #8b0000)',
      gradientAnimationDuration = 2.2,
      hoverEffect = false,
      textStyle,
      style,
      ...props
    },
    ref
  ) => {
    const [isHovered, setIsHovered] = React.useState(false);

    const textVariants: Variants = {
      initial: { backgroundPosition: '0 0' },
      animate: {
        backgroundPosition: '100% 0',
        transition: {
          duration: gradientAnimationDuration,
          repeat: Infinity,
          repeatType: 'reverse' as const,
        },
      },
    };

    return (
      <div
        ref={ref}
        style={{
          display: 'flex',
          alignItems: 'center',
          ...style,
        }}
        {...props}
      >
        <motion.h1
          style={{
            margin: 0,
            fontSize: '38px',
            fontWeight: 900,
            letterSpacing: '-0.5px',
            lineHeight: 1.1,
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            background: gradientColors,
            backgroundSize: '200% auto',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textShadow: isHovered ? '0 0 12px rgba(255,82,82,0.55)' : 'none',
            ...textStyle,
          }}
          variants={textVariants}
          initial="initial"
          animate="animate"
          onHoverStart={() => hoverEffect && setIsHovered(true)}
          onHoverEnd={() => hoverEffect && setIsHovered(false)}
        >
          {text}
        </motion.h1>
      </div>
    );
  }
);

AnimatedText.displayName = 'AnimatedText';
