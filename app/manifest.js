export default function manifest() {
  return {
    name: 'AproMax Engineering',
    short_name: 'AproMax',
    description: 'Professional Engineering, Design & Technology Services',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#085FF1',
    icons: [
      {
        src: '/web-app-manifest-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/web-app-manifest-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}
