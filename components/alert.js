export const Alert = ({ error }) => (
  <div className="flex items-center justify-center w-screen min-h-screen h-auto">
    <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform text-xl">{error}</p>
  </div>
)
