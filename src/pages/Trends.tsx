
import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import TrendChart from '@/components/TrendChart';
import { useFadeIn } from '@/lib/animation';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { AlertTriangle, Info } from 'lucide-react';

const Trends = () => {
  const [isPageLoaded, setIsPageLoaded] = useState(false);
  const fadeProps = useFadeIn({ delay: 200 });
  
  useEffect(() => {
    setIsPageLoaded(true);
  }, []);

  // Mock sentiment analysis data
  const sentimentData = [
    {
      name: 'Progressive Alliance',
      positive: 4500,
      negative: 1500,
      neutral: 3000,
      total: 9000,
    },
    {
      name: 'Unity Coalition',
      positive: 3800,
      negative: 2200,
      neutral: 2500,
      total: 8500,
    },
    {
      name: 'Liberty Party',
      positive: 3200,
      negative: 1800,
      neutral: 2000,
      total: 7000,
    },
    {
      name: 'Citizens Alliance',
      positive: 2800,
      negative: 1600,
      neutral: 1600,
      total: 6000,
    },
  ];

  // Mock time-series data
  const timeSeriesData = [
    { name: 'Jan', positive: 1500, negative: 800, neutral: 1200, total: 3500 },
    { name: 'Feb', positive: 2000, negative: 1000, neutral: 1400, total: 4400 },
    { name: 'Mar', positive: 2800, negative: 1200, neutral: 1600, total: 5600 },
    { name: 'Apr', positive: 3500, negative: 1500, neutral: 2000, total: 7000 },
    { name: 'May', positive: 4200, negative: 1800, neutral: 2500, total: 8500 },
    { name: 'Jun', positive: 5000, negative: 2000, neutral: 3000, total: 10000 },
  ];

  // Mock topic data
  const topicData = [
    { name: 'Economy', positive: 5500, negative: 2500, neutral: 2000, total: 10000 },
    { name: 'Healthcare', positive: 4800, negative: 3200, neutral: 2500, total: 10500 },
    { name: 'Environment', positive: 6000, negative: 2000, neutral: 2000, total: 10000 },
    { name: 'Education', positive: 5000, negative: 2000, neutral: 2500, total: 9500 },
    { name: 'Security', positive: 4000, negative: 3500, neutral: 2000, total: 9500 },
  ];

  return (
    <div className={`min-h-screen pb-20 transition-opacity duration-500 ${isPageLoaded ? 'opacity-100' : 'opacity-0'}`}>
      <Header />
      
      <div className="container mx-auto px-4 pt-28">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Sentiment Analysis</h1>
            <p className="text-muted-foreground">
              AI-powered analysis of social media trends and public sentiment
            </p>
          </div>
          
          <Card className="w-full md:w-auto">
            <CardContent className="p-4 flex items-center">
              <AlertTriangle className="text-amber-500 h-5 w-5 mr-3 flex-shrink-0" />
              <p className="text-sm text-muted-foreground">
                This data is for informational purposes only and should not unduly influence your voting decision.
              </p>
            </CardContent>
          </Card>
        </div>
        
        <Tabs defaultValue="parties">
          <TabsList className="mb-6">
            <TabsTrigger value="parties">By Party</TabsTrigger>
            <TabsTrigger value="trend">Trend Over Time</TabsTrigger>
            <TabsTrigger value="topics">By Topic</TabsTrigger>
          </TabsList>
          
          <TabsContent value="parties" className="animate-fade-in">
            <div style={fadeProps.style}>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                <TrendChart
                  title="Party Sentiment Analysis"
                  description="Sentiment analysis based on social media mentions"
                  data={sentimentData}
                />
                
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-medium mb-4">Key Insights</h3>
                    
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-full mr-3">
                          <Info className="h-4 w-4 text-blue-500" />
                        </div>
                        <div>
                          <h4 className="font-medium">Progressive Alliance</h4>
                          <p className="text-sm text-muted-foreground">
                            Highest positive sentiment ratio at 50%, particularly strong on environmental policies.
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="bg-orange-100 dark:bg-orange-900/30 p-2 rounded-full mr-3">
                          <Info className="h-4 w-4 text-orange-500" />
                        </div>
                        <div>
                          <h4 className="font-medium">Unity Coalition</h4>
                          <p className="text-sm text-muted-foreground">
                            Strong economic focus with mixed sentiment (45% positive, 26% negative).
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-full mr-3">
                          <Info className="h-4 w-4 text-green-500" />
                        </div>
                        <div>
                          <h4 className="font-medium">Liberty Party</h4>
                          <p className="text-sm text-muted-foreground">
                            Positive sentiment (46%) around individual freedoms and market policies.
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="bg-purple-100 dark:bg-purple-900/30 p-2 rounded-full mr-3">
                          <Info className="h-4 w-4 text-purple-500" />
                        </div>
                        <div>
                          <h4 className="font-medium">Citizens Alliance</h4>
                          <p className="text-sm text-muted-foreground">
                            Growing positive sentiment (47%) around social justice initiatives.
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="trend" className="animate-fade-in">
            <div style={fadeProps.style}>
              <TrendChart
                title="Sentiment Trends Over Time"
                description="Six-month sentiment analysis trend for all parties"
                data={timeSeriesData}
                className="mb-6"
              />
              
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-medium mb-4">Trend Analysis</h3>
                  <p className="text-muted-foreground mb-4">
                    Overall sentiment has been increasingly positive over the past six months, with a 33% increase in positive mentions from January to June. The total volume of social media discussions about political parties has nearly tripled in this period, indicating growing public interest in the upcoming election.
                  </p>
                  
                  <h4 className="font-medium mt-6 mb-2">Notable Events</h4>
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <span className="inline-block w-2 h-2 rounded-full bg-blue-500 mr-2"></span>
                      <span className="text-sm"><span className="font-medium">March:</span> Major economic policy debate caused spike in engagement</span>
                    </li>
                    <li className="flex items-center">
                      <span className="inline-block w-2 h-2 rounded-full bg-blue-500 mr-2"></span>
                      <span className="text-sm"><span className="font-medium">April:</span> Environmental initiative announcements drove positive sentiment</span>
                    </li>
                    <li className="flex items-center">
                      <span className="inline-block w-2 h-2 rounded-full bg-blue-500 mr-2"></span>
                      <span className="text-sm"><span className="font-medium">May-June:</span> Campaign season began with increased activity across all parties</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="topics" className="animate-fade-in">
            <div style={fadeProps.style}>
              <TrendChart
                title="Sentiment by Policy Topic"
                description="Analysis of sentiment across key policy areas"
                data={topicData}
                className="mb-6"
              />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-medium mb-4">Most Discussed Topics</h3>
                    
                    <div className="space-y-4">
                      {topicData.map((topic, index) => (
                        <div key={topic.name} className="flex items-center justify-between">
                          <div className="flex items-center">
                            <span className="inline-block w-8 text-muted-foreground text-sm">{index + 1}.</span>
                            <span className="font-medium">{topic.name}</span>
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {topic.total.toLocaleString()} mentions
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-medium mb-4">Policy Topic Insights</h3>
                    
                    <div className="space-y-4">
                      <p className="text-sm text-muted-foreground">
                        <span className="font-medium text-foreground">Environment</span> has the highest positive sentiment ratio (60%), particularly associated with Progressive Alliance and Citizens Alliance.
                      </p>
                      
                      <p className="text-sm text-muted-foreground">
                        <span className="font-medium text-foreground">Economy</span> generates the most balanced discussion with stronger associations to Unity Coalition and Liberty Party.
                      </p>
                      
                      <p className="text-sm text-muted-foreground">
                        <span className="font-medium text-foreground">Healthcare</span> shows the highest negative sentiment (30%), representing an area of concern across party lines.
                      </p>
                      
                      <p className="text-sm text-muted-foreground">
                        <span className="font-medium text-foreground">Security</span> has the highest ratio of negative sentiment (37%), indicating public concern in this area.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Trends;
