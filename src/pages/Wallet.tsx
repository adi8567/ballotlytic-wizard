
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import Header from '@/components/Header';
import DocumentCard from '@/components/DocumentCard';
import { useStaggeredFadeIn } from '@/lib/animation';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { WalletCards, ShieldCheck, CirclePlus } from 'lucide-react';

const Wallet = () => {
  const { user, connectWallet } = useAuth();
  const [isPageLoaded, setIsPageLoaded] = useState(false);
  
  useEffect(() => {
    setIsPageLoaded(true);
  }, []);
  
  const documentTypes = [
    {
      id: 'voter-id',
      title: 'Voter ID',
      description: 'Your official voter identification issued by the government.',
      status: 'pending',
    },
    {
      id: 'national-id',
      title: 'National ID',
      description: 'Your national identity card or passport for verification.',
      status: 'pending',
    },
    {
      id: 'driving-license',
      title: 'Driving License',
      description: 'Your government-issued driving license as additional verification.',
      status: 'pending',
    },
  ];
  
  const animatedDocuments = useStaggeredFadeIn(documentTypes, 200);

  return (
    <div className={`min-h-screen pb-20 transition-opacity duration-500 ${isPageLoaded ? 'opacity-100' : 'opacity-0'}`}>
      <Header />
      
      <div className="container mx-auto px-4 pt-28">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Digital Wallet</h1>
            <p className="text-muted-foreground">
              Securely store and verify your identification documents
            </p>
          </div>
          
          <Button onClick={connectWallet} className="flex items-center">
            <WalletCards className="mr-2 h-4 w-4" />
            {user?.walletAddress ? 'Wallet Connected' : 'Connect Wallet'}
          </Button>
        </div>
        
        {user?.walletAddress && (
          <div className="glass p-4 rounded-lg mb-8 flex items-center">
            <ShieldCheck className="text-green-500 h-5 w-5 mr-3" />
            <div>
              <p className="text-sm">Wallet Address</p>
              <p className="font-mono">{user.walletAddress}</p>
            </div>
          </div>
        )}
        
        <Tabs defaultValue="documents">
          <TabsList className="mb-6">
            <TabsTrigger value="documents">My Documents</TabsTrigger>
            <TabsTrigger value="verification">Verification Status</TabsTrigger>
          </TabsList>
          
          <TabsContent value="documents" className="animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {animatedDocuments.map((doc, index) => (
                <div key={doc.id} style={doc.fadeProps.style}>
                  <DocumentCard
                    id={doc.id}
                    title={doc.title}
                    description={doc.description}
                    status={doc.status as any}
                  />
                </div>
              ))}
              
              <div className="flex items-center justify-center h-64 border-2 border-dashed border-muted rounded-xl">
                <Button variant="ghost" className="flex flex-col h-full items-center justify-center text-muted-foreground hover:text-foreground">
                  <CirclePlus className="h-8 w-8 mb-2" />
                  <span>Add New Document</span>
                </Button>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="verification" className="animate-fade-in">
            <div className="glass p-8 rounded-xl">
              <div className="text-center max-w-md mx-auto">
                <ShieldCheck className="h-12 w-12 text-accent mx-auto mb-4" />
                <h2 className="text-xl font-semibold mb-2">Verification Process</h2>
                <p className="text-muted-foreground mb-6">
                  Our AI-powered system will verify your documents against trusted sources while preserving your privacy.
                </p>
                
                <div className="space-y-4 text-left">
                  <div className="flex items-start">
                    <div className="bg-accent/10 rounded-full p-1 mr-3 mt-0.5">
                      <span className="block w-4 h-4 rounded-full bg-accent text-xs flex items-center justify-center text-white">1</span>
                    </div>
                    <div>
                      <h3 className="font-medium">Upload Documents</h3>
                      <p className="text-sm text-muted-foreground">Upload your identification documents to your wallet.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-accent/10 rounded-full p-1 mr-3 mt-0.5">
                      <span className="block w-4 h-4 rounded-full bg-accent text-xs flex items-center justify-center text-white">2</span>
                    </div>
                    <div>
                      <h3 className="font-medium">AI Verification</h3>
                      <p className="text-sm text-muted-foreground">Our AI system verifies document authenticity.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-accent/10 rounded-full p-1 mr-3 mt-0.5">
                      <span className="block w-4 h-4 rounded-full bg-accent text-xs flex items-center justify-center text-white">3</span>
                    </div>
                    <div>
                      <h3 className="font-medium">Blockchain Record</h3>
                      <p className="text-sm text-muted-foreground">Verification status is securely recorded on the blockchain.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-accent/10 rounded-full p-1 mr-3 mt-0.5">
                      <span className="block w-4 h-4 rounded-full bg-accent text-xs flex items-center justify-center text-white">4</span>
                    </div>
                    <div>
                      <h3 className="font-medium">Access Voting</h3>
                      <p className="text-sm text-muted-foreground">Once verified, you can participate in secure voting.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Wallet;
