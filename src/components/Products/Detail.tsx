import { btn, tag2 } from "./style";

const Detail = ({ products }) => {
  return <div
    className="mt-6 flex flex-nowrap gap-3 overflow-x-auto xl:mt-0 xl:flex-1 xl:gap-5"
  >
    {
      products.map((i) => (
        <div className="w-[152px] flex-shrink-0 rounded-2xl border border-solid border-white/10 bg-[#222b38] p-3 text-white/94 xl:h-[240px] xl:w-[200px] xl:max-w-[33%] xl:flex-1 xl:rounded-2.5xl xl:p-4">
          {i.discount && (
            <div className={`inline-block ${tag2}`}>{i.discount} off</div>
          )}
          <div className="font-semibold xl:my-3 xl:text-base">
            {i.short_name}
          </div>
          <div className="font-semibold xl:text-2xl">{i.price}</div>
          <div className="text-white/60 line-through xl:mt-1 xl:text-sm">
            {i.originalPrice}
          </div>
          <a
            href=""
            className={`${btn} mt-4 flex items-center justify-center xl:mt-[30px]`}
          >
            BUY
          </a>
        </div>
      ))
    }
  </div>
}

export default Detail
