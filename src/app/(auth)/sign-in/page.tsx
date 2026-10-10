import { Authlayout } from '../_components/auth-layout'
import Image from 'next/image'
import Arrow from '../../../assets/Arrow.png'
import { inputClass } from '../../(auth)/_style/input'

export default function SigninPage() {
    return (
        <Authlayout
            title="Bem-vindo de volta!  "
            decscription="conecte-se à sua conta"
            footerText="Não tem uma conta?"
            footerLinkText="Cadastre-se"
            footerHref="/sign-up"
        >
            <form className="space-y-4">
                <label className="block text-sm text-zinc-300 mb-2">
                    E-mail
                </label>
                <input
                    type="email"
                    placeholder="seu@gmail.com"
                    className={inputClass}
                />

                <label className="block text-sm text-zinc-300 mb-2">
                    Senha
                </label>
                <input
                    type="password"
                    placeholder="••••••••"
                    className={inputClass}
                />
                <button
                    type="submit"
                    className="w-full bg-[#9333EA] flex items-center justify-center py-4 gap-8 text-white font-semibold rounded-2xl hover:bg-violet-700 transition-colors cursor-pointer"
                >
                    <span> Entrar </span>
                    <Image src={Arrow} alt="icone de seta do botão" />
                </button>
            </form>
        </Authlayout>
    )
}
