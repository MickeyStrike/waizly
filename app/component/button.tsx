import React, { FC } from 'react'

interface IButton {
  onClick: () => void,
  title: string,
  background?: string,
  backgroundActive?: string
}

const Button:FC<IButton> = ({ onClick, title, background, backgroundActive }) => {
  return (
    <button className={`${background ? background : 'bg-blue-500'} text-white ${backgroundActive ? backgroundActive : 'active:bg-blue-600'} font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 w-[220px]`} onClick={onClick}>{ title }</button>
  )
}

export default Button
