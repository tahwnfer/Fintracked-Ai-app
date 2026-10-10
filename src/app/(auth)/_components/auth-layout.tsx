import Link from 'next/link'
import dollaricon from './../../../assets/dollaricon.png'
import Image from 'next/image'
interface AuthLayoutProps {
    title: string
    decscription: string
    children: React.ReactNode
    footerText: string
    footerLinkText: string
    footerHref: string
}

export const Authlayout = ({
    title,
    decscription,
    children,
    footerText,
    footerLinkText,
    footerHref,
}: AuthLayoutProps) => {
    return (
        <section className='h-screen flex items-center justify-center'>
            <div className='bg-[#18181B] w-full max-w-md p-8 rounded-2xl '>
                <div className='flex flex-col items-center mb-8'>
                <div className='mb-6'>
                    <Image src={dollaricon} alt=' Icone da página de autenticação ' width={50} height={50} />
                </div>

                <h1 className='text-2xl font-bold text-white mb-2'>{title}</h1>
                <p className='text-sm text-[#9f9fa9] mb-6'>{decscription}</p>
                </div>

                {children}

                <div className='mt-10 text-center'>
                    <p className='text-sm text-[#9f9fa9]'>
                        {footerText}

                      < Link href={footerHref} className='text-[#9333EA] font-semibold hover:underline ml-1'>
                      {footerLinkText}
                      </Link>
                    </p>
                </div>

            </div>
        </section>
    )
}
