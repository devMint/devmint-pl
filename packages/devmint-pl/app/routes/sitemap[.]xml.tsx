import { getSitemap } from '../contents/feed.server'

export async function loader() {
  return getSitemap()
}
