

import { TagType } from './enums'
import { btn, tag1, tag2 } from './style'

const ProductList = ({ dataSource }) => {
  return (
    <ul className="flex flex-wrap gap-3 xl:gap-8">
      {dataSource.map((i) => {
        const { id, ratio_16_9, name, price, originalPrice, tags } = i
        return (
          <li key={id} className="w-[calc(50%-6px)] xl:w-[calc(33%-22px)]">
            <div className="flex h-full flex-col rounded-xl bg-[#222b38] xl:rounded-2.5xl">
              <div className="aspect-w-[173] aspect-h-[98] overflow-hidden rounded-2xl xl:aspect-w-[378] xl:aspect-h-[212] xl:rounded-2.5xl">
                <img src={ratio_16_9} alt="" />
              </div>
              <div className="relative flex-1 p-3 xl:p-5">
                <div className="text-xs font-semibold xl:text-base">{name}</div>
                <div className="text-lg font-semibold xl:text-xl">{price}</div>
                <div className="mb-2 text-white/60 line-through xl:text-sm">{originalPrice}</div>
                <Tags tags={tags} />
                <div className="h-16 xl:h-22" />
                <div className="absolute bottom-0 left-0 right-0 p-3 xl:p-5">
                  <a className={btn} href={`/products/${id}`}>BUY</a>
                </div>
              </div>
            </div>
          </li>
        )
      })}
    </ul>
  )
}


const Tags = ({ tags }) => {
  return (
    <ul className="flex flex-wrap gap-2">
      {tags.map((i) => {
        const { type, label } = i
        return (
          <li key={i.label} className={type === TagType.Primary ? tag2 : tag1}>
            {label}
          </li>
        )
      })}
    </ul>
  )
}

export default ProductList
