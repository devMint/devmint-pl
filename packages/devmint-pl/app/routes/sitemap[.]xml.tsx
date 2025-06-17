import { getFeed } from '../contents'

export async function loader() {
  return (await getFeed()).rss2()
}
