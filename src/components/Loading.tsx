import React from "react";
interface Props {
  isLoading?: boolean;
  children: React.ReactNode;
}
function Loading({ isLoading, children }: Props) {
  return (
    <>
      {isLoading && (
        <div className="ion-text-center">
          <h5>Loading ...</h5>
        </div>
      )}
      {!isLoading && children}
    </>
  );
}

export default Loading;
