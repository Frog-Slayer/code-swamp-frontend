import { Streak } from "@/features/user/blog/components/Streak";

export default function Home() {
  const activityData =  {
    "2025-01-01": 2,
    "2025-01-02": 1,
    "2025-01-03": 3,
    "2025-01-05": 1,
    "2025-01-08": 2,
    "2025-01-15": 4,
    "2025-01-20": 2,
    "2025-01-25": 3,
    "2025-02-01": 1,
    "2025-02-05": 2,
  }
  return (
    <div> 
      <Streak activityData={activityData}/>
    </div>
  );
}
