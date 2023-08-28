import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Body from './components/Body';
import { Outlet } from 'react-router-dom';
import { createBrowserRouter } from 'react-router-dom';



function App() {
  return (
      <div className='bg-slate-100'>
        <Header/>
        <Outlet/>
        <Footer/>
      </div>
  );
}

const appRouter = createBrowserRouter([
  {
    path : '/' ,
    element : <App/> ,
    children : [
      {
        path : '/' ,
        element : <Body/>
      } ,
      {
        path : '/:site' ,
        element : <Body/>
      }
    ]
  } ,
  // {
  //   path : '/codechef' ,
  //   element : <App/>
  // }
])

export default appRouter;
