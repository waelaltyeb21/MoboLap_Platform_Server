"use client";

import { Variants, motion, useAnimationControls } from "motion/react";
import React, { useState } from "react";

export const AnimateSvg = ({
  width,
  height,
  viewBox,
  className,
  path,
  paths = [],
  strokeColor = "#cecece",
  strokeWidth = 3,
  strokeLinecap = "round",
  animationDuration = 1.5,
  animationDelay = 0,
  animationBounce = 0.3,
  staggerDelay = 0.2,
  reverseAnimation = false,
  enableHoverAnimation = false,
  hoverAnimationType = "redraw",
  hoverStrokeColor = "#4f46e5",
  initialAnimation = true,
}) => {
  const [isHovering, setIsHovering] = useState(false);

  const normalizedPaths = React.useMemo(() => {
    if (paths.length > 0) return paths;
    if (path) {
      return [
        {
          d: path,
          stroke: strokeColor,
          strokeWidth,
          strokeLinecap,
        },
      ];
    }
    return [];
  }, [paths, path, strokeColor, strokeWidth, strokeLinecap]);

  // Initial animation variants
  const getPathVariants = (index) => ({
    hidden: {
      pathLength: 0,
      opacity: 0,
      pathOffset: reverseAnimation ? 1 : 0,
    },
    visible: {
      pathLength: 1,
      opacity: 1,
      pathOffset: reverseAnimation ? 0 : 0,
      transition: {
        pathLength: {
          type: "spring",
          duration: animationDuration,
          bounce: animationBounce,
          delay: animationDelay + index * staggerDelay,
        },
        pathOffset: {
          duration: animationDuration,
          delay: animationDelay + index * staggerDelay,
        },
        opacity: {
          duration: animationDuration / 4,
          delay: animationDelay + index * staggerDelay,
        },
      },
    },
  });

  if (normalizedPaths.length === 0) return null;

  return (
    <motion.svg
      width={width}
      height={height}
      viewBox={viewBox}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      initial={initialAnimation ? "hidden" : "visible"}
      animate="visible"
      onHoverStart={() => setIsHovering(true)}
      onHoverEnd={() => setIsHovering(false)}
      whileHover={
        enableHoverAnimation && hoverAnimationType !== "redraw"
          ? { scale: 1.05 }
          : {}
      }
    >
      {normalizedPaths.map((pathData, index) => (
        <AnimatedPath
          key={index}
          pathData={pathData}
          index={index}
          strokeColor={strokeColor}
          strokeWidth={strokeWidth}
          strokeLinecap={strokeLinecap}
          initialAnimation={initialAnimation}
          pathVariants={getPathVariants(index)}
          isHovering={isHovering && enableHoverAnimation}
          hoverAnimationType={hoverAnimationType}
          hoverStrokeColor={hoverStrokeColor}
          totalPaths={normalizedPaths.length}
        />
      ))}
    </motion.svg>
  );
};

const AnimatedPath = ({
  pathData,
  index,
  strokeColor,
  strokeWidth,
  strokeLinecap,
  initialAnimation,
  pathVariants,
  isHovering,
  hoverAnimationType,
  hoverStrokeColor,
  totalPaths,
}) => {
  const controls = useAnimationControls();
  const originalColor = pathData.stroke || strokeColor;

  // Handle hover animations
  React.useEffect(() => {
    if (!isHovering) {
      controls.stop();
      if (initialAnimation) {
        controls.start("visible");
      }
      return;
    }

    switch (hoverAnimationType) {
      case "redraw":
        controls.start({
          pathLength: [1, 0, 1],
          transition: {
            pathLength: {
              repeat: Number.POSITIVE_INFINITY,
              duration: 3,
              ease: "easeInOut",
            },
          },
        });
        break;

      case "float":
        controls.start({
          y: [0, -2, 0],
          transition: {
            y: {
              repeat: Number.POSITIVE_INFINITY,
              duration: 1.5,
              ease: "easeInOut",
            },
          },
        });
        break;

      case "pulse":
        controls.start({
          scale: [1, 1.03, 1],
          transition: {
            scale: {
              repeat: Number.POSITIVE_INFINITY,
              duration: 1.3,
              ease: "easeInOut",
            },
          },
        });
        break;

      case "color":
        controls.start({
          stroke: [
            originalColor,
            hoverStrokeColor || strokeColor,
            originalColor,
          ],
          transition: {
            stroke: {
              repeat: Number.POSITIVE_INFINITY,
              duration: 2,
              ease: "easeInOut",
            },
          },
        });
        break;

      case "sequential":
        controls.start({
          pathLength: [1, 0, 1],
          transition: {
            pathLength: {
              repeat: Number.POSITIVE_INFINITY,
              duration: 2,
              delay: (index / Math.max(totalPaths, 1)) * 2,
              ease: "easeInOut",
            },
          },
        });
        break;
    }
  }, [
    isHovering,
    hoverAnimationType,
    controls,
    originalColor,
    hoverStrokeColor,
    strokeColor,
    index,
    totalPaths,
    initialAnimation,
  ]);

  return (
    <motion.path
      d={pathData.d}
      stroke={pathData.stroke ?? strokeColor}
      strokeWidth={pathData.strokeWidth ?? strokeWidth}
      strokeLinecap={pathData.strokeLinecap ?? strokeLinecap}
      initial={initialAnimation ? "hidden" : "visible"}
      animate={controls}
      variants={pathVariants}
    />
  );
};
