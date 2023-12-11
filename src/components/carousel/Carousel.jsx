import React, { useRef } from 'react'
import {BsFillArrowLeftCircleFill, BsFillArrowRightCircleFill} from 'react-icons/bs'
import ContentWrapper from '../contentWrapper/ContentWrapper'
import dayjs from 'dayjs'
import Img from '../lazyLoadImage/Img'
import PosterFallback from '../../../public/no-poster.png'
import './carousel.scss'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import CircleRating from '../circleRating/CircleRating'
import Genres from '../genres/Genres'

const Carousel = ({data, loading}) => {
    const carouselContainer = useRef()
    const { url } = useSelector((state) => state.home)
    const navigate = useNavigate()

    const navigation = (dir) => {
        const container = carouselContainer.current
        
        const scrollAmount = (dir === 'left')
            ? container.scrollLeft - (container.offsetWidth + 20)
            : container.scrollLeft + (container.offsetWidth + 20)

        container.scrollTo({
            left: scrollAmount,
            behavior: 'smooth'
        })
    }

    const skItem = () => {
        return (
            <div className="skeletonItem w-[125px] flex-shrink-0 ">
                <div className="posterBlock skeleton rounded-xl w-full aspect-[1/1.5] mb-[30px] "></div>
                <div className="textBlock flex flex-col space-y-[10px]">
                    <div className="title skeleton w-full h-5 rounded-md"></div>
                    <div className="date skeleton w-3/4 h-5 rounded-md"></div>
                </div>
            </div>
        )
    }

    return (
        <div className='carousel mb-[50px] '>
            <ContentWrapper>
                <div className='contentWrapper relative'>
                    <BsFillArrowLeftCircleFill
                        className='carouselLeftNav arrow text-3xl text-black absolute left-[10px] top-[44%] -translate-y-[50%] cursor-pointer opacity-60 hover:opacity-90 transition-all z-10 hidden md:block bg-green-300 rounded-full '
                        onClick={() => navigation('left')}
                    />
                    <BsFillArrowRightCircleFill
                        className='carouselRightNav arrow text-3xl text-black absolute right-[10px] top-[44%] -translate-y-[50%] cursor-pointer opacity-60 hover:opacity-90 transition-all z-10 hidden md:block bg-green-300 rounded-full '
                        onClick={() => navigation('right')}
                    />
                    {loading ? (
                        <div className='loadingSkeleton flex gap-x-[10px] md:gap-x-[20px] overflow-y-hidden md:overflow-hidden md:m-0 md:p-0 -mx-[20px] px-[20px] '>
                            {skItem()}
                            {skItem()}
                            {skItem()}
                            {skItem()}
                            {skItem()}
                            {skItem()}
                        </div>
                    ) : (
                        <div 
                        className='carouselItems flex gap-[10px] overflow-y-scroll -mx-[20px] px-[20px] md:gap-[20px] overflow-hidden m-0 p-0 ' 
                        ref = {carouselContainer}>
                            {data?.map((item) => {
                                console.log(item.release_Date);
                                const posterUrl = item.poster_path 
                                    ? url.poster + item.poster_path 
                                    : PosterFallback
                                return (
                                    <div 
                                    key={item.id}
                                    className={`carouselItem w-[125px] cursor-pointer md:w-[24%] lg:w-[calc(20% - 16px)] flex-shrink-0 `} 
                                    onClick={() => navigate(`/${item.media_type}/${item.id}`)}>
                                        <div className="posterBlock relative w-full aspect-[1/1.5] bg-cover bg-center mb-[30px] flex items-end justify-between">
                                            <Img 
                                            src={posterUrl} 
                                            className={`w-full h-full object-cover object-center`} />
                                            <CircleRating rating={item.vote_average.toFixed(1)} />
                                            <Genres data={item.genre_ids.slice(0, 2)} />
                                        </div>

                                        <div className="textBlock flex flex-col text-white">
                                            <span className="title text-[16px] mb-[10px] leading-6 md:text-[20px] ">
                                                {item.title || item.name}
                                            </span>
                                            <span className="date text-[14px] opacity-50">
                                                {dayjs(item.release_date).format("MMM DD YYYY")}
                                            </span>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    )}
                </div>
            </ContentWrapper>
        </div>
    )
}

export default Carousel