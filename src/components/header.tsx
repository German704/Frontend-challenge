interface Props {
    title: string,
    goBack?: boolean,
}

export default function Header({ title, goBack }: Props) {
    return (
        <header className="w-full h-20 flex flex-col items-center justify-start bg-white">
            <div className="w-full h-10 p-2">
                <img src="./LOGO.png" alt="Logo" className="w-16"/>
            </div>
            <div className="w-full h-10 flex items-center justify-between flex-wrap">
                {goBack &&
                    <button className="">
                    back
                    </button>
                }
                <h1 className="max-w-1/2 block">
                    {title}
                </h1>
                {
                    !goBack &&
                    (<a href="/projects/create" className="rounded bg red p-3 max-w-1/2 block">
                        add-projects
                    </a>)
                }
            </div>
        </header>
    )
}