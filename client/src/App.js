import React, {useState, useEffect} from 'react';
import {Navbar} from './components/Navbar';
import {LoginContext} from './context/LoginContext';
import {ListContext} from './context/ListContext';
import {useRoutes} from './routes';
import {useLogin} from './hooks/useLogin';
import {useAxios} from './hooks/useAxios';
import {BrowserRouter as Router} from 'react-router-dom';
import axios from 'axios';
import { Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';




function App() {
  //custom hooks
  const {token, login, logout, userId} = useLogin();
  const {request, reload, setReload} = useAxios();

  //login token
  const isAuthenticated = !!token;

  const routes = useRoutes(isAuthenticated);
  
  const [list, setList] = useState([]);

  const ids = new Set();
  const boxes = [];
  
  const onValue = (id) => {
    
    list.map(user => { 
        if(user.id === id) { 
        ids.add(id);
        user.checked = !user.checked
        }

        if(user.checked===false && ids.has(user.id)) {
          
            ids.delete(user.id)
        }
    })

    
    console.log(ids)
  }

  const onAllValue = () => { 
   list.map((user, index) => {
     const boxId = boxes[index].id; 
      user.checked = !user.checked;
      boxes[index].checked = user.checked;
      ids.add(Number(boxId));


      if(user.checked===false && ids.has(Number(boxId))) {
        ids.clear(); 
      }
  })
  console.log(ids)
  }

  const getInputs = (input) => {
    boxes.push(input);
  }

//actions-block
//delete request with useAxios hook
  const deleteUsers = async () => { 
    const idsArr = Array.from(ids);
    
    request('users/delete', 'post', {ids: idsArr});
    
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));

    window.location.reload();

    if(ids.has(userInfo.userId)) { 
      logout();
    }
  }

  const blockUsers = async () => {
    const idsArr = Array.from(ids) 

    await request('users/block', 'post', {ids:idsArr});

    const userInfo = JSON.parse(localStorage.getItem('userInfo'));

    window.location.reload();

    if(ids.has(userInfo.userId)) { 
      logout();
    }
  }

  const unblockUsers = async () => { 
    const idsArr = Array.from(ids) 

    await request('users/unblock', 'post', {ids:idsArr});

    window.location.reload();
  }

  useEffect(() => { 
    
    const fetchData = async () => {
        try{
            const users = await axios.get('/users');

            console.log(users.data);

            setList(users.data);
        }
        catch(e) { 
            console.log(e);
        }
    }

    fetchData();
    
}, [reload])

  return (
    <div>
      <Router>
      <LoginContext.Provider value={{token, login, logout, userId, isAuthenticated, list, setReload, reload}}>
      <Navbar />
      
        <Container fluid className="d-flex flex-column justify-content-center align-items-center min-vh-100 f">
        <ListContext.Provider value={{list, onValue, ids, deleteUsers, blockUsers, unblockUsers, onAllValue, getInputs}}>
          
          {routes}
          
        </ListContext.Provider>
        </Container>
      
      </LoginContext.Provider>
      </Router>
    </div>
  );
}

export default App;
