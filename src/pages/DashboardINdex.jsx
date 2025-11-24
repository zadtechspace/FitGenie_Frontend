// import { Header } from "@/components/header"
// import { ProfileCard } from "@/components/profile-card"
// import { StatsGrid } from "@/components/stats-grid"
// import { ActivityHistory } from "@/components/activity-history"
// import { AchievementSection } from "@/components/achievement-section"

import { WeeklyFitnessPlan } from "../Components/ui/WeeklyFitnessPlan";

export default function ProfilePage() {
    return (
        <div className="min-h-screen bg-background">
            {/* <Header /> */}
            <main className="container mx-auto px-4 py-8">
                {/* <ProfileCard /> */}
                <div className="mt-8 grid gap-8 lg:grid-cols-3">
                    <div className="lg:col-span-2">
                        {/* <StatsGrid /> */}
                        {/* <ActivityHistory /> */}
                        <WeeklyFitnessPlan />
                    </div>
                    <div>
                        {/* <AchievementSection /> */}
                    </div>
                </div>
            </main>
        </div>
    )
}
