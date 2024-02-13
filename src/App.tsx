import WorkArea from './components/workArea';
// import useToggle from './components/workArea/hooks/useToggle';
// import styles from './app.module.scss';
import AppHeader from './components/header';

function App() {
  // const { onToggle, toggle } = useToggle(false)
  return (
    <>
      <AppHeader />
      <WorkArea />
    </>
  )
}

export default App;
