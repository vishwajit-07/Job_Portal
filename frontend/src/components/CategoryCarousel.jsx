import React from 'react'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel.jsx'
import { Button } from './ui/button'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setSearchedQuery } from '@/redux/jobSlice.js'

const category = [
    "Frontend Developer",
    "Backend Developer",
    "Data Science",
    "Graphic Designer",
    "FullStack Developer"
]
const CategoryCarousel = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const searchJobHandler = (query) => {
        dispatch(setSearchedQuery(query));
        navigate('/browse');
    }
    return (
        <div>
            <Carousel className="w-full max-w-xl mx-auto my-20">
                <CarouselContent className="flex gap-1 sm:gap-2 md:gap-3"> {/* Reduce gap */}
                    {
                        category.map((cat, index) => (
                            <CarouselItem className="md:basis-1/2 ite lg-basis-1/3" key={index}>
                                <Button onClick={() => searchJobHandler(cat)} className="rounded-full" variant="outline">{cat}</Button>
                            </CarouselItem>
                        ))
                    }
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
        </div>
    )
}

export default CategoryCarousel
