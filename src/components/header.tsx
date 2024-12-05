import { useNavigate } from "react-router-dom"
interface Props {
    title: string,
    goBack?: boolean,
}

export const Header = ({ title, goBack }: Props) => {
    const navigate =  useNavigate();
    function back() {
        navigate(-1);
    };
    return (
        <header className="w-full h-20 shadow flex flex-col items-center justify-start bg-white">
            <div className="w-full h-10 px-4 py-3 border-b-[1px] border-[#D9D9D9]">
                <img src="../../LOGO.png" alt="Logo" className="min-w-12"/>
            </div>
            <div className="w-full border-b-[1px] border-[#D9D9D9] h-10 flex items-center justify-between px-4 py-3">
                <div className="flex flex-wrap gap-3">
                {goBack &&
                    <button className="flex flex-wrap gap-1 items-center text-xs text-[#000000A6]"
                    onClick={back}>
                        <img src="../../arrow-left-line.png" alt="arrow left" 
                        className="w-[22px]" /> 
                        Back
                    </button>
                }
                <h1 className="max-w-1/2 font-medium">
                    {title}
                </h1>
                </div>
                {
                    !goBack &&
                    (<a href="/projects/create" className="rounded flex items-center gap-1 bg-[#F5222D] p-2 text-white text-xs">
                       <strong className="text-[20px]/[13px]">+</strong> Add project
                    </a>)
                }
            </div>
        </header>
    )
}