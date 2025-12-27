import { describe, it, expect } from 'vitest';
import { cn } from './cn';

describe('cn utility', () => {
    it('should merge class names correctly', () => {
        expect(cn('w-full', 'h-full')).toBe('w-full h-full');
    });

    it('should handle conditional classes', () => {
        expect(cn('w-full', true && 'h-full', false && 'bg-red-500')).toBe('w-full h-full');
    });

    it('should merge tailwind conflicts correctly', () => {
        expect(cn('p-2', 'p-4')).toBe('p-4');
    });

    it('should handle arrays and objects', () => {
        expect(cn(['p-2', { 'bg-red-500': true }])).toBe('p-2 bg-red-500');
    });
});
