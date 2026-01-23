/**
 * Copyright (c) 2026 3omdawy (Emad Ashraf)
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

"use client";

import React, { useState, useEffect } from "react";
import { ChevronDown, ChevronLeft, ChevronRight, Check } from "lucide-react";
import * as LucideIcons from "lucide-react";

/**
 * Accordion Component - Premium Custom Implementation
 */
export const Accordion = ({ children, title }: { children: React.ReactNode; title: string }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`premium-accordion-item ${isOpen ? "active" : ""}`}>
      <button
        className="premium-accordion-header"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <span className="premium-accordion-title">{title}</span>
        <ChevronDown className={`premium-accordion-icon ${isOpen ? "rotate-180" : ""}`} size={18} />
      </button>
      <div className={`premium-accordion-collapse ${isOpen ? "expanded" : ""}`}>
        <div className="premium-accordion-body">{children}</div>
      </div>
    </div>
  );
};

export const AccordionGroup = ({ children }: { children: React.ReactNode }) => (
  <div className="premium-accordion-group">{children}</div>
);

/**
 * Checkbox Component
 */
export const Checkbox = ({
  label,
  checked: initialChecked = false,
}: {
  label: string;
  checked?: boolean;
}) => {
  const [checked, setChecked] = useState(initialChecked);
  return (
    <div className="premium-checkbox" onClick={() => setChecked(!checked)}>
      <div className={`premium-checkbox-box ${checked ? "checked" : ""}`}>
        {checked && <Check size={14} strokeWidth={3} />}
      </div>
      <span className="premium-checkbox-label">{label}</span>
    </div>
  );
};

/**
 * Badge Component
 */
export const Badge = ({
  children,
  variant = "primary",
  pill = false,
}: {
  children: React.ReactNode;
  variant?: string;
  pill?: boolean;
}) => <span className={`premium-badge badge-${variant} ${pill ? "pill" : ""}`}>{children}</span>;

interface ButtonProps {
  children: React.ReactNode;
  variant?: string;
  size?: string;
  href?: string;
  onClick?: () => void;
}

/**
 * Button Component
 */
export const Button = ({
  children,
  variant = "primary",
  size = "md",
  href,
  onClick,
}: ButtonProps) => {
  const className = `premium-btn btn-${variant} btn-${size}`;
  if (href) {
    return (
      <a href={href} className={className.trim()}>
        {children}
      </a>
    );
  }
  return (
    <button className={className.trim()} onClick={onClick} type="button">
      {children}
    </button>
  );
};

/**
 * Icon Component
 */
export const Icon = ({
  name,
  size = 20,
  color,
  className = "",
}: {
  name: string;
  size?: number;
  color?: string;
  className?: string;
}) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const IconComponent = (LucideIcons as any)[name];
  if (!IconComponent) return null;
  return <IconComponent size={size} color={color} className={className} />;
};

interface FancyQuoteProps {
  children: React.ReactNode;
  header?: string;
  footer?: string;
  icon?: string;
}

/**
 * Fancy Quote
 */
export const FancyQuote = ({ children, header, footer, icon: IconName }: FancyQuoteProps) => (
  <blockquote className="premium-quote">
    {header && <div className="premium-quote-header">{header}</div>}
    <div className="premium-quote-content">{children}</div>
    {footer && (
      <footer className="premium-quote-footer">
        {IconName && <Icon name={IconName} size={14} className="opacity-70" />}
        <span>{footer}</span>
      </footer>
    )}
  </blockquote>
);

/**
 * Streak (Highlight section)
 */
export const Streak = ({ title, description }: { title: string; description: string }) => (
  <div className="premium-streak">
    <div className="premium-streak-content">
      <h2 className="premium-streak-title">{title}</h2>
      <p className="premium-streak-desc">{description}</p>
    </div>
  </div>
);

/**
 * Audio Player
 */
export const Audio = ({ src, title }: { src: string; title?: string }) => (
  <div className="premium-media-card">
    {title && <div className="premium-media-header">{title}</div>}
    <div className="premium-media-body">
      <audio controls className="premium-audio-element">
        <source src={src} type="audio/mpeg" />
      </audio>
    </div>
  </div>
);

/**
 * Video Player
 */
export const Video = ({ src, poster, title }: { src: string; poster?: string; title?: string }) => (
  <div className="premium-media-card">
    {title && <div className="premium-media-header">{title}</div>}
    <div className="premium-video-wrapper">
      <video controls poster={poster} className="premium-video-element">
        <source src={src} type="video/mp4" />
      </video>
    </div>
  </div>
);

/**
 * Carousel - Premium Implementation with Animations
 */
export const Carousel = ({ items }: { items: { image: string; title: string }[] }) => {
  const [current, setCurrent] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const next = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrent((prev) => (prev + 1) % items.length);
  };

  const prev = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrent((prev) => (prev - 1 + items.length) % items.length);
  };

  useEffect(() => {
    const timer = setTimeout(() => setIsTransitioning(false), 600);
    return () => clearTimeout(timer);
  }, [current]);

  return (
    <div className="premium-carousel">
      <div className="premium-carousel-inner">
        {items.map((item, i) => (
          <div
            key={i}
            className={`premium-carousel-item ${i === current ? "active" : ""} ${i === (current - 1 + items.length) % items.length ? "prev" : ""}`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={item.image} alt={item.title} />
            <div className="premium-carousel-caption">
              <h3>{item.title}</h3>
            </div>
          </div>
        ))}
      </div>

      <button className="premium-carousel-nav prev" onClick={prev}>
        <ChevronLeft size={24} />
      </button>
      <button className="premium-carousel-nav next" onClick={next}>
        <ChevronRight size={24} />
      </button>

      <div className="premium-carousel-dots">
        {items.map((_, i) => (
          <div
            key={i}
            className={`premium-carousel-dot ${i === current ? "active" : ""}`}
            onClick={() => setCurrent(i)}
          />
        ))}
      </div>
    </div>
  );
};

/**
 * Animation Wrapper
 */
export const Animate = ({
  children,
  type = "fade-in",
}: {
  children: React.ReactNode;
  type?: "fade-in" | "pulse";
}) => {
  return <div className={`premium-animate animate-${type}`}>{children}</div>;
};

/**
 * Table Wrapper
 */
export const TableWrapper = ({ children }: { children: React.ReactNode }) => (
  <div className="premium-table-container">
    <table className="premium-table">{children}</table>
  </div>
);

// MDX Components Object
export const components = {
  Accordion,
  AccordionGroup,
  Checkbox,
  Badge,
  Button,
  Icon,
  FancyQuote,
  Streak,
  Audio,
  Video,
  Carousel,
  Animate,
  TableWrapper,
};
