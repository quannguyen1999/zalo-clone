interface ProfileProps {
  id: string;
  content: string;
  profileId: string;
  currentProfileId: string;
}
const MessageItem = ({
  id,
  content,
  profileId,
  currentProfileId,
}: ProfileProps) => {
  return (
    <>
      {profileId != currentProfileId ? (
        <div className="flex flex-row justify-end items-end pr-3 py-1">
          <div
            className="flex flex-col border border-1 border-solid
         border-gray-200 p-2 rounded-lg relative
         "
          >
            <div className="text-base">{content}</div>
          </div>
        </div>
      ) : (
        <div className="flex flex-row justify-start items-start pl-3 pt-1">
          <div
            className="flex flex-col border border-1 border-solid
         border-gray-200 p-2 rounded-lg relative
         
         "
          >
            <div className="text-base">{content}</div>
          </div>
        </div>
      )}
    </>
  );
};

export default MessageItem;
