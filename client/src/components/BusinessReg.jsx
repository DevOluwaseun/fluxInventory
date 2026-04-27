function BusinessReg() {
  return (
    <div className="m-5">
      <h1 className="font-display my-space-4 font-bold">Flux Inventory</h1>
      <div className="m-space-6 flex items-end justify-between">
        <div className="gap-space-4 flex w-[50%] flex-col">
          <p className="text-primary font-body text-xs font-semibold">
            STEP 01 - IDENTITY
          </p>
          <h1 className="text-display leading-12 font-semibold">
            Establish your
            <br />
            <span className="text-primary">Business Profile</span>
          </h1>
          <p className="text-outline font-display flex font-semibold">
            Set the architectural foundation for your inventory management
            system. Precision starts here.
          </p>
        </div>
        <div className="flex w-[50%] justify-end">
          <div></div>
          <p className="text-outline font-display text-sm font-semibold">
            Progress: 1 of 2{" "}
          </p>
        </div>
      </div>
      <div>
        <div className="bg-surface-container-lowest font-display p-space-4 text-xs font-semibold">
          <form className="flex flex-col">
            <div className="gap-space-1 flex flex-1 flex-col">
              <label
                className="text-on-surface-variant text-xs"
                htmlFor="business_name"
              >
                BUSINESS ENTITY NAME
              </label>

              <input
                type="text"
                className="peer bg-surface-container-low py-space-2 px-space-4 focus:border-primary w-full rounded-xs border border-transparent transition-all duration-200 focus:bg-blue-50 focus:outline-none"
                name="business_name"
              />
            </div>
            <div className="gap-space-1 flex flex-1 flex-col">
              <label htmlFor="sector">INDUSTRY SECTOR</label>
              <input type="text" name="sector" id="" />
            </div>
            <div className="gap-space-1 flex flex-1 flex-col">
              <label htmlFor="operation_scale">OPERATION SCALE</label>
              <input name="operation_scale" type="text" />
            </div>
            <div className="gap-space-1 flex flex-1 flex-col">
              <label htmlFor="hq_address">PRIMARY HEADQUARTERS</label>
              <input name="hq_address" type="text" />
            </div>
            <button>Back to portal</button>
            <button>Continue to Operations</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default BusinessReg;
