import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { format, isValid } from 'date-fns';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(value: string | Date | null | undefined, dateFormat = 'MMM yyyy') {
  if (!value) return '';
  const date = value instanceof Date ? value : new Date(String(value));
  return isValid(date) ? format(date, dateFormat) : '';
}
