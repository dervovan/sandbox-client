import WorkArea from './components/workArea';
import useToggle from './components/workArea/hooks/useToggle';
import styles from './app.module.scss';

function App() {
  const { onToggle, toggle } = useToggle(false)
  return (
    <>
      <WorkArea />
    </>
  )
}

export default App;
