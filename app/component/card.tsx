import React, { FC } from 'react'
import { DataTodo, Tag } from '../interface'

interface ICard {
  dataCard: DataTodo,
  onClick: (dataCard: DataTodo) => void,
  listTags: Tag[]
}

const Card:FC<ICard> = ({ dataCard, onClick, listTags }) => {
  return (
    <div className='mt-5 w-full bg-white rounded-md p-2 cursor-move' onClick={() => onClick(dataCard)}>
      <p className='line-clamp-1 font-semibold uppercase'>{ dataCard.title }</p>
      <div className='flex flex-row flex-wrap gap-2'>
        {listTags.map((x) => {
          if(x.id === dataCard.tag) return (
            <div key={x.id} className={`${x.background} ${x.color} p-1 rounded-md font-semibold text-xs line-clamp-1 mt-2`}>
              { x.name }
            </div>
          )
          else return;
        })}
      </div>
      <p className='mt-2 text-sm text-ellipsis line-clamp-3'>{dataCard.description}</p>
    </div>
  )
}

export default Card;
