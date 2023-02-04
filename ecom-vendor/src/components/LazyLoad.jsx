import {Suspense} from 'react'

export default function LazyLoad({children}) {
  return (
    <Suspense fallback={<p>Loading....</p>}>
      {children}
    </Suspense>
  )
}
