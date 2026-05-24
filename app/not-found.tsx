import Link from 'next/link';
import Image from 'next/image';
import { Home } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <div className="relative w-full max-w-md aspect-square mb-8 rounded-2xl overflow-hidden shadow-2xl ring-1 ring-border/50">
        <Image 
          src="/404_error.jpg"
          alt="404 Page Not Found"
          fill
          priority
          className="object-cover"
        />
      </div>
      <h1 className="text-4xl font-bold mb-4 text-foreground tracking-tight">Oops! Lost in Time</h1>
      <p className="text-muted-foreground text-center mb-8 max-w-md">
        We couldn't find the page you're looking for. It might have been moved or the timer has expired.
      </p>
      <Link href="/">
        <Button size="lg" className="gap-2 rounded-full font-semibold px-8">
          <Home className="w-4 h-4" />
          Back to Home
        </Button>
      </Link>
    </div>
  );
}
