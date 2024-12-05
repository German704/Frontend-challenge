import { PropsWithChildren } from 'react'
interface Props{
  classname?: string;
}

export const PageContainer = ({classname, children}: PropsWithChildren<Props>) => {
  return (
    <main className={`bg-white shadow-md w-full ${classname}`}>
      {children}
    </main>
  )
}
