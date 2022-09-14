import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom"
import { useSelector, useDispatch } from 'react-redux'
import { logout, changePasswordWithEmail, emailVerification, addTodo, deleteTodo, updateTodo } from '../Firebase'
import { logout as logoutHandle } from '../store/auth'
import { useNavigate } from 'react-router-dom'
import { useAutoAnimate } from '@formkit/auto-animate/react'

function Home() {

  const { user } = useSelector(state => state.auth);
  const { todos } = useSelector(state => state.todos);
  const [animationParent] = useAutoAnimate()
  const [todoList, setTodoList] = useState([])
  const [newTodoText, setNewTodoText] = useState("")
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = async () => {
    await logout();
    dispatch(logoutHandle());
    navigate('/login', {
      replace: true
    })
  }

  const handleVerification = async () => {
    await emailVerification();
  }

  const handleChangePassword = async () => {
    await changePasswordWithEmail(user.email);
  }

  const handleSubmit = async e => {
    let uid = user.uid;
    e.preventDefault();
    if (newTodoText !== "") {
      await addTodo({
        todo: newTodoText,
        uid,
        isDone: false,
        date: new Date()
      }).then(() => {
        setNewTodoText("");
      });
    }
  }

  const handleTodoDelete = async id => {
    await deleteTodo(id);
  }

  const handleTodoUpdate = async (id,isDone) => {
    await updateTodo({
      id,
      isDone
    })
  }

  useEffect(() => {

    if (todos) {
      let list = [];
      Object.assign(list, todos);
      list.sort((a, b) => { return (b.date) - (a.date) });
      setTodoList(list)
    }

  }, [todos])


  if (user) {
    return (
      <>

        <h1 className="flex items-center space-x-1">
          {
            user.photoURL &&
            <img className="mr-2 select-none w-10 h-10 rounded-full" src={user.photoURL} alt="Rounded avatar" />
          }
          {user.displayName}
          <Link to='/settings'
            className="ml-2 select-none focus:outline-none text-white bg-indigo-500 hover:bg-indigo-700 font-medium rounded-lg text-sm px-3 py-2 mb-2 ml-1">
            Ayarlar
          </Link>

          <button onClick={handleLogout}
            className="select-none focus:outline-none text-white bg-red-500 hover:bg-red-700 font-medium rounded-lg text-sm px-3 py-2 mb-2">
            Çıkış Yap
          </button>
          {
            !user.emailVerified &&
            <button onClick={handleVerification}
              className="select-none focus:outline-none text-white bg-green-500 hover:bg-green-700 font-medium rounded-lg text-sm px-3 py-2 mb-2">
              E-posta Onayla
            </button>
          }

          <button onClick={handleChangePassword}
            className="select-none focus:outline-none text-white bg-orange-500 hover:bg-orange-700 font-medium rounded-lg text-sm px-3 py-2 mb-2">
            Şifre Değiştir(E-posta Yoluyla)
          </button>

        </h1>

        <form onSubmit={handleSubmit} className='flex gap-x-4 mt-3'>

          <input type="text" placeholder='Todo Yaz' value={newTodoText} onChange={e => setNewTodoText(e.target.value)}
            className='select-none block p-2 w-full text-gray-900 rounded-lg border border-gray-300 sm:text-xs focus:ring-blue-500 focus:border-blue-500' />
          <button className="select-none focus:outline-none text-white bg-green-500 hover:bg-green-700 font-medium rounded-lg text-sm px-3 py-2 mb-2">Ekle</button>

        </form>

        <ul ref={animationParent} className='mt-4 flex flex-col gap-y-2'>
          {
            todoList.map((todo) => {
              return (
                <li onClick={() => handleTodoUpdate(todo.id,todo.isDone)} key={todo.id} className={todo.isDone?"select-none p-4 flex justify-between items-center rounded bg-gray-800 hover:bg-gray-700 text-sm text-indigo-50":"select-none p-4 flex justify-between items-center rounded bg-indigo-50 hover:bg-indigo-200 text-sm text-indigo-700"}>
                  <span className={todo.isDone && 'line-through select-none'}>{todo.todo}</span>
                  <button onClick={() => handleTodoDelete(todo.id)}
                    className='no-underline select-none h-7 rounded px-3 text-xs bg-indigo-700 hover:bg-indigo-900 text-white'>Sil</button>
                </li>
              )
            })
          }
        </ul>

        {
          todoList.length === 0 &&
          <li className="p-4 mt-2 flex justify-between items-center rounded bg-orange-50 text-sm text-orange-700">
            Eklenmiş Todo Bulunamadı
          </li>
        }

      </>
    )
  } else {
    return (
      <div>
        <Link to='/login' className='bg-blue-500 hover:bg-blue-700 py-1 px-2 rounded text-white mr-5'>Giriş Yap</Link>
        <Link to='/register' className='bg-green-500 hover:bg-green-700 py-1 px-2 rounded text-white ml-5'>Kayıt Ol</Link>
      </div>
    )
  }

}

export default Home