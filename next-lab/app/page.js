// ~/next-lab/app/page.js
import TimeAgo from '@/components/TimeAgo.jsx';

const minutesList = [12, 45, 150];

export default function Home() {
  return (
    <main>
      {minutesList.map((minutes) => (
        <p key={minutes}>
          <TimeAgo minutes={minutes} />
        </p>
      ))}
    </main>
  );
}
