# Next.js

## Info

**Next.js** — открытый JavaScript фреймворк, созданный поверх **React.js** для создания веб-приложений. 
Фреймворк был предназначен для решения проблемы **React.js**, связанную с отрисовкой приложения на стороне сервера - **SSR**. 
Работает на сервере и в браузере.


## Pages

A **page** is a React Component, each page is associated with a route based on its file name.

```jsx
// pages/about.js
function About() {
  return <div>About</div>
}
export default About
```
File `pages/about.js` - corresponds to `/about` path


## Layouts
```jsx
// components/layout.js
import Navbar from './navbar'
import Footer from './footer'
export default function Layout({ children }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  )
}
// pages/index.js
import Layout from '../components/layout'
import NestedLayout from '../components/nested-layout'
export default function Page() {
  return <div>Hello Next.js!</div>
}
Page.getLayout = function getLayout(page) {
  return (
    <Layout>
      <NestedLayout>{page}</NestedLayout>
    </Layout>
  )
}
// pages/_app.js
export default function MyApp({ Component, pageProps }) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout || ((page) => page)
  return getLayout(<Component {...pageProps} />)
}
```


## Routing

When a file is added to the pages directory, it's automatically available as a route.

### Routes examples
* `pages/index.js` → `/`
* `pages/blog/index.js` → `/blog`
* `pages/blog/first-post.js` → `/blog/first-post`
* `pages/dashboard/settings/username.js` → `/dashboard/settings/username`
* `pages/blog/[slug].js` → `/blog/:slug` (`/blog/hello-world`)
* `pages/[username]/settings.js` → `/:username/settings` (`/foo/settings`)
* `pages/post/[...all].js` → `/post/*` (`/post/2020/id/title`)

### `<Link>`
```jsx
function Posts(props) {
  return (
    <>
      <Link href="/about"><a>About Us</a></Link>
      <Link
        href={{
          pathname: '/blog/[slug]',
          query: { slug: props.slug },
        }}
      >
        <a>{props.blogTitle}</a>
      </Link>
    </>
  )
}
```

### Dynamic Routes
Any route like /post/1, /post/abc, etc. will be matched by file:
```jsx
// pages/post/[pid].js
import { useRouter } from 'next/router'
const Post = () => {
  const router = useRouter()
  const { pid } = router.query

  return <p>Post: {pid}</p>
}
```

### Shallow Routing
```jsx
import { useEffect } from 'react'
import { useRouter } from 'next/router'
// Current URL is '/'
function Page() {
  const router = useRouter()

  useEffect(() => {
    // Always do navigations after the first render
    router.push('/?counter=10', undefined, { shallow: true })
  }, [])

  useEffect(() => {
    // The counter changed!
  }, [router.query.counter])
}
export default Page
```
The URL will get updated to `/?counter=10` and the page won't get replaced, only the state of the route is changed.

### API Routes
Any file inside the folder `pages/api` is mapped to `/api/*` and will be treated as an API endpoint instead of a page. 
They are server-side only bundles and won't increase your client-side bundle size.

API route `pages/api/user.js` returns a `json` response with a status code of `200`:
```jsx
export default function handler(req, res) {
  res.status(200).json({ name: 'John Doe' })
}
```


## Image Optimization, Font Optimization

### Optimizations built into the Image component:
* Improved Performance: Always serve correctly sized image for each device, using modern image formats
* Visual Stability: Prevent Cumulative Layout Shift automatically
* Faster Page Loads: Images are only loaded when they enter the viewport, with optional blur-up placeholders
* Asset Flexibility: On-demand image resizing, even for images stored on remote servers

### Image Optimization
```jsx
import Image from 'next/image'
import profilePic from '../public/me.png'
function Home() {
  return (
    <Image
      src={profilePic}
      alt="Picture of the author"
      // width={500} automatically provided
      // height={500} automatically provided
      // blurDataURL="data:..." automatically provided
      // placeholder="blur" // Optional blur-up while loading
    />
  )
}
```

### Font Optimization
```jsx
// pages/_document.js
import Document, { Html, Head } from 'next/document'
class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link
            href="https://fonts.googleapis.com/css2?family=Inter&display=optional"
            rel="stylesheet"
          />
        </Head>
        <body>...</body>
      </Html>
    )
  }
}
export default MyDocument
```


## Data Fetching

### getServerSideProps
```jsx
function Page({ data }) {/*...*/}
// This gets called on every request
export async function getServerSideProps() {
  // Fetch data from external API
  const res = await fetch(`https://.../data`)
  const data = await res.json()
  // Pass data to the page via props
  return { props: { data } }
}
export default Page
```

### getStaticPaths
If a page has Dynamic Routes and uses `getStaticProps`, it needs to define a list of paths to be statically generated.
```jsx
export async function getStaticPaths() {
  return {
    paths: [
      { params: { ... } }
    ],
    fallback: true // false or 'blocking'
  };
}
```

### getStaticProps
Will pre-render a page at build time using the props returned by getStaticProps.
```jsx
function Blog({ posts }) {/*...*/}
export async function getStaticProps() {
  const res = await fetch('https://.../posts')
  const posts = await res.json()
  // By returning { props: { posts } }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: {
      posts,
    },
  }
}
export default Blog
```


## Incremental Static Regeneration
Allows you to create or update static pages after you’ve built your site.
Enables you to use static-generation on a per-page basis, without needing to rebuild the entire site.
```jsx
function Blog({ posts }) {/*...*/}
export async function getStaticProps() {
  //...
  return {
    props: {/*...*/},
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every 10 seconds
    revalidate: 10, // In seconds
  }
}
export default Blog
```


## Environment Variables
```jsx
// .env.local:
DB_HOST=localhost
DB_USER=myuser
DB_PASS=mypassword
NEXT_PUBLIC_ANALYTICS_ID=abcdefghijk // for browser you have to prefix the variable with NEXT_PUBLIC_

// pages/index.js
import setupAnalyticsService from '../lib/my-analytics-service'
setupAnalyticsService(process.env.NEXT_PUBLIC_ANALYTICS_ID)

export async function getStaticProps() {
  const db = await myDB.connect({
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
  })
  // ...
}
```

