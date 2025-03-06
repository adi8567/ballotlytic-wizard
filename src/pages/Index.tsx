
import { useEffect, useState } from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import { Button } from '@/components/ui/button';
import { Shield, Vote, BarChart2, LockKeyhole } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

const Index = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    setIsLoaded(true);
  }, []);
  
  const features = [
    {
      icon: Shield,
      title: 'Secure Digital Identity',
      description: 'Store and verify your identification documents securely in your digital wallet.',
      link: '/wallet',
      color: 'bg-blue-500',
    },
    {
      icon: Vote,
      title: 'Blockchain Voting',
      description: 'Cast your vote securely on the blockchain with complete transparency and integrity.',
      link: '/vote',
      color: 'bg-green-500',
    },
    {
      icon: BarChart2,
      title: 'Sentiment Analysis',
      description: 'Gain insights from AI-powered analysis of social media trends and public sentiment.',
      link: '/trends',
      color: 'bg-purple-500',
    },
    {
      icon: LockKeyhole,
      title: 'Tamper-Proof Results',
      description: 'Election results are immutably recorded on the blockchain for maximum security.',
      link: '/vote',
      color: 'bg-amber-500',
    },
  ];

  return (
    <div className={`min-h-screen transition-opacity duration-700 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
      <Header />
      
      <Hero />
      
      <div className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Key Features</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our platform combines cutting-edge technologies to deliver a secure, transparent, and accessible voting experience.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="glass rounded-xl p-6 hover:translate-y-[-5px] transition-all duration-300"
            >
              <div className={cn(
                "w-14 h-14 flex items-center justify-center rounded-full mb-6",
                feature.color.replace('bg-', 'bg-opacity-10 text-')
              )}>
                <feature.icon className="w-7 h-7" />
              </div>
              
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-muted-foreground mb-6">{feature.description}</p>
              
              <Button variant="link" className="p-0" asChild>
                <Link to={feature.link}>Learn more &rarr;</Link>
              </Button>
            </div>
          ))}
        </div>
        
        <div className="mt-24 max-w-5xl mx-auto">
          <div className="glass rounded-2xl overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="p-8 md:p-12 flex flex-col justify-center">
                <h2 className="text-3xl font-bold mb-4">How It Works</h2>
                <p className="text-muted-foreground mb-6">
                  Our system combines AI document verification, blockchain security, and sentiment analysis to create a next-generation voting experience.
                </p>
                
                <ol className="space-y-4 mb-6">
                  <li className="flex items-start">
                    <span className="inline-flex items-center justify-center rounded-full bg-accent/10 text-accent w-6 h-6 text-sm font-semibold mr-3 mt-0.5">1</span>
                    <span>Upload your identification documents to your secure digital wallet</span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-flex items-center justify-center rounded-full bg-accent/10 text-accent w-6 h-6 text-sm font-semibold mr-3 mt-0.5">2</span>
                    <span>Our AI system verifies your documents and confirms your eligibility</span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-flex items-center justify-center rounded-full bg-accent/10 text-accent w-6 h-6 text-sm font-semibold mr-3 mt-0.5">3</span>
                    <span>Access the blockchain voting platform and cast your secure vote</span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-flex items-center justify-center rounded-full bg-accent/10 text-accent w-6 h-6 text-sm font-semibold mr-3 mt-0.5">4</span>
                    <span>View real-time sentiment analysis and election results</span>
                  </li>
                </ol>
                
                <Button className="w-full md:w-auto" asChild>
                  <Link to="/wallet">Get Started</Link>
                </Button>
              </div>
              
              <div className="bg-gradient-to-br from-accent/90 to-accent/70 p-12 flex items-center justify-center">
                <div className="text-white text-center">
                  <h3 className="text-3xl font-bold mb-4">Secure. Transparent. Accessible.</h3>
                  <p className="text-white/80 mb-6">
                    Built on cutting-edge blockchain technology to ensure the highest levels of security and transparency.
                  </p>
                  <div className="inline-flex items-center justify-center rounded-full bg-white/10 border border-white/20 px-4 py-1">
                    <Shield className="w-4 h-4 mr-2" />
                    <span className="text-sm">Powered by Ethereum Smart Contracts</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <footer className="border-t border-border py-10 mt-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <div className="flex items-center">
                <span className="text-xl font-bold">
                  Ballot<span className="text-accent">Chain</span>
                </span>
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                Secure blockchain voting system with AI verification
              </p>
            </div>
            
            <div className="flex flex-wrap justify-center gap-4">
              <Button variant="ghost" size="sm" asChild>
                <Link to="/">Home</Link>
              </Button>
              <Button variant="ghost" size="sm" asChild>
                <Link to="/wallet">Digital Wallet</Link>
              </Button>
              <Button variant="ghost" size="sm" asChild>
                <Link to="/vote">Vote</Link>
              </Button>
              <Button variant="ghost" size="sm" asChild>
                <Link to="/trends">Trends</Link>
              </Button>
            </div>
          </div>
          
          <div className="border-t border-border mt-6 pt-6 text-center text-sm text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} BallotChain. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
