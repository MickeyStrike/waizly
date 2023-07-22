"use client"

import React, { useEffect, useState } from 'react'
import Card from './card'
import ModalComponent from './modal'
import Button from './button'
import { FieldValues } from 'react-hook-form'
import { v4 } from "uuid";
import { DataTime, DataTodo, Tag, TodoList } from '../interface'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export type TitleModal = 'Create New Todo' | 'Create New Column' | 'Edit Todo'

export default function Board() {

  const [visible, setVisible] = useState(false)
  const [titleModal, setTitleModal] = useState<TitleModal>('Create New Todo')
  const [selectedCard, setSelectedCard] = useState<DataTodo>()
  const [indexParentActual, setIndexParentActual] = useState<number>(0)
  const [dataTime, setDataTime] = useState<DataTime | undefined>()
  const [fullTime, setFullTime] = useState<string>('')

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
    const idx = todoList.findIndex(x => x.data.some(y => y.id === data.id))
    setIndexParentActual(idx)
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
    notifSuccess('Success delete todo!')
    setVisible(false)
  }

  const notifSuccess = (message: string) => {
    toast.success(message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  }

  const handleSubmitForm = (data: FieldValues, id?: string) => {
    switch (titleModal) {
      case 'Create New Column':
        setTodoList((prev) => [...prev, { id: v4(), data: [], title: data.title }])
        notifSuccess('Success create new column!')
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
        notifSuccess('Success create new todo!')
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
        notifSuccess('Success edit todo!')
        setVisible(false)
      break;
      default:
        break;
    }
  }

  const handleNext = () => {
    if(indexParentActual !== todoList.length -1) {
      const newTodoList = todoList.slice();
      newTodoList[indexParentActual + 1].data.push(selectedCard as DataTodo);
      newTodoList[indexParentActual].data = newTodoList[indexParentActual].data.filter(x => x.id !== selectedCard?.id);
      setTodoList(newTodoList);
      notifSuccess('Success move todo!');
      setVisible(false);
    }
  }

  const handlePrev = () => {
    if(indexParentActual !== 0) {
      const newTodoList = todoList.slice();
      newTodoList[indexParentActual - 1].data.push(selectedCard as DataTodo);
      newTodoList[indexParentActual].data = newTodoList[indexParentActual].data.filter(x => x.id !== selectedCard?.id);
      setTodoList(newTodoList);
      notifSuccess('Success move todo!');
      setVisible(false);
    }
  }

  const getTime = async () => {
    try {
      const response = await fetch('https://worldtimeapi.org/api/timezone/Asia/Jakarta', { method: 'GET' })
      const data:DataTime = await response.json()
      setDataTime(data)
      const currentdate = new Date(data.datetime)
      const datetime = currentdate.getDate() + "/"
                + (currentdate.getMonth()+1)  + "/" 
                + currentdate.getFullYear() + "  "  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds();
      setFullTime(datetime)
    } catch (err) {
      console.log(err, 'ini err')
    }
  }

  useEffect(() => {
    const intervalId = setInterval(getTime, 5000)
    return () => clearInterval(intervalId)
  }, [])

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
        indexParentActual={indexParentActual}
        todoList={todoList}
        handleNext={handleNext}
        handlePrev={handlePrev}
      />
      <ToastContainer />
      <div className='w-full flex flex-row justify-between'>
        <div className='mb-4'>
          <h1 className='font-bold text-lg'>TODO LIST</h1>
          <h1 className='text-md font-semibold'>What You Want TODO is here!</h1>
          <p className='text-xs text-gray-900 font'>{dataTime?.timezone} {fullTime}</p>
        </div>
        <div>
          <Button title='Create New Column' onClick={handleNewColumn} />
          <Button title='Create New Todo' onClick={handleNewTodo} />
        </div>
      </div>
      <div className='overflow-x-scroll max-w-full'>
        <div className='w-full flex min-h-screen gap-5'>
          {
            todoList.map((dataMap, idx) => (
              <div key={idx} className='flex-shrink-0 w-[300px] bg-gray-200 min-h-full p-5 rounded-md'>
                <p className='text-gray-600 font-semibold uppercase'>{ dataMap.title }</p>
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
