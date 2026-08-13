import type { Metadata } from 'next'
import { TeamMemberCard } from '@/components/team/TeamMemberCard'

export const metadata: Metadata = {
    title: 'Our Team',
}

const TEAM_MEMBERS = [
{
    name: 'Hudson Furbank',
    role: 'Project Manager',
    blurb: 'Student at RMIT studying a Bachelor of Computer Science, majoring in cybersecurity.',
    photoUrl: null,
},
{
    name: 'Jaidyn Dinh Nguyen',
    role: 'Business Analyst',
    blurb: 'Translates business needs into clear requirements that the whole team can act on.',
    photoUrl: null,
},
{
    name: 'Aziz Ahmadi',
    role: 'UX Designer',
    blurb: 'Crafts intuitive interfaces grounded in user research and rigorous usability testing.',
    photoUrl: null,
},
{
    name: 'Liangjie Cheng',
    role: 'Developer',
    blurb: 'Student Bachelor of Information Technology Minor Cybersecurity Student of RMIT.',
    photoUrl: null,
},
{
    name: 'Daniel Williams',
    role: 'Developer',
    blurb:
        "I'm a motivated IT professional and cybersecurity student who enjoys solving technical problems, learning new technologies, and building things that work.",
    photoUrl: null,
},
{
    name: 'Bartholomew-James Alexander Konstantinopoulos-Whitington',
    role: 'Senior Principal Distinguished Staff Engineering Manager',
    blurb:
        'This is a deliberately very long blurb designed to test whether the four-line clamp and ellipsis truncation actually works as intended when someone writes way more than four lines worth of text about themselves and their role on the team.',
    photoUrl: null,
},
]

export default function TeamPage() {
    return (
    <div className="min-h-screen bg-surface-page px-4 py-12">
        <h1 className="text-center text-2xl font-bold text-text-primary">Our team</h1>
        <div className="mt-8 flex flex-wrap justify-center gap-6">
        {TEAM_MEMBERS.map((member) => (
            <TeamMemberCard key={member.name} {...member} />
        ))}
        </div>
    </div>
    )
}