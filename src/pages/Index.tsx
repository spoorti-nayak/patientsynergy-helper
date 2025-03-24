
import React, { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { PatientCard } from '@/components/PatientCard';
import { PatientProfile } from '@/components/PatientProfile';
import { ConversationInterface } from '@/components/ConversationInterface';
import { patients, Patient } from '@/utils/mockData';
import { useFadeIn } from '@/utils/animations';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Index = () => {
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const contentStyle = useFadeIn(200);

  const handlePatientClick = (patient: Patient) => {
    setSelectedPatient(patient);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackClick = () => {
    setSelectedPatient(null);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-1 container px-4 md:px-6 py-8" style={contentStyle}>
        {selectedPatient ? (
          <PatientProfile 
            patient={selectedPatient} 
            onBack={handleBackClick} 
          />
        ) : (
          <div className="space-y-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">Welcome, Dr. Lee</h1>
              <p className="text-muted-foreground">
                Tuesday, December 12, 2023 • You have 3 patients scheduled today
              </p>
            </div>
            
            <Tabs defaultValue="dashboard">
              <TabsList>
                <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
                <TabsTrigger value="patients">Patients</TabsTrigger>
                <TabsTrigger value="ai">AI Assistant</TabsTrigger>
              </TabsList>
              
              <TabsContent value="dashboard" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <StatusCard 
                    title="Critical Patients" 
                    count={patients.filter(p => p.status === 'critical').length} 
                    color="medical-critical"
                  />
                  <StatusCard 
                    title="Requires Attention" 
                    count={patients.filter(p => p.status === 'warning').length} 
                    color="medical-warning"
                  />
                  <StatusCard 
                    title="Stable Patients" 
                    count={patients.filter(p => p.status === 'stable').length} 
                    color="medical-success"
                  />
                </div>
                
                <div className="mt-8">
                  <h2 className="text-xl font-semibold mb-4">Recent Patients</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {patients.map((patient, index) => (
                      <PatientCard 
                        key={patient.id} 
                        patient={patient} 
                        onClick={() => handlePatientClick(patient)}
                        delay={index * 100}
                      />
                    ))}
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="patients" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {patients.map((patient, index) => (
                    <PatientCard 
                      key={patient.id} 
                      patient={patient} 
                      onClick={() => handlePatientClick(patient)}
                      delay={index * 100}
                    />
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="ai" className="mt-6">
                <ConversationInterface />
              </TabsContent>
            </Tabs>
          </div>
        )}
      </main>
    </div>
  );
};

// Status card component
const StatusCard = ({ title, count, color }: { 
  title: string; 
  count: number; 
  color: string;
}) => {
  return (
    <div className={`rounded-xl border bg-card text-card-foreground shadow-sm p-6 overflow-hidden relative`}>
      <div className={`absolute top-0 left-0 w-1 h-full bg-${color}`} />
      <h3 className="font-medium text-lg mb-1">{title}</h3>
      <p className={`text-4xl font-bold text-${color}`}>{count}</p>
    </div>
  );
};

export default Index;
