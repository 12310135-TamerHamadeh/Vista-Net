import React from 'react'

const Header = () => {
    const name = localStorage.getItem("name")
    return (
        <div className="flex justify-between items-center py-4 px-6 border-b border-[#e0e0e0] shrink-0 ">
            <h1 className='m-0 text-[18px] font-semibold text-[#333]'>Welcome Back {name}</h1>
            <div className="text-[12px] text-[#999]" id="periodRange">
                Real-time
            </div>
        </div>
    )
}

export default Header