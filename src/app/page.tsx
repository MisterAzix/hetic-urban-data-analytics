import { CctvIcon, BikeIcon } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import CrimeTab from '@/components/tabs/CrimeTab';
import BikeTab from '@/components/tabs/BikeTab';

export default function Home() {
  return (
    <main className="container mx-auto max-w-screen-lg p-4">
      <h1 className="mt-10 scroll-m-20 pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
        🏙️ NYC Urban Data
      </h1>
      <Tabs defaultValue="crime">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="crime">
            <CctvIcon className="mr-1 h-4 w-4" />
            Crimes
          </TabsTrigger>
          <TabsTrigger value="bike">
            <BikeIcon className="mr-1 h-4 w-4" />
            Vélos
          </TabsTrigger>
        </TabsList>
        <TabsContent value="crime">
          <CrimeTab />
        </TabsContent>
        <TabsContent value="bike">
          <BikeTab />
        </TabsContent>
      </Tabs>
    </main>
  );
}
