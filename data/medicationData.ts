
export type MedicationType = {
  id: string;
  name: string;
  dosage: string;
  instructions: string;
  schedule: {
    time: string;
    days: string[];
  }[];
  refill: {
    date: string;
    remaining: number;
  };
  status: 'completed' | 'upcoming' | 'missed';
};

// Using a variable instead of a constant allows us to modify the array
export const sampleMedications: MedicationType[] = [
  {
    id: "1",
    name: "Lisinopril",
    dosage: "10mg",
    instructions: "Take with food",
    schedule: [
      {
        time: "8:00 AM",
        days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
      }
    ],
    refill: {
      date: "2024-06-01",
      remaining: 12
    },
    status: "completed"
  },
  {
    id: "2",
    name: "Atorvastatin",
    dosage: "20mg",
    instructions: "Take at bedtime",
    schedule: [
      {
        time: "9:00 PM",
        days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
      }
    ],
    refill: {
      date: "2024-05-20",
      remaining: 5
    },
    status: "upcoming"
  },
  {
    id: "3",
    name: "Metformin",
    dosage: "500mg",
    instructions: "Take with meals",
    schedule: [
      {
        time: "8:00 AM",
        days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
      },
      {
        time: "6:00 PM",
        days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
      }
    ],
    refill: {
      date: "2024-06-15",
      remaining: 16
    },
    status: "missed"
  }
];
