import { PropsWithChildren } from 'react'

export default function PageContainer({children}: PropsWithChildren) {
  return (
    <main className='bg-white shadow-md px-2 py-4'>
      {children}
    </main>
  )
}
