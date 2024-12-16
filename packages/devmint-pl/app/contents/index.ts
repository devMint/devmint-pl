import type { Post } from './posts/schema'

export const posts = [(await import('./posts/hidden-cost-of-dependencies/hidden-cost-of-dependecies')).default]

export type { Post }
