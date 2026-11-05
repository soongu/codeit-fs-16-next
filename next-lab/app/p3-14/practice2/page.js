// ~/next-lab/app/p3-14/practice2/page.js
import GuestbookForm from "./GuestbookForm.jsx";
import GuestbookList from "./GuestbookList.jsx";

export default function GuestbookPage() {
  return (
    <main className="p-6">
      <h2 className="text-xl font-semibold">방명록</h2>
      <GuestbookForm />
      <GuestbookList />
    </main>
  );
}
