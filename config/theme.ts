/**
 * Theme Configuration
 * 
 * Easily customize your blog's appearance by modifying the colors below.
 * All color values support any valid CSS color format (hex, rgb, hsl, etc.)
 */

export const theme = {
  light: {
    // Background colors
    background: '#ffffff',          // Main background
    surface: '#f8fafc',            // Cards, elevated surfaces
    surfaceHover: '#f1f5f9',       // Hover state for surfaces
    
    // Text colors
    text: '#0f172a',               // Primary text
    textSecondary: '#475569',      // Secondary text
    textMuted: '#94a3b8',          // Muted/disabled text
    
    // Brand colors
    primary: '#3b82f6',            // Primary brand color (links, buttons)
    primaryHover: '#2563eb',       // Primary hover state
    accent: '#8b5cf6',             // Accent color (highlights, badges)
    accentHover: '#7c3aed',        // Accent hover state
    
    // Semantic colors
    success: '#10b981',            // Success messages
    warning: '#f59e0b',            // Warning messages
    error: '#ef4444',              // Error messages
    info: '#06b6d4',               // Info messages
    
    // UI elements
    border: '#e2e8f0',             // Borders, dividers
    borderHover: '#cbd5e1',        // Border hover state
    code: '#f1f5f9',               // Inline code background
    codeText: '#7c3aed',           // Inline code text
    blockquote: '#e2e8f0',         // Blockquote border
  },
  
  dark: {
    // Background colors
    background: '#0f172a',         // Main background (slate-900)
    surface: '#1e293b',            // Cards, elevated surfaces (slate-800)
    surfaceHover: '#334155',       // Hover state for surfaces (slate-700)
    
    // Text colors
    text: '#f1f5f9',               // Primary text (slate-100)
    textSecondary: '#cbd5e1',      // Secondary text (slate-300)
    textMuted: '#64748b',          // Muted/disabled text (slate-500)
    
    // Brand colors
    primary: '#60a5fa',            // Primary brand color (blue-400)
    primaryHover: '#3b82f6',       // Primary hover state (blue-500)
    accent: '#a78bfa',             // Accent color (violet-400)
    accentHover: '#8b5cf6',        // Accent hover state (violet-500)
    
    // Semantic colors
    success: '#34d399',            // Success messages (emerald-400)
    warning: '#fbbf24',            // Warning messages (amber-400)
    error: '#f87171',              // Error messages (red-400)
    info: '#22d3ee',               // Info messages (cyan-400)
    
    // UI elements
    border: '#334155',             // Borders, dividers (slate-700)
    borderHover: '#475569',        // Border hover state (slate-600)
    code: '#1e293b',               // Inline code background (slate-800)
    codeText: '#c4b5fd',           // Inline code text (violet-300)
    blockquote: '#475569',         // Blockquote border (slate-600)
  },
} as const;

export type ThemeColors = typeof theme.light;
export type ThemeMode = keyof typeof theme;
