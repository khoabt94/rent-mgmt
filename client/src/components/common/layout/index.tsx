import { ReactNode } from 'react'
import { Header } from './components'

export function RootLayout({ children }: { children: ReactNode }) {
    return (
        <div className="bg-slate-50 h-[100dvh-60px] overflow-hidden">
            <Header />
            <div className="mt-[60px]">
                {children}
            </div>
        </div >
    )
}
