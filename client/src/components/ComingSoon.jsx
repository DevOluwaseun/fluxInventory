import { HourglassIcon } from "@phosphor-icons/react";

function ComingSoon({ page }) {
  return (
    <div className="flex">
      <div className="flex h-screen w-full items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <HourglassIcon size={48} className="text-primary" weight="fill" />
          <h1 className="font-display text-on-surface text-2xl font-bold">
            {page} Coming Soon
          </h1>
          <p className="text-on-surface-variant text-sm">
            This feature is currently under development.
          </p>
        </div>
      </div>
    </div>
  );
}

export default ComingSoon;
