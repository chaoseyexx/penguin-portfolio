
"use client"

import { Card, CardContent } from "@/components/ui/card"
import { reviews } from "@/data/reviews"
import { Star, Quote } from "lucide-react"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"

export function Reviews() {
    return (
        <section id="reviews" className="py-24 bg-secondary/5 border-y border-white/5">
            <div className="container mx-auto px-4 md:px-6 lg:px-8">
                <div className="flex flex-col items-center text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold font-heading mb-4">Client <span className="text-primary">Stories</span></h2>
                    <p className="text-muted-foreground text-lg">
                        Don't just take my word for it. Here is what past clients have to say about our collaborations.
                    </p>
                </div>

                <Carousel className="w-full max-w-5xl mx-auto">
                    <CarouselContent>
                        {reviews.map((review) => (
                            <CarouselItem key={review.id} className="md:basis-1/2 lg:basis-1/3 p-4">
                                <div className="h-full">
                                    <Card className="h-full bg-background border-border hover:border-primary/30 transition-all duration-300">
                                        <CardContent className="p-8 flex flex-col h-full">
                                            <div className="mb-6 text-primary">
                                                <Quote className="h-8 w-8 opacity-50" />
                                            </div>

                                            <p className="text-muted-foreground italic mb-6 flex-grow">"{review.content}"</p>

                                            <div className="flex items-center gap-4 mt-auto">
                                                <div
                                                    className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-white text-sm"
                                                    style={{ backgroundColor: review.avatarColor }}
                                                >
                                                    {review.name.charAt(0).toUpperCase()}
                                                </div>
                                                <div>
                                                    <h4 className="font-bold text-sm">{review.name}</h4>
                                                    <p className="text-xs text-muted-foreground">{review.project}</p>
                                                </div>
                                                <div className="ml-auto flex gap-0.5">
                                                    {[...Array(review.rating)].map((_, i) => (
                                                        <Star key={i} className="h-3 w-3 fill-primary text-primary" />
                                                    ))}
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <div className="hidden md:block">
                        <CarouselPrevious />
                        <CarouselNext />
                    </div>
                </Carousel>
            </div>
        </section>
    )
}
