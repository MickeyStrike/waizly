"use client"

import React, { useState } from 'react'
import Card from './card'
import ModalComponent from './modal'
import Button from './button'
import { FieldValues } from 'react-hook-form'
import { v4 } from "uuid";

export type TitleModal = 'Create New Todo' | 'Create New Column' | 'Edit Todo'

export default function Board() {

  const [visible, setVisible] = useState(false)
  const [titleModal, setTitleModal] = useState<TitleModal>('Create New Todo')
  const [selectedCard, setSelectedCard] = useState<DataTodo>()

  const [todoList, setTodoList] = useState<TodoList[]>([
    {
      id: v4(),
      title: 'TO DO',
      data: [
        {
          id: v4(),
          title: '[FE] [DESKTOP] Create UI',
          description: 'Membuat UI yang indah pada halaman tertentu adalah tugas frontend developer',
          tag: '0e617050-2a54-46f7-a8f7-7f2f6dbb6fba'
        }
      ]
    },
    {
      id: v4(),
      title: 'IN PROGRESS',
      data: [
        {
          id: v4(),
          title: '[BE] [GOLANG] API Service',
          description: 'Membuat UI yang indah pada halaman tertentu adalah tugas frontend developer',
          tag: '0e617050-2a54-46f7-x8f7-7e2f6dbb6fba'
        }
      ]
    },
    {
      id: v4(),
      title: 'READY TO TEST',
      data: []
    },
    {
      id: v4(),
      title: 'DONE',
      data: []
    },
  ])

  const listTags:Tag[] = [
    {
      id: '0e617050-2a54-46f7-a8f7-7f2f6dbb6fba',
      name: 'Frontend Developer',
      background: 'bg-red-200',
      color: 'text-red-600',
      selectedBackground: 'bg-red-600',
      selectedColor: 'text-white'
    },
    {
      id: '0e617050-2a54-46f7-x8f7-7e2f6dbb6fba',
      name: 'Backend Developer',
      background: 'bg-purple-200',
      color: 'text-purple-600',
      selectedBackground: 'bg-purple-600',
      selectedColor: 'text-white'
    },
    {
      id: '0e617060-2a54-46f7-x8f7-7e2f6dbb6fba',
      name: 'Quality Assurance',
      background: 'bg-yellow-200',
      color: 'text-yellow-600',
      selectedBackground: 'bg-yellow-600',
      selectedColor: 'text-white'
    },
    {
      id: '0e117050-2a54-46f7-x8f7-7e2f6dbb6fba',
      name: 'Support Apps',
      background: 'bg-blue-200',
      color: 'text-blue-600',
      selectedBackground: 'bg-blue-600',
      selectedColor: 'text-white'
    },
    
  ]

  const handleNewColumn = () => {
    setTitleModal('Create New Column')
    setVisible(true)
  }

  const handleNewTodo = () => {
    setTitleModal('Create New Todo')
    setVisible(true)
  }

  const handleClickCard = (data: DataTodo) => {
    setTitleModal('Edit Todo')
    setSelectedCard(data)
    setVisible(true)
  }

  const handleDeleteTodo = (idCard?: string) => {
    const newTodo = todoList.map((x) => {
      const data = x.data.filter((y) => y.id !== idCard)
      return {
        ...x,
        data
      }
    })
    setTodoList(newTodo)
    setSelectedCard(undefined)
    setVisible(false)
  }

  const handleSubmitForm = (data: FieldValues, id?: string) => {
    switch (titleModal) {
      case 'Create New Column':
        setTodoList((prev) => [...prev, { id: v4(), data: [], title: data.title }])
        setVisible(false)
      break;
      case 'Create New Todo':
        const tempFirstTodo:TodoList = { ...todoList[0] }
        tempFirstTodo.data.push({ id: v4(), title: data.title, description: data.description, tag: data.tag || '' })
        const tempTodoList = todoList.map((dataMap, idx) => {
          if(idx === 0) return tempFirstTodo
          return dataMap
        })
        setTodoList(tempTodoList)
        setVisible(false)
      break;
      case 'Edit Todo':
        const newTodo = todoList.map(x => {
          const tempData = x.data.map(y => {
            if(y.id === id) return {
              ...y,
              ...data as DataTodo
            }
            return y
          })
          return { ...x, data: tempData }
        })
        setTodoList(newTodo)
        setVisible(false)
      break;
    }
  }

  return (
    <>
      <ModalComponent
        visible={visible}
        setVisible={setVisible}
        titleModal={titleModal}
        handleSubmitForm={handleSubmitForm}
        selectedCard={selectedCard}
        listTags={listTags}
        handleDeleteTodo={handleDeleteTodo}
      />
      <div className='w-full flex flex-row justify-between'>
        <div className='mb-4'>
          <h1 className='font-bold text-lg'>TODO LIST</h1>
          <h1 className='text-sm'>What You Want TODO is here!</h1>
        </div>
        <div className='gap-4'>
          <Button title='Create New Column' onClick={handleNewColumn} />
          <Button title='Create New Todo' onClick={handleNewTodo} />
        </div>
      </div>
      <div className='overflow-x-scroll max-w-full'>
        <div className='w-full flex min-h-screen gap-5'>
          {
            todoList.map((dataMap, idx) => (
              <div key={idx} className='flex-shrink-0 w-[300px] bg-gray-200 min-h-full p-5 rounded-md'>
                <p className='text-gray-600 font-semibold'>{ dataMap.title }</p>
                {
                  dataMap.data.map((todo, idx) => (
                    <Card
                      key={idx}
                      dataCard={todo}
                      onClick={handleClickCard}
                      listTags={listTags}
                    />
                  ))
                }
              </div>
            ))
          }
        </div>
      </div>
    </>
  )
}
