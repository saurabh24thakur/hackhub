
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { TeamCard } from '../components/teams/TeamCard';
import { AddMemberModal } from '../components/teams/AddMemberModal';
import { useAuth } from '../context/AuthContext';
import { getTeam, addUserToTeam, removeUserFromTeam } from '../api/teams';
import { Team } from '../types';
import { Button } from '../components/ui/Button';
import { Pencil } from 'lucide-react';

const TeamManagementPage = () => {
    const { user } = useAuth();
    const { teamId } = useParams<{ teamId: string }>();
    const [team, setTeam] = useState<Team | null>(null);
    const [isAddMemberModalOpen, setIsAddMemberModalOpen] = useState(false);

    useEffect(() => {
        const fetchTeam = async () => {
            if (teamId) {
                try {
                    const fetchedTeam = await getTeam(teamId);
                    setTeam(fetchedTeam);
                } catch (error) {
                    console.error("Failed to fetch team:", error);
                    setTeam(null);
                }
            }
        };

        fetchTeam();
    }, [teamId]);

    const handleAddMember = async (email: string) => {
        if (teamId) {
            try {
                const updatedTeam = await addUserToTeam(teamId, email);
                setTeam(updatedTeam);
                setIsAddMemberModalOpen(false);
            } catch (error) {
                console.error("Failed to add member:", error);
            }
        }
    };

    const handleRemoveMember = async (userId: string) => {
        if (teamId) {
            try {
                const updatedTeam = await removeUserFromTeam(teamId, userId);
                setTeam(updatedTeam);
            } catch (error) {
                console.error("Failed to remove member:", error);
            }
        }
    };

    if (!team) {
        return <div className="text-center py-10 text-gray-900 dark:text-dark-text">Loading team details...</div>;
    }
    
    const canManage = user?.role === 'admin' || user?._id === team.leader?._id;

    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-dark-text">
                    Manage "{team.name}"
                </h1>
                {user?.role === 'admin' && (
                    <Link to={`/admin/teams/edit/${teamId}`}>
                        <Button variant="outline">
                            <Pencil className="w-4 h-4 mr-2" />
                            Edit Team
                        </Button>
                    </Link>
                )}
            </div>

            {canManage && (
                 <div className="mb-4">
                    <Button onClick={() => setIsAddMemberModalOpen(true)}>
                        Add Member
                    </Button>
                </div>
            )}

            <div className="bg-white dark:bg-dark-card rounded-lg shadow-md p-6">
               <TeamCard 
                    team={team} 
                    onRemoveMember={handleRemoveMember} 
                    canManage={canManage}
                />
            </div>

            {canManage && teamId && (
                <AddMemberModal
                    isOpen={isAddMemberModalOpen}
                    onClose={() => setIsAddMemberModalOpen(false)}
                    onAddMember={handleAddMember}
                    teamId={teamId}
                />
            )}
        </div>
    );
};

export default TeamManagementPage;
