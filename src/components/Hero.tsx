
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import { cn } from '@/lib/utils';
import { useFadeIn } from '@/lib/animation';
import { Shield, Lock, Vote } from 'lucide-react';

const Hero = () => {
  const { isAuthenticated } = useAuth();
  const title1 = useFadeIn({ delay: 100 });
  const title2 = useFadeIn({ delay: 300 });
  const subtitle = useFadeIn({ delay: 500 });
  const buttons = useFadeIn({ delay: 700 });
  const cards = useFadeIn({ delay: 900 });
  
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCount(prev => (prev < 2487) ? prev + 7 : prev);
    }, 100);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative min-h-screen flex flex-col justify-center text-center px-4">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background to-background/80 -z-10" />
      
      {/* Animated circles */}
      <div className="absolute top-1/3 left-1/4 w-64 h-64 rounded-full bg-accent/5 animate-pulse-soft -z-10"></div>
      <div className="absolute bottom-1/4 right-1/3 w-96 h-96 rounded-full bg-accent/10 animate-pulse-soft -z-10"></div>

      <div className="max-w-5xl mx-auto pt-24 pb-10">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          <div style={title1.style} className="inline-block">
            The Future of Voting is
          </div>{' '}
          <div style={title2.style} className="text-accent inline-block">
            Secure & Transparent
          </div>
        </h1>
        
        <p style={subtitle.style} className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-8">
          A next-generation voting platform powered by blockchain technology and AI verification, ensuring every vote is secure, transparent, and authentic.
        </p>
        
        <div style={buttons.style} className="flex flex-wrap justify-center gap-4 mb-16">
          {isAuthenticated ? (
            <Button size="lg" className="text-lg px-8" asChild>
              <Link to="/vote">Vote Now</Link>
            </Button>
          ) : (
            <Button size="lg" className="text-lg px-8" asChild>
              <Link to="/login">Get Started</Link>
            </Button>
          )}
          
          <Button size="lg" variant="outline" className="text-lg px-8" asChild>
            <Link to="/wallet">Explore Features</Link>
          </Button>
        </div>
        
        <div style={cards.style} className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div className="glass group p-6 rounded-xl flex flex-col items-center">
            <div className="w-14 h-14 flex items-center justify-center rounded-full bg-accent/10 text-accent mb-4 group-hover:scale-110 transition-transform">
              <Shield className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Secure Verification</h3>
            <p className="text-muted-foreground text-center">
              AI-powered document verification confirms voter identity while maintaining privacy.
            </p>
          </div>
          
          <div className="glass group p-6 rounded-xl flex flex-col items-center">
            <div className="w-14 h-14 flex items-center justify-center rounded-full bg-accent/10 text-accent mb-4 group-hover:scale-110 transition-transform">
              <Lock className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Blockchain Security</h3>
            <p className="text-muted-foreground text-center">
              Every vote is securely registered on the blockchain, ensuring immutability and transparency.
            </p>
          </div>
          
          <div className="glass group p-6 rounded-xl flex flex-col items-center">
            <div className="w-14 h-14 flex items-center justify-center rounded-full bg-accent/10 text-accent mb-4 group-hover:scale-110 transition-transform">
              <Vote className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Sentiment Analysis</h3>
            <p className="text-muted-foreground text-center">
              AI analyzes social media trends to provide insights without influencing your decision.
            </p>
          </div>
        </div>

        <div className="mt-16 font-medium text-muted-foreground animate-pulse-soft">
          <span className="text-accent font-bold text-2xl">{count.toLocaleString()}</span> secure votes processed
        </div>
      </div>
    </div>
  );
};

export default Hero;
