
import { Layout } from 'antd';
import MyRouter from './Routs';
import ResponsiveAppBarAdmin from './components/Admin/navAdmin';
import ResponsiveAppBar from './components/Ruoter/nav';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './Redux/store';
import config from './components/config ';
import Footers from './components/Ruoter/footer';
import { setUser } from './Redux/userSlice';
import ReminderButton from './components/Admin/sendEmail';
function App() {
  const user: any = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch()
  dispatch(setUser());
  const isAdmin = user.email === config.admin.email;

  return (<>
    <Layout style={{ textAlign: 'center' }}>
      {isAdmin ?
        (<ResponsiveAppBarAdmin />) :
        (<ResponsiveAppBar />)}
      <MyRouter />
      <Footers />

    </Layout>
    <ReminderButton />
  </>
  )
}

export default App
