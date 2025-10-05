import { faker } from '@faker-js/faker';
import { Hackathon, Team, TeamMember, User } from '../types';

export const generateMockUsers = (count: number): User[] => {
  return Array.from({ length: count }, () => ({
    id: faker.string.uuid(),
    name: faker.person.fullName(),
    email: faker.internet.email(),
    role: faker.helpers.arrayElement(['user', 'admin'] as const),
    avatar: `https://img-wrapper.vercel.app/image?url=https://placehold.co/40x40.png`
  }));
};

export const generateMockMembers = (count: number): TeamMember[] => {
  return Array.from({ length: count }, () => ({
    id: faker.string.uuid(),
    name: faker.person.fullName(),
    email: faker.internet.email(),
    role: faker.helpers.arrayElement(['Developer', 'Designer', 'Product Manager', 'Data Scientist']),
    avatar: `https://img-wrapper.vercel.app/image?url=https://placehold.co/40x40.png`
  }));
};

export const generateMockTeams = (hackathonId: string, count: number): Team[] => {
  return Array.from({ length: count }, () => ({
    id: faker.string.uuid(),
    name: faker.company.name(),
    hackathonId,
    description: faker.lorem.sentence(),
    members: generateMockMembers(faker.number.int({ min: 2, max: 5 })),
    createdAt: faker.date.recent().toISOString(),
    project: faker.helpers.maybe(() => faker.lorem.words(3), { probability: 0.7 })
  }));
};

export const generateMockHackathons = (): Hackathon[] => {
  return Array.from({ length: 6 }, () => {
    const startDate = faker.date.future();
    const endDate = new Date(startDate.getTime() + (3 * 24 * 60 * 60 * 1000)); // 3 days later
    const teamsCount = faker.number.int({ min: 5, max: 25 });
    
    return {
      id: faker.string.uuid(),
      name: faker.company.name() + ' Hackathon',
      description: faker.lorem.paragraph(),
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
      location: faker.location.city(),
      status: faker.helpers.arrayElement(['upcoming', 'ongoing', 'completed'] as const),
      teamsCount,
      participantsCount: teamsCount * faker.number.int({ min: 2, max: 5 }),
      prize: '$' + faker.number.int({ min: 1000, max: 50000 }).toLocaleString(),
      image: 'https://img-wrapper.vercel.app/image?url=https://placehold.co/300x200.png',
      createdAt: faker.date.recent().toISOString()
    };
  });
};

// Generate initial data
export const mockHackathons = generateMockHackathons();
export const mockTeams = mockHackathons.flatMap(h => generateMockTeams(h.id, faker.number.int({ min: 3, max: 8 })));
export const mockProfiles = generateMockUsers(20);
