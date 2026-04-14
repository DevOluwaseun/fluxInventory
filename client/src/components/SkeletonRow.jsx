function SkeletonRow() {
  return (
    <>
      <tr className="bg-surface-container-lowest">
        <td className="rounded-l-lg px-4 py-6">
          <div className="flex items-center gap-3">
            <div className="bg-surface-container-low h-10 w-10 animate-pulse rounded-md" />
            <div className="gap-space-2 flex flex-col">
              <div className="bg-surface-container-low h-3 w-32 animate-pulse rounded-full" />
              <div className="bg-surface-container-low h-2 w-24 animate-pulse rounded-full" />
            </div>
          </div>
        </td>
        <td className="px-4 py-6">
          <div className="bg-surface-container-low h-3 w-16 animate-pulse rounded-full" />
        </td>
        <td className="px-4 py-6">
          <div className="bg-surface-container-low h-6 w-20 animate-pulse rounded-full" />
        </td>
        <td className="px-4 py-6">
          <div className="bg-surface-container-low h-2 w-full animate-pulse rounded-full" />
        </td>
        <td className="px-4 py-6">
          <div className="bg-surface-container-low h-6 w-16 animate-pulse rounded-full" />
        </td>
        <td className="rounded-r-lg px-4 py-6">
          <div className="bg-surface-container-low h-5 w-12 animate-pulse rounded-full" />
        </td>
      </tr>
    </>
  );
}

export default SkeletonRow;
