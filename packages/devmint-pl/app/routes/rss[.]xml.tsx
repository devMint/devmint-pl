import { getFeed } from '../contents/feed.server'

export async function loader() {
  return (await getFeed()).rss2()
}
