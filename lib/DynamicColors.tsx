// "use client";
// export const dynamic = "force-dynamic";
// import { useEffect } from "react";

// export default function DynamicColors() {
//     useEffect(() => {
//         const applyColors = (colors: Record<string, string>): void => {
//             Object.keys(colors).forEach((key: string) => {
//                 document.documentElement.style.setProperty(`--${key}`, colors[key]);
//             });
//         };

//         async function fetchColors() {
//             try {
//                 const res = await fetch("/api/colors");
//                 const colors = await res.json();
//                 applyColors(colors);
//             } catch (error) {
//                 console.error("Error fetching colors:", error);
//             }
//         }

//         fetchColors();
//     }, []);

//     return null;
// }

"use client";
export const dynamic = "force-dynamic";
import { useEffect } from "react";

function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
    hex = hex.replace(/^#/, '');

    const bigint = parseInt(hex, 16);

    return {
        r: (bigint >> 16) & 255,
        g: (bigint >> 8) & 255,
        b: bigint & 255
    };
}

function rgbToHsl(r: number, g: number, b: number): { h: number; s: number; l: number } {
    r /= 255;
    g /= 255;
    b /= 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0;
    let s = 0;
    const l = (max + min) / 2;

    if (max !== min) {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

        switch (max) {
            case r:
                h = (g - b) / d + (g < b ? 6 : 0);
                break;
            case g:
                h = (b - r) / d + 2;
                break;
            case b:
                h = (r - g) / d + 4;
                break;
        }

        h /= 6;
    }

    return {
        h: Math.round(h * 360),
        s: Math.round(s * 100),
        l: Math.round(l * 100)
    };
}

// Main hex to HSL converter
function hexToHsl(hex: string): string {
    const rgb = hexToRgb(hex);
    if (!rgb) return '';

    const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
    return `${hsl.h}, ${hsl.s}%, ${hsl.l}%`;
}

export default function DynamicColors() {
    useEffect(() => {
        const applyColors = (colors: Record<string, string>): void => {
            Object.keys(colors).forEach((key: string) => {
                const hslColor = hexToHsl(colors[key]);
                if (hslColor) {
                    document.documentElement.style.setProperty(`--${key}`, hslColor);
                }
            });
        };
 
        async function fetchColors() {
            try {
                const res = await fetch("/api/colors");
                const colors = await res.json();
                applyColors(colors);
            } catch (error) {
                console.error("Error fetching colors:", error);
            }
        }

        fetchColors();
    }, []);

    return null;
}