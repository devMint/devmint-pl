import { createRequestHandler } from 'react-router'

const requestHandler = createRequestHandler(() => import('virtual:react-router/server-build'), import.meta.env.MODE)

// /**
//  * Declare our loaders and actions context type
//  */
// declare module 'react-router' {
//   interface AppLoadContext {}
// }

export default {
  fetch: (req) => requestHandler(req, {}),
} satisfies ExportedHandler<Env>
