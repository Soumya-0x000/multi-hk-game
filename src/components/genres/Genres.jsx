import React from 'react'
import { useSelector } from 'react-redux'

const Genres = ({data}) => {
    const { genres } = useSelector((state) => state.home)

    return (
        <div className='genres hidden md:flex gap-x-1 gap-y-1 items-center justify-end z-10 mr-1 mb-1 flex-wrap'>
            {data?.map((item) => {
                if (!genres[item]?.name) return
                return (
                    <div key={item} className="genre text-white bg-pink text-[13px] rounded-md px-1 ">
                        {genres[item]?.name}
                    </div>
                )
            })}
        </div>
    )
}

export default Genres