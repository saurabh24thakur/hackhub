export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'user';
  avatar?: string;
}

export interface Hackathon {
  id: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  location: string;
  status: 'upcoming' | 'ongoing' | 'completed';
  teamsCount: number;
  participantsCount: number;
  prize: string;
  image?: string;
  createdAt: string;
}

export interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar?: string;
}

export interface Team {
  id: string;
  name: string;
  hackathonId: string;
  description: string;
  members: TeamMember[];
  createdAt: string;
  project?: string;
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  signUp: (name: string, email: string, password: string) => Promise<void>;
  isLoading: boolean;
}
