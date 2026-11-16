import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
export const cn = (...i: ClassValue[]) => twMerge(clsx(i))
export const LOGIN = 'https://joeynatale28-source.github.io/daylight/login/'
export const SHOT = (n: string) => `hero/assets/screenshots/${n}.png`
