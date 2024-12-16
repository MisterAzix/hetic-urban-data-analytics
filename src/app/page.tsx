import BicycleTab from '@/components/BicycleTab';
import CrimeTab from '@/components/CrimeTab';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CctvIcon, BikeIcon } from 'lucide-react';

export default function Home() {
  return (
    <main className="container mx-auto">
      <div className="flex items-center justify-center pt-8">
        <Tabs defaultValue="crime">
          <TabsList className="mb-2">
            <TabsTrigger value="crime" className="md:w-64">
              <CctvIcon size={16} strokeWidth={1} className="mr-1" />
              Criminalité
            </TabsTrigger>
            <TabsTrigger value="bicycle" className="md:w-64">
              <BikeIcon size={16} strokeWidth={1} className="mr-1" />
              Vélos
            </TabsTrigger>
          </TabsList>
          <div className="rounded-lg bg-muted py-4 text-muted-foreground">
            <TabsContent value="crime" className="m-0 flex justify-center">
              <CrimeTab />
            </TabsContent>
            <TabsContent value="bicycle" className="m-0 flex justify-center">
              <BicycleTab />
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </main>
  );
}
