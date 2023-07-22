import React, { Dispatch, FC, SetStateAction, useEffect, useState } from 'react'
import { FieldValues, useForm } from 'react-hook-form';
import { TitleModal } from './board';

interface IModalComponent {
  visible: boolean,
  setVisible: Dispatch<SetStateAction<boolean>>
  titleModal: TitleModal,
  handleSubmitForm: (data: FieldValues, id?: string) => void,
  selectedCard?: DataTodo,
  listTags: Tag[],
  handleDeleteTodo: (id?: string) => void
  indexParentActual: number
  todoList: TodoList[],
  handlePrev: () => void,
  handleNext: () => void
}

const ModalComponent:FC<IModalComponent> = ({
  visible,
  setVisible,
  titleModal,
  handleSubmitForm,
  selectedCard,
  listTags,
  handleDeleteTodo,
  indexParentActual,
  todoList,
  handlePrev,
  handleNext
}) => {

  const [selectedTag, setSelectedTag] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue
  } = useForm();

  const onSubmit = (data: FieldValues) => {
    reset()
    handleSubmitForm({...data, tag: selectedTag}, selectedCard?.id)
  }

  const handleTags = (id: string) => {
    if (selectedTag === id) setSelectedTag('')
    else setSelectedTag(id)
  }

  const onClickDeleteTodo = () => {
    handleDeleteTodo(selectedCard?.id)
  }

  useEffect(() => {
    if (visible && titleModal === 'Edit Todo' && selectedCard) {
      setValue('title', selectedCard.title)
      setValue('description', selectedCard.description)
      setSelectedTag(selectedCard.tag || '')
    }
  }, [selectedCard, visible])

  return <>
    {visible ? (
      <div>
        <div
          className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
        >
          <div className="relative w-auto my-6 mx-auto max-w-3xl">
            {/*content*/}
            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
              {/*header*/}
              <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                <h3 className="text-3xl font-semibold">
                  {titleModal}
                </h3>
                <button
                  className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                  onClick={() => setVisible(false)}
                >
                  <span className="bg-transparent text-black h-6 w-6 text-2xl block outline-none focus:outline-none">
                    ×
                  </span>
                </button>
              </div>
              {/*body*/}
              <div className="relative p-6 flex-auto min-w-[500px]">
                <div>
                  {
                    titleModal === 'Create New Column' &&
                      <form className='flex flex-col' onSubmit={handleSubmit(onSubmit)}>
                        <label htmlFor="title">Title*</label>
                        <div className='flex flex-row border rounded-lg max-md:gap-2'>
                          <input id='title' {...register('title', { required: true })} className='bg-transparent focus:outline-none w-96 py-3 px-4' />
                        </div>
                        {errors.title && <p className='text-red-500 border-none'>Title is required.</p>}
                        <div className='flex items-center justify-end px-6 pt-6 mt-12 border-t border-solid border-slate-200 rounded-b'>
                          <button
                            className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                            type="button"
                            onClick={() => setVisible(false)}
                          >
                            Close
                          </button>
                          <input type="submit" className="text-white rounded-md bg-blue-500 font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 cursor-pointer" />
                        </div>
                      </form>
                  }
                  {
                    titleModal === 'Create New Todo' &&
                      <form className='flex flex-col' onSubmit={handleSubmit(onSubmit)}>
                        <label htmlFor="title">Title*</label>
                        <div className='flex flex-row border rounded-lg max-md:gap-2'>
                          <input id='title' {...register('title', { required: true })} className='bg-transparent focus:outline-none w-96 py-3 px-4' />
                        </div>
                        {errors.title && <p className='text-red-500 border-none'>Title is required.</p>}
                        <label htmlFor="description">Description*</label>
                        <div className='flex flex-row border rounded-lg max-md:gap-2'>
                          <textarea rows={4} id='description' {...register('description', { required: true })} className='bg-transparent focus:outline-none w-full py-3 px-4' />
                        </div>
                        {errors.description && <p className='text-red-500 border-none'>description is required.</p>}
                        <div className='mt-4'>
                          <label>List Tags</label>
                          <div className='flex flex-row flex-wrap overflow-x-auto pb-4 pt-1 gap-2 max-w-[500px]'>
                            {listTags.map((x) => (
                              <div key={x.id} className={`${selectedTag === x.id ? x.selectedBackground : x.background} ${selectedTag === x.id ? x.selectedColor : x.color} p-2 rounded-md font-semibold cursor-pointer`} onClick={() => handleTags(x.id)}>
                                { x.name }
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className='flex items-center justify-end px-6 pt-6 mt-12 border-t border-solid border-slate-200 rounded-b'>
                          <button
                            className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                            type="button"
                            onClick={() => setVisible(false)}
                          >
                            Close
                          </button>
                          <input type="submit" className="text-white rounded-md bg-blue-500 font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 cursor-pointer" />
                        </div>
                      </form>
                  }
                  {
                    titleModal === 'Edit Todo' &&
                    <form className='flex flex-col' onSubmit={handleSubmit(onSubmit)}>
                      <label htmlFor="title">Title*</label>
                      <div className='flex flex-row border rounded-lg max-md:gap-2'>
                        <input id='title' {...register('title', { required: true })} className='bg-transparent focus:outline-none w-96 py-3 px-4' />
                      </div>
                      {errors.title && <p className='text-red-500 border-none'>Title is required.</p>}
                      <label htmlFor="description">Description*</label>
                      <div className='flex flex-row border rounded-lg max-md:gap-2'>
                        <textarea rows={4} id='description' {...register('description', { required: true })} className='bg-transparent focus:outline-none w-full py-3 px-4' />
                      </div>
                      {errors.description && <p className='text-red-500 border-none'>description is required.</p>}
                      <div className='mt-4'>
                        <label>List Tags</label>
                        <div className='flex flex-row flex-wrap overflow-x-auto pb-4 pt-1 gap-2 max-w-[500px]'>
                          {listTags.map((x) => (
                            <div key={x.id} className={`${selectedTag === x.id ? x.selectedBackground : x.background} ${selectedTag === x.id ? x.selectedColor : x.color} p-2 rounded-md font-semibold cursor-pointer`} onClick={() => handleTags(x.id)}>
                              { x.name }
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className='flex items-center justify-end px-6 pt-6 mt-12 border-t border-solid border-slate-200 rounded-b'>
                        {
                          indexParentActual !== 0 && 
                            <button
                              onClick={handlePrev}
                              className='text-white bg-yellow-500 rounded-md font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150'
                            >
                              {
                                "< " + todoList[indexParentActual - 1].title
                              }
                            </button>
                        }
                        <button
                          className="text-white bg-red-500 rounded-md font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                          type="button"
                          onClick={onClickDeleteTodo}
                        >
                          Delete TODO
                        </button>
                        <input type="submit" className="text-white rounded-md bg-blue-500 font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 cursor-pointer" />
                        {
                          indexParentActual !== todoList.length - 1 && 
                            <button
                              onClick={handleNext}
                              className='text-white bg-yellow-500 rounded-md font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150'
                            >
                              {
                                todoList[indexParentActual + 1].title + ' >'
                              }
                            </button>
                        }
                      </div>
                    </form>
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
      </div>
    ) : null}
  </>
}

export default ModalComponent;
