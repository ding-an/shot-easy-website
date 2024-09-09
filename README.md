# ImgTools - take a screenshot online

Photo edit online for free, resize, and filter any photos, edit photo on browser, convert image to jpg/png/jpeg/webp, easy to screenshot area or full page

[🏆 Chrome Extension](https://chromewebstore.google.com/detail/nmppkehciohcgcehlnifgeokgioidknh)

[🏞️ Image Editor](https://ImgTools.fun/)

[😱 Screenshot Beautifier](https://ImgTools.fun/screenshot-beautifier/)

[🚴 Photo to Rounded](https://ImgTools.fun/photo-to-rounded/)

[😬 Image Compressor](https://ImgTools.fun/image-compressor/)

## Blog

Use GitHub issues as blog storage

need create github access token

## Environment variables

```
// request secret key
PUBLIC_SECRET_KEY=
// removeBG apikey
REMOVE_API_KEY=
// github access token
GITHUB_CLIENT_SECRET=
// github name
GITHUB_OWNER=
// github repository
GITHUB_REPO=
```

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                    | Action                                           |
| :------------------------- | :----------------------------------------------- |
| `pnpm install`             | Installs dependencies                            |
| `pnpm run dev`             | Starts local dev server at `localhost:4321`      |
| `pnpm run build`           | Build your production site to `./dist/`          |
| `pnpm run preview`         | Preview your build locally, before deploying     |
| `pnpm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `pnpm run astro -- --help` | Get help using the Astro CLI                     |

## 🚀 Deploy With Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FCH563%2Fshot-easy-website)

[Vercel:](https://vercel.com/) used for deploying website

### If you find anything wrong, give me an Issues

[Give me the bugs](https://github.com/CH563/shot-easy-website/issues)

## 👀 Want to learn more?

Feel free to check [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).

## checklist
- request header x-country

```
  const cfCountryCode = isBrowser ? window.cf_country_code : cookie.get('cf_country_code', cookieText || '')
  if (process.env.NODE_ENV === 'development') {
    baseHeaders.append('X-COUNTRY', 'GB')
  } else {
    cfCountryCode && baseHeaders.append('X-COUNTRY', cfCountryCode)
  }

```
