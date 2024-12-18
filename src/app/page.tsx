import BikeTab from '@/components/tabs/BikeTab';
import CrimeTab from '@/components/tabs/CrimeTab';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CctvIcon, BikeIcon } from 'lucide-react';

export default function Home() {
  return (
    <main className="container mx-auto max-w-screen-lg px-4 py-8">
      <h1 className="mb-2 text-3xl font-bold">🏙️ NYC Urban Data</h1>
      <div>
        <Tabs defaultValue="crime">
          <TabsList className="w-full">
            <TabsTrigger value="crime" className="w-1/2">
              <CctvIcon size={16} strokeWidth={1} className="mr-1" />
              Criminalité
            </TabsTrigger>
            <TabsTrigger value="bike" className="w-1/2">
              <BikeIcon size={16} strokeWidth={1} className="mr-1" />
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
      </div>
    </main>
  );
}
