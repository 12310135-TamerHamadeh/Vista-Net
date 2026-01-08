import React from 'react'

const Footer = ({
    hosts,
    activeCount
}) => {
    return (
        <div className="px-4 py-3 border-t border-[#e0e0e0] bg-white dark:border-t-[#444] dark:bg-[#333]">
            <div className="text-[11px] text-[#666] dark:text-[#ccc]">
                Total: {hosts.length} | Active: {activeCount}
            </div>
        </div>
    )
}

export default Footer