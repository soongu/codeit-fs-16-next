// ~/next-lab/app/p3-14/homework2/page.js
import ProfileName from "./ProfileName.jsx";
import FollowerCount from "./FollowerCount.jsx";
import FollowButton from "./FollowButton.jsx";

export default function ProfilePage() {
  return (
    <main className="p-6">
      <ProfileName />
      <FollowerCount />
      <FollowButton />
    </main>
  );
}
