
function Navbar (){
return (
    <nav className='flex w-auto navbar justify-self-center itask shadow-blue-950 justify-between bg-indigo-800 h-24 border-b-4 border-gray-800 text-white py-2'>
        <div className="logo itask pt-4 p-2"><span className="font-bold text-2xl ml-8 cursor-pointer   hover:font-extrabold hover:text-2xl transition-all duration-500">iTasks</span></div>
        <ul className="flex gap-8 mx-9">
            <li className="cursor-pointer text-xl pt-4 itask p-2 font-bold hover:font-extrabold transition-all hover:text-2xl duration-500">Home</li>
            <li className="cursor-pointer text-xl itask pt-4 p-2 font-bold hover:font-extrabold hover:text-2xl transition-all" >Your Tasks</li>
        </ul>
    </nav>
)
}
export default Navbar