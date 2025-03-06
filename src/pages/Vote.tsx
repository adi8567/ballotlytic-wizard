
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useAuth } from '@/context/AuthContext';
import Header from '@/components/Header';
import PartyCard from '@/components/PartyCard';
import { useStaggeredFadeIn } from '@/lib/animation';
import { useToast } from '@/hooks/use-toast';
import { Shield, CheckCircle, AlertCircle, ArrowRight } from 'lucide-react';

const Vote = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isPageLoaded, setIsPageLoaded] = useState(false);
  const [selectedParty, setSelectedParty] = useState<string | null>(null);
  const [isVoting, setIsVoting] = useState(false);
  const [isVoted, setIsVoted] = useState(false);
  const [transactionHash, setTransactionHash] = useState<string | null>(null);
  
  useEffect(() => {
    setIsPageLoaded(true);
  }, []);
  
  const parties = [
    {
      id: 'party-1',
      name: 'Progressive Alliance',
      description: 'Focused on social reform, environmental protection, and technological innovation.',
      color: '#3b82f6',
    },
    {
      id: 'party-2',
      name: 'Unity Coalition',
      description: 'Dedicated to economic growth, national security, and traditional values.',
      color: '#f97316',
    },
    {
      id: 'party-3',
      name: 'Liberty Party',
      description: 'Advocating for individual freedom, free markets, and limited government.',
      color: '#10b981',
    },
    {
      id: 'party-4',
      name: 'Citizens Alliance',
      description: 'Committed to community empowerment, social justice, and equal opportunity.',
      color: '#8b5cf6',
    },
  ];
  
  const animatedParties = useStaggeredFadeIn(parties, 200);
  
  const handleSelectParty = (id: string) => {
    if (!isVoted) {
      setSelectedParty(id);
    }
  };
  
  const handleSubmitVote = async () => {
    if (!selectedParty) return;
    
    setIsVoting(true);
    
    // Simulate blockchain transaction
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    const hash = '0x' + Math.random().toString(16).substring(2, 42);
    setTransactionHash(hash);
    setIsVoted(true);
    setIsVoting(false);
    
    toast({
      title: "Vote successfully cast",
      description: "Your vote has been recorded on the blockchain",
      variant: "default",
    });
  };

  return (
    <div className={`min-h-screen pb-20 transition-opacity duration-500 ${isPageLoaded ? 'opacity-100' : 'opacity-0'}`}>
      <Header />
      
      <div className="container mx-auto px-4 pt-28">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-block bg-accent/10 text-accent font-medium rounded-full px-4 py-1 text-sm mb-4">
            Secure Blockchain Voting
          </div>
          <h1 className="text-4xl font-bold mb-4">Cast Your Vote</h1>
          <p className="text-muted-foreground text-lg">
            Select your preferred party from the options below. Your vote will be anonymously and securely recorded on the blockchain.
          </p>
        </div>
        
        {isVoted ? (
          <div className="glass p-8 rounded-2xl text-center max-w-2xl mx-auto animate-scale-in">
            <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">Vote Successfully Cast</h2>
            <p className="text-muted-foreground mb-6">
              Your vote has been securely recorded on the blockchain. Thank you for participating in the democratic process.
            </p>
            
            <div className="bg-secondary p-4 rounded-lg mb-6">
              <p className="text-sm text-muted-foreground mb-1">Transaction Hash:</p>
              <p className="font-mono break-all">{transactionHash}</p>
            </div>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button variant="outline" onClick={() => navigate('/trends')}>
                View Election Trends
              </Button>
              <Button onClick={() => {
                setIsVoted(false);
                setSelectedParty(null);
                setTransactionHash(null);
              }}>
                Return to Voting
              </Button>
            </div>
          </div>
        ) : (
          <>
            {!user?.walletAddress && (
              <Alert className="mb-8 max-w-3xl mx-auto">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  You need to connect your wallet before voting. Please visit the Digital Wallet page.
                </AlertDescription>
              </Alert>
            )}
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {animatedParties.map((party, index) => (
                <div key={party.id} style={party.fadeProps.style}>
                  <PartyCard
                    id={party.id}
                    name={party.name}
                    description={party.description}
                    color={party.color}
                    selected={selectedParty === party.id}
                    disabled={!user?.walletAddress}
                    onSelect={handleSelectParty}
                  />
                </div>
              ))}
            </div>
            
            <div className="flex justify-center mt-8">
              <Button 
                size="lg" 
                disabled={!selectedParty || !user?.walletAddress || isVoting}
                onClick={handleSubmitVote}
                className="px-8 relative"
              >
                {isVoting ? (
                  <>
                    <span className="opacity-0">Submit Vote</span>
                    <span className="absolute inset-0 flex items-center justify-center">
                      <Shield className="mr-2 h-4 w-4 animate-pulse" />
                      Processing...
                    </span>
                  </>
                ) : (
                  <>
                    Submit Vote
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Vote;
