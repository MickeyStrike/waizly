import React, { FC } from 'react'

interface IButton {
  onClick: () => void,
  title: string
}

const Button:FC<IButton> = ({ onClick, title }) => {
  return (
    <button className='bg-blue-500 text-white active:bg-blue-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 w-[220px]' onClick={onClick}>{ title }</button>
  )
}

export default Button
