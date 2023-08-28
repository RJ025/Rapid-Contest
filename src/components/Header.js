import { Link } from "react-router-dom"
import { useState } from "react";

const Header = () => {

    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <>
            <div className="lg:m-4 text-center lg:text-2xl font-bold md:m-2 sm:m-2 md:text-lg sm:text-md">
                <h1>RAPID CONTEST</h1>
            </div>
            
            <div className=" text-white flex justify-center ">
                    <div className=" w-[80%] flex flex-row justify-evenly text-center items-center bg-cyan-500 shadow-lg shadow-cyan-500/50 h-14 rounded-lg  overflow-x-auto dark-scrollbar">
                        <Link to='/'><div  className=" pl-5 pr-5 pt-2 pb-2 rounded-2xl hover:bg-cyan-600 active:bg-cyan-700  ">ALL</div></Link>
                        <Link to='/LeetCode'><div className="pl-5 pr-5 pt-2 pb-2 rounded-2xl hover:bg-cyan-600 active:bg-cyan-700  ">leetcode</div></Link>
                        <Link to='/CodeChef'><div className="pl-5 pr-5 pt-2 pb-2 rounded-2xl hover:bg-cyan-600 active:bg-cyan-700  ">codechef</div></Link>
                        <Link to='/CodeForces'><div className="pl-5 pr-5 pt-2 pb-2 rounded-2xl hover:bg-cyan-600 active:bg-cyan-700  ">codeforces</div></Link>
                        <Link to='/AtCoder'><div className="pl-5 pr-5 pt-2 pb-2 rounded-2xl hover:bg-cyan-600 active:bg-cyan-700  ">atCoder</div></Link>
                    </div>
            </div>

            {/* <div className="lg:m-4 text-center lg:text-2xl font-bold md:m-2 sm:m-2 md:text-lg sm:text-md">
                <h1>RAPID CONTEST</h1>
            </div>

            <div className="text-white flex justify-center">
                <div className="w-[80%] text-center items-center bg-cyan-500 shadow-lg shadow-cyan-500/50 rounded-lg dark-scrollbar">
                    <div
                        className={`${
                            menuOpen ? "block" : "hidden"
                        } lg:flex flex-row justify-evenly lg:text-center lg:items-center h-16 lg:h-auto`}
                    >
                        <Link to="/">
                            <div className="pl-3 pr-3 pt-1 pb-1 rounded-lg hover:bg-cyan-600 active:bg-cyan-700">
                                ALL
                            </div>
                        </Link>
                        <Link to="/LeetCode">
                            <div className="pl-3 pr-3 pt-1 pb-1 rounded-lg hover:bg-cyan-600 active:bg-cyan-700">
                                leetcode
                            </div>
                        </Link>
                        <Link to="/CodeChef">
                            <div className="pl-3 pr-3 pt-1 pb-1 rounded-lg hover:bg-cyan-600 active:bg-cyan-700">
                                codechef
                            </div>
                        </Link>
                        <Link to="/CodeForces">
                            <div className="pl-3 pr-3 pt-1 pb-1 rounded-lg hover:bg-cyan-600 active:bg-cyan-700">
                                codeforces
                            </div>
                        </Link>
                        <Link to="/AtCoder">
                            <div className="pl-3 pr-3 pt-1 pb-1 rounded-lg hover:bg-cyan-600 active:bg-cyan-700">
                                atCoder
                            </div>
                        </Link>
                    </div>
                    <button
                        onClick={toggleMenu}
                        className="lg:hidden h-fit px-3 py-2 rounded-lg hover:bg-cyan-600 active:bg-cyan-700"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            className="h-6 w-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 6h16M4 12h16m-7 6h7"
                            />
                        </svg>
                    </button>
                </div> */}
            {/* </div> */}
        </>
    )
}

export default Header;