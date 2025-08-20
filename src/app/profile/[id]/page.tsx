
export default async function UserProfile({ params }: any) {

  const {id} = await params;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>Profile</h1>
      <hr />
      <p className="text-4xl">
        Profile Page
        <span className="bg-amber-500 px-2  ml-4 rounded-xl ">{id}</span>
      </p>
    </div>
  );
}
