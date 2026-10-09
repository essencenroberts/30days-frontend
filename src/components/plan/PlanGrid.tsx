// grid view one DayCell per day of challenge

import type { Challenge, Post } from "../../types";
import { getDayDate } from "../../utils/dates";
import DayCell from "./DayCell";


interface PlanGridProps {
  challenge: Challenge;
  postsByDay: Record<number, Post[]>;
}

function PlanGrid({ challenge, postsByDay }: PlanGridProps) {
  // create a list of numbers for 30, 60, 90 + days
  const dayNumbers = Array.from({ length: challenge.lengthInDays }, (_, index) => index + 1);

  // backend today day number of challenge
  const todayDayNumber = challenge.stats?.todayDayNumber;


    return (
      // ordered list to display grid in days chronilogical
      <ol
        className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6"
      >
        {dayNumbers.map((dayNumber) => (
          <DayCell 
            key={dayNumber}
            challengeId={challenge._id}
            dayNumber={dayNumber}
            date={getDayDate(challenge.startDate, dayNumber)}
            posts={postsByDay[dayNumber] ?? []}
            postPerDay={challenge.postsPerDay}
            isToday={dayNumber === todayDayNumber}
          />
        ))}
      </ol>
  );
}

export default PlanGrid;