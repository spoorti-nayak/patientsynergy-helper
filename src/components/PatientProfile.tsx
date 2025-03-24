import React from 'react';
import { useSlideIn } from '@/utils/animations';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { 
  Calendar, Phone, Mail, MapPin, Heart, Activity, 
  Pill, AlertTriangle, Flask, ClipboardList, ArrowLeft,
  AlertCircle, TestTube
} from 'lucide-react';
import type { Patient } from '@/utils/mockData';

interface PatientProfileProps {
  patient: Patient;
  onBack: () => void;
}

export const PatientProfile: React.FC<PatientProfileProps> = ({ patient, onBack }) => {
  const slideInStyle = useSlideIn(0, 300, 'up');
  
  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`;
  };
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'critical': return 'bg-medical-critical';
      case 'warning': return 'bg-medical-warning';
      default: return 'bg-medical-success';
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'critical': 
        return (
          <Badge variant="destructive" className="gap-1 pl-2 pr-3 rounded-full">
            <AlertCircle className="h-3 w-3" />
            Critical
          </Badge>
        );
      case 'warning': 
        return (
          <Badge variant="outline" className="bg-medical-warning/10 text-medical-warning border-medical-warning gap-1 pl-2 pr-3 rounded-full">
            <AlertCircle className="h-3 w-3" />
            Warning
          </Badge>
        );
      default:
        return (
          <Badge variant="outline" className="bg-medical-success/10 text-medical-success border-medical-success gap-1 pl-2 pr-3 rounded-full">
            <AlertCircle className="h-3 w-3" />
            Stable
          </Badge>
        );
    }
  };

  const getAgeFromDateOfBirth = (dateOfBirth: string) => {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const month = today.getMonth() - birthDate.getMonth();
    if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  return (
    <div className="animate-fade-in" style={slideInStyle}>
      <div className="mb-6 flex items-center justify-between">
        <Button 
          variant="outline" 
          size="sm" 
          className="gap-1"
          onClick={onBack}
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
        
        {getStatusBadge(patient.status)}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-6">
          <Card>
            <div className={`h-1 ${getStatusColor(patient.status)}`} />
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center">
                <Avatar className="h-24 w-24 mb-4 border-4 border-border">
                  <AvatarFallback className="bg-medical-lightBlue text-medical-blue text-3xl font-medium">
                    {getInitials(patient.firstName, patient.lastName)}
                  </AvatarFallback>
                </Avatar>
                <h2 className="text-2xl font-bold">
                  {patient.firstName} {patient.lastName}
                </h2>
                <p className="text-muted-foreground">
                  {getAgeFromDateOfBirth(patient.dateOfBirth)} years • {patient.gender}
                </p>
                <div className="mt-2 flex gap-2">
                  <Badge variant="outline">MRN: {patient.mrn}</Badge>
                  <Badge variant="outline">{patient.primaryDoctor}</Badge>
                </div>
              </div>
              
              <Separator className="my-6" />
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Phone className="h-4 w-4 text-medical-blue mt-0.5" />
                  <div>
                    <div className="text-xs text-muted-foreground">Phone</div>
                    <div>{patient.contactInfo.phone}</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Mail className="h-4 w-4 text-medical-blue mt-0.5" />
                  <div>
                    <div className="text-xs text-muted-foreground">Email</div>
                    <div>{patient.contactInfo.email}</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="h-4 w-4 text-medical-blue mt-0.5" />
                  <div>
                    <div className="text-xs text-muted-foreground">Address</div>
                    <div>{patient.contactInfo.address}</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Calendar className="h-4 w-4 text-medical-blue mt-0.5" />
                  <div>
                    <div className="text-xs text-muted-foreground">Date of Birth</div>
                    <div>{patient.dateOfBirth}</div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 grid grid-cols-2 gap-3">
                <Button variant="secondary">Add Note</Button>
                <Button>Schedule</Button>
              </div>
            </CardContent>
          </Card>

          {patient.vitalSigns && (
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <Activity className="h-4 w-4 text-medical-blue" />
                  Vital Signs
                </CardTitle>
                <p className="text-xs text-muted-foreground">
                  Recorded: {new Date(patient.vitalSigns.recordedAt).toLocaleString()}
                </p>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-accent rounded-lg p-3">
                    <div className="text-xs text-muted-foreground">Temperature</div>
                    <div className="text-lg font-medium">{patient.vitalSigns.temperature}°F</div>
                  </div>
                  <div className="bg-accent rounded-lg p-3">
                    <div className="text-xs text-muted-foreground">Heart Rate</div>
                    <div className="text-lg font-medium">{patient.vitalSigns.heartRate} bpm</div>
                  </div>
                  <div className="bg-accent rounded-lg p-3">
                    <div className="text-xs text-muted-foreground">Blood Pressure</div>
                    <div className="text-lg font-medium">{patient.vitalSigns.bloodPressure}</div>
                  </div>
                  <div className="bg-accent rounded-lg p-3">
                    <div className="text-xs text-muted-foreground">Oxygen Saturation</div>
                    <div className="text-lg font-medium">{patient.vitalSigns.oxygenSaturation}%</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
          
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-medical-warning" />
                Allergies
              </CardTitle>
            </CardHeader>
            <CardContent>
              {patient.allergies.length === 0 ? (
                <p className="text-muted-foreground text-sm">No known allergies</p>
              ) : (
                <div className="space-y-2">
                  {patient.allergies.map((allergy, index) => (
                    <Badge key={index} variant="outline" className="text-medical-warning border-medical-warning bg-medical-warning/10 mr-2">
                      {allergy}
                    </Badge>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <Tabs defaultValue="overview">
            <TabsList className="mb-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="medical">Medical History</TabsTrigger>
              <TabsTrigger value="lab">Lab Results</TabsTrigger>
              <TabsTrigger value="visits">Visit History</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="mt-0 space-y-6">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Heart className="h-4 w-4 text-medical-blue" />
                    Conditions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {patient.conditions.map((condition, index) => (
                      <div key={index} className="flex items-center justify-between rounded-lg border p-3">
                        <div>
                          <div className="font-medium">{condition.name}</div>
                          <div className="text-xs text-muted-foreground">
                            Diagnosed: {condition.diagnosedDate}
                          </div>
                        </div>
                        <Badge 
                          variant={condition.status === 'active' ? 'default' : 'outline'}
                          className={
                            condition.severity === 'severe' ? 'bg-medical-critical' : 
                            condition.severity === 'moderate' ? 'bg-medical-warning' : 
                            'bg-medical-success'
                          }
                        >
                          {condition.status} - {condition.severity}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base flex items-center gap-2">
                      <Pill className="h-4 w-4 text-medical-blue" />
                      Current Medications
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {patient.medications.map((medication, index) => (
                        <div key={index} className="flex flex-col rounded-lg border p-3">
                          <div className="font-medium">{medication.name}</div>
                          <div className="text-sm">{medication.dosage}, {medication.frequency}</div>
                          <div className="text-xs text-muted-foreground mt-1">
                            Started: {medication.startDate}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base flex items-center gap-2">
                      <TestTube className="h-4 w-4 text-medical-blue" />
                      Recent Lab Results
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {patient.labResults.slice(0, 3).map((lab, index) => (
                        <div key={index} className="flex items-center justify-between rounded-lg border p-3">
                          <div>
                            <div className="font-medium">{lab.name}</div>
                            <div className="text-xs text-muted-foreground">
                              {lab.date}
                            </div>
                          </div>
                          <Badge 
                            variant={lab.status === 'normal' ? 'outline' : 'default'}
                            className={
                              lab.status === 'critical' ? 'bg-medical-critical' : 
                              lab.status === 'abnormal' ? 'bg-medical-warning' : 
                              'bg-medical-success'
                            }
                          >
                            {lab.result}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    <ClipboardList className="h-4 w-4 text-medical-blue" />
                    Recent Visits
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {patient.visits.map((visit, index) => (
                      <div key={index} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <div className="font-medium">
                              {visit.type.charAt(0).toUpperCase() + visit.type.slice(1)} Visit
                            </div>
                            <div className="text-sm">{visit.provider}</div>
                          </div>
                          <Badge variant="outline">
                            {visit.date}
                          </Badge>
                        </div>
                        <div className="text-sm mt-2">
                          {visit.notes}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="medical" className="mt-0">
              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-lg font-medium mb-4">Complete Medical History</h3>
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-sm font-medium mb-2 flex items-center gap-2">
                        <Heart className="h-4 w-4 text-medical-blue" />
                        All Conditions
                      </h4>
                      <div className="space-y-3">
                        {patient.conditions.map((condition, index) => (
                          <div key={index} className="flex flex-col rounded-lg border p-3">
                            <div className="flex justify-between items-center">
                              <div className="font-medium">{condition.name}</div>
                              <Badge 
                                variant={condition.status === 'active' ? 'default' : 'outline'}
                                className={
                                  condition.severity === 'severe' ? 'bg-medical-critical' : 
                                  condition.severity === 'moderate' ? 'bg-medical-warning' : 
                                  'bg-medical-success'
                                }
                              >
                                {condition.status} - {condition.severity}
                              </Badge>
                            </div>
                            <div className="text-xs text-muted-foreground mt-1">
                              Diagnosed: {condition.diagnosedDate}
                            </div>
                            <div className="text-sm mt-2">
                              {/* We would add more detail here in a real app */}
                              This is a {condition.severity} condition that is currently {condition.status}.
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div>
                      <h4 className="text-sm font-medium mb-2 flex items-center gap-2">
                        <Pill className="h-4 w-4 text-medical-blue" />
                        All Medications (Current & Past)
                      </h4>
                      <div className="space-y-3">
                        {patient.medications.map((medication, index) => (
                          <div key={index} className="flex flex-col rounded-lg border p-3">
                            <div className="font-medium">{medication.name}</div>
                            <div className="text-sm">{medication.dosage}, {medication.frequency}</div>
                            <div className="flex justify-between items-center text-xs text-muted-foreground mt-1">
                              <span>Started: {medication.startDate}</span>
                              {medication.endDate && <span>Ended: {medication.endDate}</span>}
                            </div>
                            <div className="text-xs mt-1">Prescribed by: {medication.prescribedBy}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="lab" className="mt-0">
              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-lg font-medium mb-4">Laboratory Results</h3>
                  <div className="space-y-4">
                    {patient.labResults.map((lab, index) => (
                      <div key={index} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <div className="font-medium">{lab.name}</div>
                            <div className="text-sm">{lab.date}</div>
                          </div>
                          <Badge 
                            variant={lab.status === 'normal' ? 'outline' : 'default'}
                            className={
                              lab.status === 'critical' ? 'bg-medical-critical' : 
                              lab.status === 'abnormal' ? 'bg-medical-warning' : 
                              'bg-medical-success'
                            }
                          >
                            {lab.status}
                          </Badge>
                        </div>
                        <div className="mt-2">
                          <div className="text-sm"><span className="font-medium">Result:</span> {lab.result}</div>
                          {lab.normalRange && (
                            <div className="text-xs text-muted-foreground">
                              Normal Range: {lab.normalRange}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="visits" className="mt-0">
              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-lg font-medium mb-4">Visit History</h3>
                  <div className="space-y-4">
                    {patient.visits.map((visit, index) => (
                      <div key={index} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <div className="font-medium">
                              {visit.type.charAt(0).toUpperCase() + visit.type.slice(1)} Visit
                            </div>
                            <div className="text-sm">{visit.provider}</div>
                          </div>
                          <Badge variant="outline">
                            {visit.date}
                          </Badge>
                        </div>
                        <div className="text-sm mt-2">
                          <div className="font-medium mb-1">Notes:</div>
                          {visit.notes}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};
