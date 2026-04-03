"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Star } from "lucide-react"
import { useAuth } from "@clerk/nextjs"
import axios from "axios"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { Review } from "@prisma/client"
import { Separator } from "@/components/ui/separator"
import Image from "next/image"

interface CarReviewsProps {
  carId: string
  reviews: Review[]
}

export function CarReviews({ carId, reviews }: CarReviewsProps) {
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { userId } = useAuth()
  const router = useRouter()
  const { toast } = useToast()

  const onSubmit = async () => {
    try {
      setIsLoading(true)
      await axios.post(`/api/car/${carId}/review`, { rating, comment })
      toast({ title: "Reseña enviada", description: "¡Gracias por tu opinión!" })
      setRating(0)
      setComment("")
      router.refresh()
    } catch (error) {
      toast({
        title: "Algo salió mal",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="mt-12 space-y-8">
      <Separator />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Opiniones de clientes ({reviews.length})</h2>
          
          <div className="space-y-6">
            {reviews.length === 0 ? (
              <p className="text-muted-foreground italic">Aún no hay reseñas para este vehículo.</p>
            ) : (
                reviews.map((review) => (
                    <div key={review.id} className="p-4 rounded-xl border bg-card/50 space-y-3">
                        <div className="flex items-center gap-3">
                            <div className="relative w-10 h-10 rounded-full overflow-hidden border">
                                {review.avatarUrl ? (
                                    <Image src={review.avatarUrl} alt={review.userName} fill className="object-cover" />
                                ) : (
                                    <div className="w-full h-full bg-primary/10 flex items-center justify-center font-bold text-primary">
                                        {review.userName.charAt(0)}
                                    </div>
                                )}
                            </div>
                            <div>
                                <p className="text-sm font-bold">{review.userName}</p>
                                <div className="flex gap-0.5">
                                    {[...Array(5)].map((_, i) => (
                                        <Star
                                            key={i}
                                            className={cn(
                                                "w-3 h-3",
                                                i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                                            )}
                                        />
                                    ))}
                                </div>
                            </div>
                            <span className="ml-auto text-[10px] text-muted-foreground uppercase font-bold">
                                {new Date(review.createdAt).toLocaleDateString()}
                            </span>
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            "{review.comment}"
                        </p>
                    </div>
              ))
            )}
          </div>
        </div>

        <div className="space-y-6">
          <div className="p-6 rounded-2xl border bg-card/10 border-dashed">
            <h3 className="text-xl font-bold mb-4">Escribe tu opinión</h3>
            {!userId ? (
                <p className="text-sm text-muted-foreground">Debes iniciar sesión para dejar una reseña.</p>
            ) : (
                <div className="space-y-4">
                    <div className="flex flex-col gap-2">
                        <p className="text-sm font-medium">¿Cómo estuvo tu experiencia?</p>
                        <div className="flex gap-1">
                        {[...Array(5)].map((_, i) => (
                            <Star
                            key={i}
                            className={cn(
                                "w-8 h-8 cursor-pointer transition-colors",
                                i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300 hover:text-yellow-200"
                            )}
                            onClick={() => setRating(i + 1)}
                            />
                        ))}
                        </div>
                    </div>
                    
                    <div className="space-y-2">
                        <p className="text-sm font-medium">Comentario</p>
                        <textarea
                            className="w-full min-h-[120px] p-4 rounded-xl border bg-transparent focus:ring-2 focus:ring-primary/20 outline-none transition"
                            placeholder="Cuéntanos más sobre el vehículo..."
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                        />
                    </div>

                    <Button 
                        onClick={onSubmit} 
                        disabled={isLoading || rating === 0 || comment.length < 3}
                        className="w-full h-12 rounded-xl font-bold"
                    >
                        {isLoading ? "Enviando..." : "Enviar Reseña"}
                    </Button>
                </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(" ")
}
