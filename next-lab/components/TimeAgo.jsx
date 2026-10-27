// ~/next-lab/components/TimeAgo.jsx
const TimeAgo = ({ minutes }) => {
  if (minutes < 60) {
    return <span>{minutes}분 전</span>;
  }

  return <span>{Math.floor(minutes / 60)}시간 전</span>;
};

export default TimeAgo;
