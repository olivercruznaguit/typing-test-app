import { FaGithubSquare } from "react-icons/fa";

function Nav() {

return (
    <nav className="flex flex-row justify-between p-10">
        <div>
            <h1 className="text-5xl font-mono mb-2">Typing Test</h1>
        </div>
        <span>
            <a href="https://github.com/olivercruznaguit" target="_blank" className="flex items-center"><FaGithubSquare className="h-10 w-10"/></a>
        </span>
    </nav>
)
}

export default Nav;